import React from 'react';
import Layout from './Components/Layout/Layout';
import Landing from './Components/Landing/Landing';
import {StyleRoot}from 'radium';
import {Route,Switch} from 'react-router-dom';
import SignIn from './Containers/SignIn/SignIn';
import Join from './Containers/Join/Join';
import About from './Components/About/About';
import FAQ from './Components/FAQ/FAQ';
import Contact from './Containers/Contact/Contact';
import Meals from './Containers/Meals/Meals';
import ChosenMeal from './Containers/ChosenMeal/ChosenMeal';
import DashBoard from './Containers/AdminDash/DashBoard';
import ManageMeals from './Containers/ManageMeals/ManageMeals';
import {connect} from 'react-redux';
import ProtectAdminRoute from './Guard/protectAdminRoute';
import ProtectUserRoute from './Guard/protectUserRoute';
import ProtectSignInJoinRoutes from './Guard/protectSignInJoinRoutes';

import NotFound from './Components/NotFound/notfound';


const App = props => {
  return (
   <StyleRoot>
      <Layout>
        <Switch>
          <Route path='/' exact component={Landing}/>
          <Route path='/logout'  component={Landing}/>

          <Route path='/about' component={About}/>
          <Route path='/faq' component={FAQ}/>
          <Route path='/contact' component={Contact}/>

          <ProtectSignInJoinRoutes exact path='/signin' authStatus={props.isLoggedIn} role={props.role} component={SignIn} />
          <ProtectSignInJoinRoutes exact path='/join' authStatus={props.isLoggedIn} role={props.role} component={Join} />

          <ProtectUserRoute exact path='/meals' authStatus={props.isLoggedIn} role={props.role} component={Meals} />
          <ProtectUserRoute exact path='/chosenmeal/:id' authStatus={props.isLoggedIn} role={props.role} component={ChosenMeal} />

          <ProtectAdminRoute exact path='/dashboard' authStatus={props.isLoggedIn} role={props.role} component={DashBoard} />
          <ProtectAdminRoute exact path='/managemeals' authStatus={props.isLoggedIn} role={props.role} component={ManageMeals} />

          <Route path="*" component ={NotFound}/>
          
        </Switch>
      </Layout>
   </StyleRoot>
  );
}

const mapStateToProps = state =>{
 
  return{
      isLoggedIn: state.auth.isLoggedIn,
      role: state.auth.role
  };
};

export default  connect(mapStateToProps)(App);
