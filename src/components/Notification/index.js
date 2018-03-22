/**
 * Author: JunJianSyu
 * Email: junjian1992@gmail.com
 * Date: 2017/11/15
 */
import React from 'react'
import Notification from 'rc-notification'
import './notice.css'

let prefixCls = 'torn-message',
    getContainer = null,
    defaultDuration = 3,
    defaultTop = 50,
    n = null

const ConfigOptions = {
    top: defaultTop,
    duration: defaultDuration,
    prefixCls: prefixCls,
    getContainer: () => HTMLElement
}

function newNotice() {
    Notification.newInstance({
        prefixCls,
        style: {'top': defaultTop},
        getContainer
    }, notification => {
        n = notification
    })
}

newNotice()
// 'info' | 'success' | 'error' | 'warning' | 'loading'

function notice(content = React.ReactNode, duration = defaultDuration, type = 'info', onClose = () => {}, key = Date.now()) {
    n.notice({
        key,
        duration,
        style: {right: '50%'},
        content: (
            <div className={`${prefixCls}-custom-content ${prefixCls}-${type}`}>
                <span>{content}</span>
            </div>
        ),
        onClose
    })
}

export default {
    info(content, duration, onClose) {
        notice(content, duration, 'info', onClose)
    },
    success(content, duration, onClose) {
        notice(content, duration, 'success', onClose)
    },
    error(content, duration, onClose) {
        notice(content, duration, 'error', onClose)
    },
    warning(content, duration, onClose) {
        notice(content, duration, 'warning', onClose)
    },
    loading(content, duration, onClose) {
        notice(content, duration, 'loading', onClose)
    },
    config(options = ConfigOptions) {
        if (options.top !== undefined) {
            defaultTop = options.top
            n.destroy()
            n = null
            newNotice()
            // 这地方设计有些问题 每次的实例 => 销毁 => 重建
        }
        if (options.duration !== undefined) {
            defaultDuration = options.duration
        }
        if (options.prefixCls !== undefined) {
            prefixCls = options.prefixCls
        }
        if (options.getContainer !== undefined) {
            getContainer = options.getContainer
        }
    },
    destroy() {
        if (n) {
            n.destroy()
            n = null
        }
    }
}