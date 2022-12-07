const express = require('express');
const app = express();
const port = 5000;
const http = require('http').createServer(app);
const cors = require('cors')
require('./models');

app.use(express.static("assets"));

const Router = require('./routes/index');
const errorHandlerMiddleware = require('./middlewares/error_handler_middleware');

app.use(express.json());

app.use(cors({
    origin: '*', // 출처 허용 옵션
    credential: 'true' // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
}));


app.use('/', Router);


app.use(errorHandlerMiddleware); // 에러핸들러

http.listen(port, () => {
    console.log(`${port}번 포트로 서버 실행`);
});
