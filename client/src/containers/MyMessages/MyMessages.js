import React, {Component} from 'react'

//import Button from '../../component/Button/Button'
//import Input from '../../component/Input/Input'
import MainFunctionBar from '../../component/MainFunctionBar/MainFunctionBar'
import classes from './MyMessages.module.css'
//import socketIOClient from "socket.io-client";


class MyMessages extends Component {
    
    componentDidMount(){
     
    }

    render() {

        return(
            <div>
                
                <div>
                    <div className={classes.leftSideBar}>
                        <MainFunctionBar/>
                    </div >

                    <h1 color="#ffffff">Мои сообщения</h1>
                    
                </div>
            </div>
        )
    }

}
export default MyMessages;