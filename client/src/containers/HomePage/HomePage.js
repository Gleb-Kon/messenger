import React, {Component} from 'react'
import { connect } from 'react-redux';

import socketIOClient from "socket.io-client";
import getDataUser from  '../../store/actions/getDataUser'
import getAllUsers from  '../../store/actions/getAllUsers'
import connectToSocket from  '../../store/actions/connectToSocket'
import MainFunctionBar from '../../component/MainFunctionBar/MainFunctionBar'
import classes from './HomePage.module.css'
import Button from '../../component/Button/Button'
import Input from '../../component/Input/Input'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            messages: [],
            con: null,
            numberRooms: null

        };
        this.connectRoom = this.connectRoom.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.onChange = this.onChange.bind(this)
        this.onChangeCon = this.onChangeCon.bind(this)
    }
    
      
    componentDidMount(){
        this.props.getDataUser();
        this.props.getAllUsers();
        this.props.connectToSocket();

        console.log(this.props.loading)
        
    }
    handleSubmit(e) {
        e.preventDefault();
    }
    renderUsers() {
        return this.props.users.map(user => {
            return(
                <li key={user.id}>{user.email}</li>
            )
        })
    }

    renderMessages() {
        return this.state.messages.map(message => {
            return(
                <li>{message}</li>
            )
        })
        
        
    }
    buttonSelected = selectedButton => ev => {
        this.setState({ selectedButton })
    }
    connectRoom() {

        console.log(this.state.con)
        console.log(this.props.email)
        let numberRoom
        if(this.state.con > this.props.email){
            numberRoom = this.state.con + '-' + this.props.email
        }
        else{
            numberRoom = this.props.email + '-' + this.state.con 
        }
        this.setState({numberRooms: numberRoom})
       
        this.props.socket.emit('join', {numberRoom: numberRoom});
        
        this.props.socket.on("new_message", (msg) => {
            console.log(msg)
            this.setState({messages: [...this.state.messages, msg]});
            console.log(this.state.messages)
        })


    }
    sendMessage() {
        console.log("this.state.message", this.state.message)
        console.log("this.state.numberRooms", this.state.numberRooms)

        const message = this.state.message;
        const url = this.state.numberRooms
        const secret = localStorage("secretForSocket")
        const objMes = {message, url}
        this.props.socket.emit('message', objMes)
    }
    onChange(e) {
        var val = e.target.value;
        this.setState({message: val});
    }
    onChangeCon(e) {
        var val = e.target.value;
        this.setState({con: val});
    }
    
    render() {
        console.log(this.props.email)

        console.log(this.props.loading)
        if(this.props.loadingData && this.props.loadingUsers) {
            return (<h1>загрузка</h1>)
        }
        else{
        return(
            <div>
                <div>
                    <div className={classes.leftSideBar}>
                        <MainFunctionBar/>
                    </div >
                    <div>
                    <span>Вы вошли как: {this.props.email} </span><br/>
                    <span>Ваш id: {this.props.id}</span>
                    <h1>Уже зарегистрировались!!!</h1>
                    <ul>{this.renderUsers()}</ul>
                    <Input
                        value={this.state.con}
                        onChange={this.onChangeCon}

                    ></Input>
                     <Button
                        onClick={this.connectRoom}
                    >Подключиться</Button>
                    <Input
                        value={this.state.message}
                        onChange={this.onChange}

                    ></Input>
                    <Button
                        onClick={this.sendMessage}
                    >Отправить</Button>
                    <div>
                        <ul>
                            {this.renderMessages()}
                        </ul>
                    </div>
                    </div>  
                </div>
            </div>
        )
    }
    }
}

function mapStateToProps(state) {
    return {
        id: state.getDataUser.id,
        email: state.getDataUser.email,
        loadingData: state.getDataUser.loading,

        users: state.getAllUsers.users,
        loadingUsers: state.getAllUsers.loading,

        socket: state.connectToSocket.socket
    }
}

function mapDispatchToProps(dispatch) {
    return { 
      getDataUser: () => dispatch(getDataUser()),
      getAllUsers: () => dispatch(getAllUsers()),
      connectToSocket: () => dispatch(connectToSocket())
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
