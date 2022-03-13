const functions = require("firebase-functions");
const express = require("express");
const requestPromise = require("request-promise-native"); 

//http://localhost:5000/functions-259d7/us-central1/helloWorld

//https://console.firebase.google.com/project/functions-259d7/overviewcd

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const app = express();

const getDataFromApi = async (keyword) => {
    const requestUrl =
      "https://www.googleapis.com/books/v1/volumes?country=JP&q=intitle:";
    const result = await requestPromise(`${requestUrl}${keyword}`);
    return result;
  };

app.get("/hello", (req, res) => {

    // レスポンスの設定
    res.send("Hello Express!");
  });

  app.get("/user/:userId", (req, res) => {
  const users = [
    { id: 1, name: "ジョナサン" },
    { id: 2, name: "ジョセフ" },
    { id: 3, name: "承太郎" },
    { id: 4, name: "仗助" },
    { id: 5, name: "ジョルノ" },
  ];

  const targetUser = users.find(
    (user) => user.id === Number(req.params.userId)
   );
   res.send(targetUser);
 });

 app.get("/gbooks/:keyword",  async (req, res) => {
    const response = await getDataFromApi(req.params.keyword);
    res.send(response);
  });



const api = functions.https.onRequest(app);
module.exports = { api };

//exports.helloWorld = functions.https.onRequest((request, response) => {
//functions.logger.info("Hello logs!", {structuredData: true});
//response.send("Hello from Firebase!");
//});
