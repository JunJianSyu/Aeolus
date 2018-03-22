/**
 * Author: JunJianSyu
 * Email: junjian1992@gmail.com
 * Date: 2017/11/5
 */
import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../containers/util/Header'
import Nav from '../containers/util/Nav'
import '../static/styles/App.css'
import * as TornActions from '../actions'
// main module
import Dashboard from '../containers/Dashboard'
import Page from '../containers/Page'

class App extends Component {
    static propTypes = {
        aeolus: PropTypes.object.isRequired
    }

    componentWillMount() {
        console.log('willMount')
    }

    componentDidMount() {
        console.log('DidMount')
    }

    componentWillUpdate() {
        console.log('willUpdate')
    }

    componentDidUpdate() {
        console.log('DidUpdate')
    }

    componentWillUnmount() {
        console.log('unMount')
    }

    render() {
        const { match } = this.props
        return (
            <div className='wrapper'>
                <Header/>
                <Nav />
                <div className='torn-main'>
                    <Switch>
                        <Route path={`${match.path}`} exact component={Dashboard}/>
                        <Route path={`${match.path}/dashboard`} component={Dashboard}/>
                        <Route path={`${match.path}/page`} component={Page}/>
                        <Redirect to={`${match.url}`} />
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    aeolus: state.aeolus
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TornActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)