/**
 * Author: JunJianSyu
 * Email: junjian1992@gmail.com
 * Date: 2017/11/5
 */
import Login from './data/login'
const api = function (server) {
    // login
    server.get('/api/login', Login)
}

export default api