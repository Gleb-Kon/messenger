import React, { Component } from 'react'

import { Link } from 'react-router-dom'

const links = [
    {to: '/logout', label: 'Выйти', exact: true},
];

class MainFunctionBar extends Component {

    renderLinks() {
        return links.map((link, index) => {
            return(
                <li key={index}>
                    <Link
                        to={link.to}
                        exact={link.exact}
                    >
                    {link.label}
                    </Link>
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