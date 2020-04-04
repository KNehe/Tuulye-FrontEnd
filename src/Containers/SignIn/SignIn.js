import React,{useState} from 'react';
import './SignIn.css';
import Button from './../../Components/Button/Button';
import ValidateEmail from './../../Utils/EmailValidation';
import axios from './../../Axios/axios';
import {connect} from 'react-redux';
import actions from './../../Store/actions';

const SignIn = props =>{
   
    const [formState,setFormState] = useState({email:'',password:''});

    const [inputErrorClasses, setInputErrorClasses] = useState({ emailErrorClass:'', passwordErrorClass:''});

    const [errorMessage, setErrorMessage] = useState('');

    const [showSpinner,setSpinner] = useState(false);
    
    let labelStyle ={
        marginTop:'15px'
    };

    const loadJoinPage = ()=>{
        props.history.push('/join');
    };

    const onInputChangedHanlder = (event,inputName)=>{
        
        event.preventDefault();
        const oldState = {...formState};
        const inputValue = event.target.value;

        if(inputName === 'password'){
            
            setFormState({ password: inputValue, email: oldState.email})
        }

        if(inputName === 'email')
        {
          setFormState({ password: oldState.password, email: inputValue})
        }
        
    };

    const onSubmitFormHandler = event=>{
        event.preventDefault();
        
        if(formState.email.trim() === '' && formState.password.trim() === '')
        {
            setInputErrorClasses({ emailErrorClass:'invalidField', passwordErrorClass: 'invalidField' });
            return setErrorMessage('All fields are required');
        }

        if(formState.email.trim() === '')
        {
            setInputErrorClasses({ emailErrorClass:'invalidField'});
            return setErrorMessage('Email is required');
        }

        if(!ValidateEmail(formState.email.trim()))
        {
            setInputErrorClasses({ emailErrorClass:'invalidField'});
            return setErrorMessage('Invalid Email');
        }      

        if(formState.password.trim() === '')
        {
            setInputErrorClasses({ passwordErrorClass:'invalidField'});
            return setErrorMessage('Password is required');  
        }

        if(formState.password.trim().length < 6)
        {
            setInputErrorClasses({ passwordErrorClass:'invalidField'})
            return setErrorMessage('Password Must be atleast 6 characters');   
        }

         //clear fields
         setInputErrorClasses('');
         setErrorMessage('');

         setSpinner(true);

          //submit to server
          axios.post('/users/login',formState)
          .then( response =>{
              
              localStorage.setItem('token',response.data.token);
              localStorage.setItem('name',response.data.userData.name);
              localStorage.setItem('role',response.data.userData.role);

              axios.defaults.headers['authorization'] = 'Bearer ' + localStorage.getItem('token');
              
              setSpinner(false);
              props.onSetIsLoggedIn();

              if(response.data.userData.role === 'admin'){
                props.history.push('/dashboard');

              }else if(response.data.userData.role === 'user'){
                props.history.push('/meals');

              }else{
                localStorage.clear();
                props.history.push('/');
              }
              
          })
          .catch(error =>{
              setErrorMessage('Invalid Credentials!!!');
              setSpinner(false);
              console.log("SIGNIN ERROR", error);
          });

    };
    

    return(
        <div className='SignInMain'>
            
            <section className='SignInSection'>
                <form onSubmit={onSubmitFormHandler}>
                    <label className='textDanger'>{errorMessage}</label>
                    <label  htmlFor='emailField' className='label1'>Email</label>
                    <input 
                        type='email' 
                        name='email' 
                        id='emailField'
                        className={inputErrorClasses.emailErrorClass}
                        onChange={ (event)=> onInputChangedHanlder(event,'email')} 
                    />

                    <label htmlFor='passwordField'  className='label1' style={labelStyle}>Password</label>
                    <input 
                        type='password' 
                        name='password' 
                        id='passwordField'
                        className={inputErrorClasses.passwordErrorClass}
                        onChange={ (event)=> onInputChangedHanlder(event,'password')} 
                        />

                    <label className='label2'>Forgot password?</label>

                    <div className='SignBtnHolder'>
                        <Button 
                          className='SignInScreenBtn'
                           buttonClass='SignInScreenBtn'
                           type='Submit'
                        >
                            { showSpinner? 
                              <i className='fa fa-spinner fa-spin'></i>:
                               'SignIn' 
                            }
                           
                        </Button>
                       <label className='label3' onClick={loadJoinPage}>Create an account?</label>
                     </div>
                </form>

                
            </section>
            
            <section className='ImageSection'></section>
        </div>
    );

};

const mapDispatchToProps = dispatch =>{

    return{
        onSetIsLoggedIn: ()=> dispatch({ type: actions.LOGGED_IN, value:true,
         name: localStorage.getItem('name'),
        role: localStorage.getItem('role')
       })
    };
};

export default connect(null,mapDispatchToProps)(SignIn);