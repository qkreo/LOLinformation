const express = require('express');
const app = express();
const port = 5000;
const http = require('http').createServer(app);
const cors = require('cors')
const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config(); // env환경변수 파일 가져오기

const redisClient = redis.createClient({
   url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
   legacyMode: true, // 반드시 설정 !!
});
redisClient.on('connect', () => {
   console.info('Redis connected!');
});
redisClient.on('error', (err) => {
   console.error('Redis Client Error', err);
});

app.use(express.static("assets"));

const Router = require('./routes/index');
const errorHandlerMiddleware = require('./middlewares/error_handler_middleware');

app.use(express.json());

app.use('/', Router);

app.use(cors({
    origin: '*', // 출처 허용 옵션
    credential: 'true' // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
}));

app.use(errorHandlerMiddleware); // 에러핸들러

http.listen(port, () => {
    console.log(`${port}번 포트로 서버 실행`);
});

module.exports = redisClient