/**
 * Author: JunJianSyu
 * Email: junjian1992@gmail.com
 * Date: 2017/11/5
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import routes from './routes'
import rem from './rem'
import aeolusReducer from './reducers'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import App from './views/App'
import AuthorizedRoute from './containers/util/AuthorizedRoute'
rem();

const store = createStore(aeolusReducer)

const RouteWithSubRoutes = (route) => (
    <Route path={route.path} component={route.component} exact={route.exact} />
)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <AuthorizedRoute path='/admin' component={App}/>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route}/>
                ))}
                <Redirect to="/admin" />
            </Switch>
        </Router>
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
