/**
 * Author: JunJianSyu
 * Email: junjian1992@gmail.com
 * Date: 2017/11/8
 */
import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setLogged } from '../actions/index'
import notice from '../components/Notification'
import '../static/styles/Login.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.onLogin = this.onLogin.bind(this)
    }

    onLogin(event) {
        // validate
        let name_val = this.textInput.value,
            pass_val = this.passInput.value
        if (!name_val && !pass_val) {
            notice.warning('账户或密码不可为空')
            return false
        }
        // xhr
        axios.get('/api/login').then((res) => {
            this.props.setLogin(true)
            return res
        }).then((res) => {
            this.props.history.push('/admin')
        }).catch((err) => {
            throw err
        })
    }

    render() {
        return (
            <div className='torn-login'>
                <div className='login-title'>Aeolus Admin</div>
                <div className='login-form'>
                    <div className='form-input'>
                        <input ref={(input) => { this.textInput = input }} type='text' placeholder='用户名'/>
                    </div>
                    <div className='form-input'>
                        <input ref={(input) => { this.passInput = input }} type='password' placeholder='密码' />
                    </div>
                    <div className='form-button'>
                        <button onClick={this.onLogin}>登录</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.aeolus
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLogin: (bool) => {
            dispatch(setLogged(bool))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)