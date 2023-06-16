var express = require('express');
var router = express.Router();
const { requestXfBridge } = require("../utils");

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/check', async function (req, res, next) {
  const { text } = req.body;
  try {
    const bridgeResult = await requestXfBridge(text);
    const base64Text = bridgeResult.data.payload.result.text;
    const plainText = Buffer.from(base64Text, 'base64').toString('utf8');
    res.json({
      data: JSON.parse(plainText),
    });
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
    else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    res
      .status(500)
      .json({
        data: {
          error: error.toString(),
        },
      });
    console.log(error);
  }
});

module.exports = router;
