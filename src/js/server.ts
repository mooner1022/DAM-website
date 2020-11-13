import * as express from "express"
const path = require('path');
const app = express();

let srcPath = `${__dirname}/../`;
let htmlPath = path.join(srcPath, 'html');

//app.use(cookieParser());
app.use('/',require('./route'));
app.use(express.static(srcPath));
//app.use(express.static(htmlPath));

app.get('/', (req : express.Request , res : express.Response) => { // 메인 페이지 요청 처리
    res.sendFile(path.join(htmlPath, 'index.html'));
});

app.listen(443, () => { // 웹 시작
    console.log('Express App on port 443!');
});
