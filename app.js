const express = require('express');
const app = express();
const port = 5000;
const http = require('http').createServer(app); 

const mongoose = require('./models/index');
mongoose()

const Router = require('./routes/index');
const errorHandlerMiddleware = require('./middlewares/error_handler_middleware');

app.use(express.json());

app.use('/', Router);
app.use(errorHandlerMiddleware); // 에러핸들러

http.listen(port, () => {
    console.log(`${port}번 포트로 서버 실행`);
});
