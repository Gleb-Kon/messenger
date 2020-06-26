import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/auth'

class Logout extends Component {
    componentDidMount() {

        console.log("1")
        this.props.logout()
    }
    render() {
        return <Redirect to={'/auth'} />
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)