/**
 * Author: JunJianSyu
 * Email: junjian1992@gmail.com
 * Date: 2017/11/5
 */
export default function remConfig() {
    (function (window, document) {
        let isMobile = navigator.userAgent.indexOf('Mobile') > 0
        let _base = isMobile ? 320 : 1440
        let docEl = document.documentElement
        let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
        let recalc = function () {
            let clientWidth = docEl.clientWidth
            if (!clientWidth) return
            let _fontSize = Math.floor(14 * (clientWidth / _base))
            docEl.style.fontSize = _fontSize + 'px'
        }
        if (!window.addEventListener) return false
        window.addEventListener(resizeEvt, recalc, false)
        document.addEventListener('DOMContentLoaded', recalc, false)
    })(window, document)
}