/**
 * Author: JunJianSyu
 * Email: junjian1992@gmail.com
 * Date: 2017/11/5
 */
import restify from 'restify'
import session from 'cookie-session'
import api from './src/api'

const server = restify.createServer({
    name: 'aeolus-api',
    version: '1.0.0'
});

server.use(session({
    name: 'aeolusid', // 设置 cookie 中保存 session id 的字段名称
    keys: ['aeolus'],
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: false, // localhost 测试环境下必须false 不然取不到cookie
    overwrite: true  // 重写cookie
}))

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


api(server)

server.listen(9000, () => {
    console.log('%s listening at %s', server.name, server.url);
});