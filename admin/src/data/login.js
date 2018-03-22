/**
 * Author: JunJianSyu
 * Email: junjian1992@gmail.com
 * Date: 2017/11/5
 */
export default (req, res, next) => {
    req.session.name = 'JunJianSyu'
    res.send({'xxx': 'JunJianSyu'})
    return next()
}