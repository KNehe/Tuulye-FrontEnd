import React from "react";
import './Landing.css';
import Button from './../Button/Button';

const content = props =>{
 return(
     <div className="Main">
     <div className="Left">
         <p className="Text1">EXPERIENCE YOUR </p>
         <p className="Text2"> BEST MEAL TODAY </p>
         <div className="ButtonDiv">
            <Button buttonClass="SignIn" className="Btn">SIGN IN</Button>
            <Button buttonClass="Join">JOIN</Button>
         </div>
     </div>
     <div className="Right">
     </div>
     </div>
 );
};

export default content;