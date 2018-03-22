/**
 * Author: JunJianSyu
 * Email: junjian1992@gmail.com
 * Date: 2017/11/5
 */
import Login from './views/Login'
import App from './views/App'

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/admin',
        component: App,
        exact: true
    }
]

export default routes