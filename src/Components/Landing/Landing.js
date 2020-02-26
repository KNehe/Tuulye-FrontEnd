import React from "react";
import './Landing.css';
import Button from './../Button/Button';

const content = props =>{


const loadSignInPage = ()=>{
    props.history.push('/signin');
};

const loadJoinPage = ()=>{
    props.history.push('/join');
};

 return(
     <div className="Main">
     <div className="Left">
         <p className="Text1">EXPERIENCE YOUR </p>
         <p className="Text2"> BEST MEAL TODAY </p>
         <div className="ButtonDiv">
            <Button buttonClass="SignIn" className="Btn" click={loadSignInPage}>SIGN IN</Button>
            <Button buttonClass="Join" click={loadJoinPage}>JOIN</Button>
         </div>
     </div>
     <div className="Right">
     </div>
     </div>
 );
};

export default content;