import React from 'react';
import Layout from './Components/Layout/Layout';
import Landing from './Components/Landing/Landing';
import {StyleRoot}from 'radium';


function App() {
  return (
   <StyleRoot>
     <Layout>
     <Landing/>
    </Layout>
   </StyleRoot>
  );
}

export default App;
