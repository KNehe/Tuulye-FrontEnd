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
            fontSize:'15px',
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
            fontSize:'15px',
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
            fontSize:'15px',
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
            fontSize:'15px',
            marginTop:'25px'
        }
    }

    //Send us a message button on contact page 
    if(props.buttonClass === 'Contact'){
        styles ={
            backgroundColor: '#FE960E',
            width:'100%',
            height:'50px',
            border:'none',
            borderRadius:'50px',
            color:'white',
            fontWeight:'bold',
            padding:'5px',
            outline:'none',
            fontSize:'15px',
            marginTop:'15px'
        }
    }

       //Pay button on chosenMeal page
       if(props.buttonClass === 'Pay'){
        styles ={
            backgroundColor: '#FE960E',
            width:'100px',
            height:'50px',
            border:'none',
            borderRadius:'50px', 
            fontWeight:'bold',
            padding:'5px',
            outline:'none',
            fontSize:'15px',
            marginTop:'15px',
            color:'white'
        }
    }

    if(props.buttonClass === 'editBtn'){
        styles ={
            backgroundColor: '#FE960E',
            width:'200px',
            height:'50px',
            border:'none',
            borderRadius:'50px', 
            fontWeight:'bold',
            padding:'5px',
            outline:'none',
            fontSize:'15px',
            marginTop:'20px',
            marginBottom:'20px',
            color:'white',
            alignSelf:'center'
        }
    }

    if(props.buttonClass === 'cancelBtn'){
        styles ={
            backgroundColor: 'black',
            width:'100px',
            height:'50px',
            border:'none',
            borderRadius:'50px', 
            fontWeight:'bold',
            padding:'5px',
            outline:'none',
            fontSize:'15px',
            marginTop:'20px',
            marginBottom:'20px',
            marginLeft:'5px',
            color:'white',
            alignSelf:'center'
        }
    }
    if(props.buttonClass === 'deleteBtn'){
        styles ={
            backgroundColor: 'red',
            width:'100px',
            height:'50px',
            border:'none',
            borderRadius:'50px', 
            fontWeight:'bold',
            padding:'5px',
            outline:'none',
            fontSize:'15px',
            marginTop:'20px',
            marginBottom:'20px',
            marginLeft:'5px',
            color:'white',
            alignSelf:'center'
        }
    }

    if(props.buttonClass === 'Continue'){
        styles ={
            backgroundColor: '#FE960E',
            width:'200px',
            height:'50px',
            border:'none',
            borderRadius:'50px',
            color:'white',
            fontWeight:'bold',
            padding:'5px',
            outline:'none',
            fontSize:'15px',
            marginTop:'25px'
        }
    }


 return(
     <button 
        style={styles} 
        onClick={props.click} 
        disabled={props.disabled}
        type={props.type}> {props.children} </button>
 );
};

export default Radium(button);