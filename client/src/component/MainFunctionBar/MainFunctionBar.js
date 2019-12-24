import React, {Component} from 'react'

import {NavLink} from 'react-router-dom'

const links = [
    {to: '/', label: 'Моя страница', exact: 'true' },
    {to: 'auth', label: 'Авторизация', exact: 'false'},
    {to: '/message', label: 'Мои сообщения', exact: 'false' },

];

class MainFunctionBar extends Component {

    renderLinks() {
        return links.map((link, index) => {
            return(
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                    >
                    {link.label}
                    </NavLink>
                </li>
            )
        })
    }
    render() {
        return(
            <nav>
                <ul>
                    { this.renderLinks() }
                </ul>
            </nav>
        )
    }

}

export default MainFunctionBar