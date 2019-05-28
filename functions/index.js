"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const router = express.Router()
const Credentials = require('./Credentials')
const app = express();
// const bodyParser = require('body-parser')
// app.use(bodyParser)

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

//var auth = (req, res, next) => { next() }
var auth = new Credentials({
    user: 'ais',
    pass: 'ais2018tc',
    realm: 'terry crews'
})

router.get('*', auth, (req, res, next) => {
    res.render('index');
    next()
})

app.use('*', router)

exports.main = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map