import React from 'react';
import './Button.css';
import Radium from 'radium';

const button = props =>{
    
    let styles;

    if(props.buttonClass === 'SignIn'){
        styles ={
            backgroundColor: '#FE960E',
            width:'100px',
            height:'50px',
            border:'none',
            borderRadius:'50px',
            color:'white',
            fontWeight:'bold',
            padding:'5px',
            outline:'none',
            fontSize:'20px',
            '@media screen and (min-width: 360px)':{
                marginTop: '-20px'
            }
        }
    }
    
    if(props.buttonClass === 'Join'){
        styles ={
            backgroundColor: 'black',
            width:'100px',
            height:'50px',
            border:'none',
            borderRadius:'50px',
            color:'white',
            fontWeight:'bold',
            padding:'5px',
            fontSize:'20px',
            outline:'none',
            marginLeft:'10px',
            '@media (min-width: 360px)':{
                marginTop: '5px',
                marginLeft:'0px'
            }
        }
    }
    //signIn button on sign in screen
    if(props.buttonClass === 'SignInScreenBtn'){
        styles ={
            backgroundColor: '#FE960E',
            width:'100px',
            height:'50px',
            border:'none',
            borderRadius:'50px',
            color:'white',
            fontWeight:'bold',
            padding:'5px',
            outline:'none',
            fontSize:'20px',
            marginTop:'25px'
        }
    }
    //Join button on join screen
    if(props.buttonClass === 'JoinScreenBtn'){
        styles ={
            backgroundColor: '#FE960E',
            width:'100px',
            height:'50px',
            border:'none',
            borderRadius:'50px',
            color:'white',
            fontWeight:'bold',
            padding:'5px',
            outline:'none',
            fontSize:'20px',
            marginTop:'25px'
        }
    }


 return(
     <button style={styles} onClick={props.click}> {props.children} </button>
 );
};

export default Radium(button);