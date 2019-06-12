require("dotenv").config();

const admin = require("firebase-admin");
const serviceAccount = require("learning-line-bot-api-firebase-adminsdk-d8o28-ad6166c3c5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://learning-line-bot-api.firebaseio.com"
});

function addUserFollow(profile) {
  var collectionRef = firestore.collection("user_follow");
  collectionRef
    .add({
      displayName: profile.displayName,
      userId: profile.userId,
      pictureUrl: profile.pictureUrl,
      statusMessage: profile.statusMessage
    })
    .then(documentReference => {
      console.log(`Added document with name: ${documentReference.id}`);
    });
}

module.exports = {
  addUserFollow
};
