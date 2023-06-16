/*
 * @Author: Hong.Zhang
 * @Date: 2022-07-30 14:54:44
 * @Description: 
 */
const CryptoJS = require("crypto-js");
const axios = require('axios');
const APPID = process.env.APPID;
const API_SECRET = process.env.APPID.API_SECRET;
const API_KEY = process.env.API_KEY;
const API_HOST = process.env.API_HOST;

function getRequestUrl() {
    // 请求地址根据语种不同变化
  var url = API_HOST;
  var host = 'api.xf-yun.com';
  var apiKey = API_KEY;
  var apiSecret = API_SECRET;
  var date = new Date().toGMTString();
  var algorithm = 'hmac-sha256';
  var headers = 'host date request-line';
  var signatureOrigin = `host: ${host}\ndate: ${date}\nPOST /v1/private/s9a87e3ec HTTP/1.1`;
  var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
  var signature = CryptoJS.enc.Base64.stringify(signatureSha);
  var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
  var authorization = Buffer.from(authorizationOrigin).toString('base64');
  url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
  return url;
}

const url = getRequestUrl();

function requestXfBridge(text='') {
  return axios.post(url,
    {
      "header": {
        "app_id": APPID,
        "status": 3
      },
      "parameter": {
        "s9a87e3ec": {
          "result": {
            "encoding": "utf8",
            "compress": "raw",
            "format": "json"
          }
        }
      },
      "payload": {
        "input": {
          "encoding": "utf8",
          "compress": "raw",
          "format": "json",
          "status": 3,
          "text": Buffer.from(text).toString('base64')
        }
      }
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  )
}

module.exports = { requestXfBridge };