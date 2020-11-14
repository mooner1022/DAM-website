"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyBYA-tzlgF8vGhmzdoNMTUHOvgSE_-7rus",
    authDomain: "dam-application-b2b65.firebaseapp.com",
    databaseURL: "https://dam-application-b2b65.firebaseio.com",
    projectId: "dam-application-b2b65",
    storageBucket: "dam-application-b2b65.appspot.com",
    messagingSenderId: "670681084026",
    appId: "1:670681084026:web:785642c820ecd727b70bc3",
    measurementId: "G-QSTPY2T9HJ"
};
var fb = firebase.default;
fb.initializeApp(firebaseConfig); // Firebase 시작
var db = fb.firestore();
var router = express.Router();
// ... GET 요청 처리
// ... POST 요청 처리
router.post('/savecookie/:idToken', function (req, res) {
    res.cookie('idToken', req.params.idToken, {
        maxAge: 60 * 60 * 24 * 50,
    });
});
router.post('/checkcookie/:idToken', function (req, res) {
    var isCookied = false;
    if (req.cookies['idToken']) {
        isCookied = true;
    }
    res.json({ response: isCookied });
});
router.post('/free_board/get/:index', function (req, res) {
    var showCount = 10; // 한페이지에 보여줄 개수
    var index = +req.params.index; // 반환할 페이지
    var from = (index - 1) * 10;
    var rangeArr = range(showCount, from);
    var returnList = new Array();
    db.collection('free_board').get() // DB 연결
        .then(function (snapshot) {
        var i = 0;
        snapshot.forEach(function (doc) {
            i++;
            if (rangeArr.includes(i)) { // 반환할 페이지에 포함시
                var data = {
                    title: doc.get('title'),
                    content: doc.get('content'),
                    writer: doc.get('writer'),
                    views: doc.get('views'),
                    date: doc.get('date').toDate()
                };
                returnList.push(data); // 반환값 목록에 추가
            }
        });
        res.json(returnList); // 반환
    })
        .catch(function (err) {
        console.log('Error getting documents', err); // 오류 발생시
    });
});
router.post('/free_board/post/:title/:content/:writer', function (req, res) {
    var data = {
        'title': req.params.title,
        'content': req.params.content,
        'writer': req.params.writer,
        'date': new Date(),
        'views': 0
    };
    db.collection('free_board').doc().set(data).then(function () {
        res.json({ 'result': 'success' });
    });
});
function range(size, startAt) {
    if (startAt === void 0) { startAt = 0; }
    return __spread(Array(size).keys()).map(function (i) { return i + startAt; });
}
module.exports = router;
