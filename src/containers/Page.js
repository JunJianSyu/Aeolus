/**
 * Author: JunJianSyu
 * Email: junjian1992@gmail.com
 * Date: 2017/11/12
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Page extends Component {
    render() {
        const { match } = this.props
        return (
            <div className='main-table'>
                {JSON.stringify(match)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)