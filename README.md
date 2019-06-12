# Learning_line_bot_api

## Getting Started

### Add initial packages

```
$ yarn init
$ yarn add express
```

### Add line-bot-sdk

```
$ yarn add @line/bot-sdk
```

### Add dotenv

[dotenv](https://github.com/motdotla/dotenv#readme) is a zero-dependency module that loads environment variables from a .env file into process.env.

```
$ yarn add dotenv
```

### Add nodemon 

```
$ yarn add nodemon
```

Create .gitignore file in your project and add ```node_modules```

### Add Procfile 

**This file will start your app when deploy in heroku**

create ```Profile``` and add:

```
$ web: yarn start
```

### Add scripts in package.json

```
  "scripts": {
    "start": "node server.js",
  }
```

### Create server.js file

add this code in ```server.js```: 

```
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
app.post('/webhook', (req, res) => res.sendStatus(200));
app.listen(port);
```

### Deploy code into Heroku

If your environment don't have heroku-cli, please add module before.

```
$ yarn global add heroku-cli
```

Log in heroku

```
$ heroku login
```

Create git repository with heroku app

```
$ git init
$ heroku git:remote -a <your-name-heroku-apps>
```

push code into heroku

```
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```

### Connect Cloud Firestore

1. Add firebase-admin dependencies

```
$ yarn add firebase-admin
```

2. Create ```firebaseHelper.js``` then follow this:

```
var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://learning-line-bot-api.firebaseio.com"
});
```
3. Generate New Private Key in your firebase project




