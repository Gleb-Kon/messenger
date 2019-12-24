import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Layout from './hoc/Layout/Layout'

import Auth from './containers/Auth/Auth'
import HomePage from './containers/HomePage/HomePage'

import './App.css';


function App() {
  return (
    <Layout>
        <Switch>
          <Route path="/auth" component={Auth}/>
          <Route path="/" component={HomePage}/>
          
        </Switch>
    </Layout>  

  );
} 

export default App;
