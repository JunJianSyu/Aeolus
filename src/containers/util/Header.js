/**
 * Author: JunJianSyu
 * Email: junjian1992@gmail.com
 * Date: 2017/11/14
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editTitle } from "../../actions/index";
import PropTypes from 'prop-types'
import '../../static/styles/Header.css'

class Header extends Component {
    static propTypes = {
        title: PropTypes.string,
        name: PropTypes.string,
        pic: PropTypes.string,
        commit: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title
        }
    }

    // Event Hook
    handleClick(title) {
        if (this.props.onSwitchTitle) {
            this.props.onSwitchTitle(title)
        }
        this.setState({
            title: title
        })
    }

    render () {
        // console.log('render')
        return (
            <header className='torn-header'>
                <div className='header-logo' onClick={this.handleClick.bind(this, 'JunJianSyu')}>
                    {this.state.title}
                </div>
                <div className='header-info'>
                    <div className="userinfo">
                        <a className='user-a' onClick={this.props.commit}>
                            <img src={this.props.pic} alt='user-pic' />
                            <span>{this.props.name}</span>
                        </a>
                    </div>
                </div>
            </header>
        )
    }
}

class HeaderContainer extends Component {
    handelCommit(event) {
        console.log(event.target)
    }

    render() {
        return (
            <Header {...this.props} commit={this.handelCommit.bind(this)} />
        )
    }
}

const mapStateToProps = (state) => {
    return state.aeolus
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchTitle: (title) => {
            dispatch(editTitle(title))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)