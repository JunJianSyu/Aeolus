/**
 * Author: JunJianSyu
 * Email: junjian1992@gmail.com
 * Date: 2017/11/14
 */
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setLogged } from '../../actions/index'
import Cookies from 'js-cookie'

class AuthorizedRoute extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged: this.props.logged
        }
    }

    componentWillMount() {
        if (this.props.setStatus) {
            let sid = Cookies.get('aeolusid')
            if (sid) {
                this.setState({
                    logged: true
                })
            } else {
                this.setState({
                    logged: false
                })
            }
            this.props.setStatus(this.state.logged)
        }
    }

    render() {
        let logged = this.state.logged
        const { component: Component, ...rest } = this.props
        return (
            <Route {...rest} render={props => {
                return logged ?
                    <Component {...props}/> :
                    <Redirect to='/login'/>
            }}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        logged: state.aeolus.logged
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setStatus: (bool) => {
            dispatch(setLogged(bool))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizedRoute)