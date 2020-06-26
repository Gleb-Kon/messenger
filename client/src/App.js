import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter} from 'react-router-dom'
import { connect } from 'react-redux';


import Layout from './hoc/Layout/Layout'
import Auth from './containers/Auth/Auth'
import HomePage from './containers/HomePage/HomePage'
import MyFriends from './containers/MyFriends/MyFriends'
import MyMessages from './containers/MyMessages/MyMessages';
import Logout from './component/Logout/Logout';
//import autoLogin from './store/actions/auth'

import './App.css';

class App extends Component {

  // componentDidMount() {
  //   this.props.authLogin()
  // }


  render() {
  
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Redirect to="/auth" />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact="true" component={HomePage}/>
          <Route path="/my_messages" component={MyMessages}/> 
          <Route path="/my_friends" component={MyFriends}/> 
          <Route path="/logout" component={Logout}/>
          <Redirect to="/" />
        </Switch>
      )
    } 

    return (
      <Layout>
        {routes}    
      </Layout>  
    );
  }

} 

function mapStateToProps(state) {
  console.log(!!state.auth.token)
  return {
    isAuthenticated: !!state.auth.token
  }
}

// function mapDispatchToProps(dispath){
//   return {
//     autoLogin: () => dispatch(autoLogin())
//   }
// }


export default withRouter(connect(mapStateToProps)(App));
