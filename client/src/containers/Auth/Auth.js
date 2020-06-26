import React, { Component } from 'react'
import Button from '../../component/Button/Button'
import Input from '../../component/Input/Input'
import { connect } from 'react-redux';
import { auth } from  '../../store/actions/auth'
import  is from 'is_js'

import classes from './auth.module.css'

class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Input correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: "password",
        label: "Password",
        errorMessage: 'Inputcorrect password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }

      }
    }
  };
  config = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
 
 
  componentDidMount() {

  } 
  
  loginHandler = () => {    
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
    
  }
  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )
  }
  
  submitHandler = event => {
    event.preventDefault()
  }

 

  onChangeHandler = (event, controlName) => {

    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)
  


    formControls[controlName] = control
    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })
    
    this.setState({
      formControls, isFormValid
    })

   
  }
  validateControl(value, validation) {
    if(!validation){
      return true
    }

    let isValid = true

    if(validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if(validation.email) {
      isValid = is.email(value) && isValid     
    }
    
    if(validation.minLength) {
      isValid = value.length >= validation.minLength && isValid 
    }
    return isValid;
  }



  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input 
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label= {control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {

    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authorization</h1>
            <form onSubmit={this.submitHandler} className={classes.AuthForm}>

              { this.renderInputs() }    
                
              <Button 
                type="primary" 
                onClick={this.loginHandler}
                disabled={!this.state.isFormValid}
              >Login</Button>
              <Button 
                type="success" 
                onClick={this.registerHandler}
                disabled={!this.state.isFormValid}
              
              >Registration</Button>
              

            </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { 
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth);