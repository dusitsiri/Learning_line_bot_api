require("dotenv").config();

const admin = require("firebase-admin");
const serviceAccount = require("./learning-line-bot-api-firebase-adminsdk-d8o28-ad6166c3c5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://learning-line-bot-api.firebaseio.com"
});

const db = admin.firestore();

function addUserFollow(profile) {
    db.collection('user_follow').add({
        displayName: profile.displayName,
        userId: profile.userId,
        pictureUrl: profile.pictureUrl,
        statusMessage: profile.statusMessage
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

module.exports = {
  addUserFollow
};
