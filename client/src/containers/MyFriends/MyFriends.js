import React, {Component} from 'react'

import MainFunctionBar from '../../component/MainFunctionBar/MainFunctionBar'
import classes from './MyFriends.module.css'

class MyFriends extends Component {
    
    render() {


        return(
            <div>
                <div className={classes.leftSideBar}>
                    <MainFunctionBar/>
                </div>
                <div>
                    <h1>Мои друзья</h1>
                </div>
            </div>
        )
    }
}
export default MyFriends;