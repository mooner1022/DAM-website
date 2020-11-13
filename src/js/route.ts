import * as express from 'express';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = { // Firebase 설정
    apiKey: "AIzaSyBYA-tzlgF8vGhmzdoNMTUHOvgSE_-7rus",
    authDomain: "dam-application-b2b65.firebaseapp.com",
    databaseURL: "https://dam-application-b2b65.firebaseio.com",
    projectId: "dam-application-b2b65",
    storageBucket: "dam-application-b2b65.appspot.com",
    messagingSenderId: "670681084026",
    appId: "1:670681084026:web:785642c820ecd727b70bc3",
    measurementId: "G-QSTPY2T9HJ"
};

const fb = firebase.default;
fb.initializeApp(firebaseConfig); // Firebase 시작
const db = fb.firestore();
const router = express.Router();

// ... GET 요청 처리

// ... POST 요청 처리
router.post('/savecookie/:idToken', (req, res) => { // 쿠키 저장
    res.cookie('idToken',(req.params.idToken as string),{
        maxAge: 60*60*24*50,
    });
});

router.post('/checkcookie/:idToken', (req, res) => { // 쿠키 있는지 확인 (자동 로그인)
    let isCookied = false;
    if(req.cookies['idToken']) {
        isCookied = true;
    }
    res.json({response:isCookied});
});

router.post('/free_board/get/:index', (req, res) => { // 자유 게시판
    const showCount = 10; // 한페이지에 보여줄 개수
    const index = +req.params.index; // 반환할 페이지
    const from = (index-1)*10;
    const rangeArr = range(showCount,from);
    let returnList = new Array();

    db.collection('free_board').get() // DB 연결
        .then((snapshot) => { // 연결 성공시
            let i=0;
            snapshot.forEach((doc) => {
                i++;
                if(rangeArr.includes(i)) { // 반환할 페이지에 포함시
                    let data = { // 반환할 JSON 데이터 생성
                        title: doc.get('title'),
                        content: doc.get('content'),
                        writer: doc.get('writer'),
                        views: doc.get('views'),
                        date: (doc.get('date') as firebase.default.firestore.Timestamp).toDate()
                    }
                    returnList.push(data); // 반환값 목록에 추가
                }
            });
            res.json(returnList); // 반환
        })
        .catch((err) => {
            console.log('Error getting documents', err); // 오류 발생시
        });
});

router.post('/free_board/post/:title/:content/:writer', (req, res) => { // 글 업로드
    let data = {
        'title':req.params.title,
        'content':req.params.content,
        'writer':req.params.writer,
        'date':new Date(),
        'views':0
    }

    db.collection('free_board').doc().set(data).then(()=>{
        res.json({'result':'success'})
    })
});

function range(size:number, startAt = 0) {
    return [...Array<number>(size).keys()].map(i => i + startAt);
}

module.exports = router;