import React, {Component} from 'react'
import Button from '../../component/Button/Button'
import Input from '../../component/Input/Input'
import axios from 'axios';
import { connect } from 'react-redux';
import {auth} from  '../../store/actions/auth'

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: ''
        };
        this.config = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.registerHandler = this.registerHandler.bind(this);

      } 
    
      handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
    
      loginHandler() {    
        let body = JSON.stringify(this.state);

        axios({
            method: 'post',
            url: 'http://localhost:8888/auth',
            data: body,
            
        }).then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      registerHandler() {

      }
      
      submitHandler = event => {
        event.preventDefault()
      }

      render() {
        return (
            <form onSubmit={this.submitHandler}>
                    <Input
                    
                    />
                    <br />
                    <Input
                    
                    />
                <Button label={"Login"} handleClick={this.loginHandler}/>
                <Button label={"Registration"} handleClick={this.registerHandler}/>
                
                {this.state.response}

            </form>

        );
      }
}
function mapDispatchToProps(dispatch) {
  return { 
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth);