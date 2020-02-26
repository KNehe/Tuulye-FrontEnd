import React from 'react';
import Layout from './Components/Layout/Layout';
import Landing from './Components/Landing/Landing';
import {StyleRoot}from 'radium';
import {Route,Switch} from 'react-router-dom';
import SignIn from './Containers/SignIn/SignIn';
import Join from './Containers/Join/Join';

function App() {
  return (
   <StyleRoot>
      <Layout>
        <Switch>
          <Route path='/' exact component={Landing}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/join' component={Join}/>
        </Switch>
      </Layout>
   </StyleRoot>
  );
}

export default App;
