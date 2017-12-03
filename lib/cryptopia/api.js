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
        


var crypto = require('crypto');
var request = require('request');
var querystring = require('querystring');

var CryptopiaApi = function (settings) {
    var url = "www.cryptopia.co.nz/api/";



    this.getCurrencies = function(){
        var endpoint = "GetCurrencies";
        
        var uri =  "https://" + url + endpoint;

        request.get({
          url:uri},
          function (err, httpResponse, body) {
            if (err) {
              return console.error('error:', err);
            }
            console.log('Upload successful!  Server responded with:', body);
        });
        



          return {balance : 100};
    } 


    this.getBalance = function(){

        var endpoint = "GetBalance";
        var nonce = new Date().getTime();
        var postData = {
            currency : "Bitcoin" 
        };
        var stringPostData = JSON.stringify(postData);

        var uri =  "https://" + url + endpoint;
        
               

        var md5 = crypto.createHash('md5').update(stringPostData).digest("hex");        
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
            url: uri,
            method: 'POST',
            headers: headers,
            body:JSON.stringify(postData)
          };

          request(options, function (err, httpResponse, body) {
            if (err) {
              return console.error('error:', err);
            }
            console.log('Upload successful!  Server responded with:', body)
          });



        return {balance : 100};

    }
};

module.exports = CryptopiaApi;