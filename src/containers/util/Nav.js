/**
 * Author: JunJianSyu
 * Email: junjian1992@gmail.com
 * Date: 2017/11/14
 */
import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import '../../static/styles/Nav.css'

class NavContainer extends Component {
    static NavItem(props) {
        const {lists, location, match} = props
        let items = lists.map((item) =>
            <li key={item.url.toString()} className={location.pathname === `${match.path}/${item.url}` ? 'li-active' : ''}>
                <div>
                    <NavLink to={`${match.path}/${item.url}`} activeClassName="active">{item.name}</NavLink>
                </div>
            </li>
        )
        return (
            <ul>{items}</ul>
        )
    }

    render() {
        const {match, location, lists} = this.props
        return (
            <nav className='torn-nav'>
                <div className='l-nav-menu'>
                    {NavContainer.NavItem({lists, location, match})}
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lists: [
            {url: 'dashboard', name: 'Dashboard'},
            {url: 'page', name: 'Page'}
        ]
    }
}

export default withRouter(connect(mapStateToProps)(NavContainer))