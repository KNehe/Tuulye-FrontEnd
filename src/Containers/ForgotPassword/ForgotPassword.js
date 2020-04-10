import React , {useState} from 'react';
import './ForgotPassword.css';
import Button from './../../Components/Button/Button';
import ValidateEmail from './../../Utils/EmailValidation';
import axios from './../../Axios/axios';
import {connect} from 'react-redux';
import actions from './../../Store/actions';


const ForgotPassword = (props) =>{

  const [formState,setFormState] = useState({email:''});

    const [inputErrorClass, setInputErrorClass] = useState({ emailErrorClass:''});

    const [errorMessage, setErrorMessage] = useState('');

    const [showSpinner,setSpinner] = useState(false);

    const [formRef, setFormRef] = useState({});

    const loadSignInPage = ()=>{
      props.history.push('/signin');
  };

  const onInputChangedHanlder = (event)=>{
        
    event.preventDefault();
   
    const inputValue = event.target.value;
        
    setFormState({ email: inputValue })


    
};

const onSubmitFormHandler = event=>{
    event.preventDefault();
    
    
    if(formState.email.trim() === '' || formRef.email.value === '')
    {
        setInputErrorClass({ emailErrorClass:'invalidField'});
        return setErrorMessage('Email is required');
    }

    if(!ValidateEmail(formState.email.trim()))
    {
        setInputErrorClass({ emailErrorClass:'invalidField'});
        return setErrorMessage('Invalid Email');
    } 

     //clear fields
     setInputErrorClass('');
     setErrorMessage('');

     setSpinner(true);

     axios.post('/users/forgotpassword',formState)
     .then((response)=>{

      setSpinner(false);
      props.setIsEmailSentTrue();
      formRef.reset();

     })
     .catch( (error)=>{

      setSpinner(false);
      props.setIsEmailSentFalse();
      formRef.reset();
      
      if(error.message === 'Network Error'){
        return setErrorMessage('Network error');
      }
      if(error.response.data.status === 'fail'){
        setErrorMessage(error.response.data.message);
      }else{
        setErrorMessage('An eror occured ! Try again !');
      }

      console.log('ForgotPassword :', error);

     });

     

};


  return (

    <React.Fragment>
        
      <div className='ForgotMain'>
         
         {! props.isEmailSent? 
        <div className='ForgotPasswordDiv'>
        <form onSubmit={onSubmitFormHandler} ref={ (el) => setFormRef(el) }>
                    <label className='textDanger2'>{errorMessage}</label>
                    <label  htmlFor='emailField' className='emailLabel1'>Email</label>
                    <input 
                        type='email' 
                        name='email' 
                        id='emailField'
                        className={inputErrorClass.emailErrorClass}
                        onChange={ (event)=> onInputChangedHanlder(event)} 
                    />

                        <Button
                           buttonClass='ForgotPassword'
                           type='Submit'
                        >
                            { showSpinner? 
                              <i className='fa fa-spinner fa-spin'></i>:
                               'Forgot Password' 
                            }
                           
                        </Button>
                       <label className='emailLablel2' onClick={loadSignInPage}>Sign In?</label>
                     
                </form>

        </div>
        :
         
         <div className='messageDiv'>
           <p style={{ marginTop:'40px'}}> A password reset email has been sent to the email you provided</p>
         </div>

        }
      </div>

    </React.Fragment>

  );
};


const mapStateToProps = state =>{

  return{
    isEmailSent : state.forgotPass.emailSent
  }

};

const mapDispatchToProps = dispatch => {

  return{
    setIsEmailSentTrue : () => dispatch( {type: actions.FORGOT_PASSWORD_EMAIL_SENT_TRUE }),
    setIsEmailSentFalse : () => dispatch( {type: actions.FORGOT_PASSWORD_EMAIL_SENT_FALSE }),
  }

};

export default connect( mapStateToProps, mapDispatchToProps )( ForgotPassword );