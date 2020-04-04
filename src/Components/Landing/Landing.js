import React from "react";
import './Landing.css';
import Button from './../Button/Button';
import {connect} from 'react-redux';

const content = props =>{


const loadSignInPage = ()=>{
    props.history.push('/signin');
};

const loadJoinPage = ()=>{
    props.history.push('/join');
};

const loadAppropiatePage = () =>{

   if(props.role === 'admin'){

       props.history.push('/dashboard');

   }else{
       
    props.history.push('/meals');
    
   }
};

 return(
     <div className="Main">
     <div className="Left">
 <p className="Text1">EXPERIENCE YOUR</p>
         <p className="Text2"> BEST MEAL TODAY </p>
         <div className="ButtonDiv">
             {props.isLoggedIn ?

             <React.Fragment>

                 <Button buttonClass="Continue"  className="btnContinue"click={loadAppropiatePage}>Continue</Button>

             </React.Fragment>
            :
            
             <React.Fragment>
                 
                 <Button buttonClass="SignIn" className="Btn" click={loadSignInPage}>SIGN IN</Button>
                 <Button buttonClass="Join"className="BtnJoin"  click={loadJoinPage}>JOIN</Button>

             </React.Fragment>
            }
            
         </div>
     </div>
     <div className="Right">
     </div>
     </div>
 );
};

const mapStateToProps = state =>{
    return{
        isLoggedIn: state.auth.isLoggedIn,
        role: state.auth.role
    };
};

export default connect(mapStateToProps)(content);