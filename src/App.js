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

function App() {
  return (
   <StyleRoot>
      <Layout>
        <Switch>
          <Route path='/' exact component={Landing}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/join' component={Join}/>
          <Route path='/about' component={About}/>
          <Route path='/faq' component={FAQ}/>
          <Route path='/contact' component={Contact}/>
          <Route path='/meals' component={Meals}/>
          <Route path='/chosenmeal/:id' component={ChosenMeal} />
        </Switch>
      </Layout>
   </StyleRoot>
  );
}

export default App;
