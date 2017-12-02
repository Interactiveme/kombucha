'use strict';



        // function getTradeHistory($market)
        // {
        //     global $gApiKey, $gApiSecret;
        //     $uri = 'https://www.cryptopia.co.nz/Api/GetTradeHistory';
        //     $post_data = array(
        //         'Market' => $market
        //     );
        //     $nonce = microtime();
        //     $signature = $gApiKey . 'POST' . strtolower(urlencode($uri)) . $nonce . base64_encode(md5(json_encode($post_data), true));
        //     $hmacsignature = base64_encode(hash_hmac('sha256', $signature, base64_decode($gApiSecret), true));
        //     $headers = array(
        //         'Authorization' => 'amx ' . $gApiKey . ':' . $hmacsignature . ':' . $nonce,
        //     );
        //     // $this->client is a guzzlehttp object: http://docs.guzzlephp.org/en/stable/index.html
        //     $response = $this->client->post('GetTradeHistory', array(
        //         'headers' => $headers,
        //         'form_params' => $post_data
        //     ));
        //     $body = $response->getBody();
        //     $stringBody = (string) $body;
        //     $json = json_decode($stringBody);
        // }
        







var https = require("https");
var http = require("http");
var crypto = require('crypto');


var querystring = require('querystring');

var CryptopiaApi = function (settings) {
    var url = "www.cryptopia.co.nz/api/";

    this.getBalance = function(){
        var endpoint = "GetCurrencies";
        
        var options = {
            hostname: "https://" + url,
            path: endpoint,
            method: 'GET',
            port:443
          };
          var req = http.request(options, function(res) {
            console.log('Status: ' + res.statusCode);
            console.log('Headers: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (body) {
              console.log('Body: ' + body);
            });
          });
          req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
          });
          // write data to request body
        
          req.end();





          return {balance : 100};
    } 


    this.getBalanceq = function(){

        var endpoint = "GetBalance";
        var nonce = new Date().getTime();
        var postData = {
            currency : "Bitcoin" 
        };

        var md5 = crypto.createHash('md5').update(JSON.stringify(postData)).digest("hex");        
        console.log("md5: " + md5);
        
        var encodedData = new Buffer(md5).toString('base64');
        console.log("encodedData: " + encodedData);
        
        var signature = 
        settings.api_key + 
        'POST' +
        "https://" + url + endpoint +
        nonce +
        encodedData;
        
        console.log("sig: " + signature);

        var hmac = crypto.createHmac('sha256', signature);
        hmac.update(settings.api_secret);
        var hmacsignature = hmac.digest('hex'); 
        var encodedData = new Buffer(hmacsignature).toString('base64');
        
        console.log("hmac: " + hmacsignature);

        var authorization ="amx "+ settings.api_key + ":" + hmacsignature + ":" + nonce;
        authorization = authorization.toLowerCase(); 
        console.log("auth: " + authorization);

        var headers = {
            Authorization:authorization
        };

        var options = {
            hostname: "https://" + url,
            path: endpoint,
            method: 'POST',
            headers: headers,
            port:443
          };
          var req = http.request(options, function(res) {
            console.log('Status: ' + res.statusCode);
            console.log('Headers: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (body) {
              console.log('Body: ' + body);
            });
          });
          req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
          });
          // write data to request body
          req.write(JSON.stringify(postData));
          req.end();



        return {balance : 100};

    }
};

module.exports = CryptopiaApi;