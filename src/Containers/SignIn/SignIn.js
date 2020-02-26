import React from 'react';
import './SignIn.css';
import Button from './../../Components/Button/Button';

const signIn = props =>{
    
    let labelStyle ={
        marginTop:'15px'
    };

    const loadJoinPage = ()=>{
        props.history.push('/join');
    };
    

    return(
        <div className='SignInMain'>
            
            <section className='SignInSection'>
                <form method='POST' action='#'>
                    <label for='email' className='label1'>Email</label>
                    <input type='email' name='email' id='email'/>

                    <label for='password'  className='label1' style={labelStyle}>Password</label>
                    <input type='password' name='password' id='password'/>

                    <label className='label2'>Forgot password?</label>

                    <div className='SignBtnHolder'>
                       <Button buttonClass='SignInScreenBtn'>SignIn</Button>
                       <label className='label3' onClick={loadJoinPage}>Create an account?</label>
                     </div>
                </form>

                
            </section>
            
            <section className='ImageSection'></section>
        </div>
    );

};


export default signIn;