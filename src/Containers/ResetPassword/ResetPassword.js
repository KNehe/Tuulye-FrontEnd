import React , {useState} from 'react';
import './ResetPassword.css';
import Button from './../../Components/Button/Button';
import axios from './../../Axios/axios';
import {connect} from 'react-redux';
import actions from './../../Store/actions';



const ResetPassword = props =>{

    const [formState,setFormState] = useState({password:'', passwordConfirm:'' });

    const [inputErrorClass, setInputErrorClass] = useState({ passwordErrorClass:'', passwordConfirmErrorClass:'' });

    const [errorMessage, setErrorMessage] = useState('');

    const [successMessage, setSuccessMessage] = useState('');

    const [showSpinner,setSpinner] = useState(false);

    const [formRef, setFormRef] = useState({});

    const onInputChangedHanlder = (event, inputName)=>{
        
        event.preventDefault();
       
        const inputValue = event.target.value;

        const prevState = {...formState};

        if(inputName === 'password'){
            setFormState({ password: inputValue, passwordConfirm : prevState.passwordConfirm });
        }

        if(inputName === 'passwordConfirm'){
            setFormState({ password: prevState.password, passwordConfirm : inputValue });
        }  
    };
    
    const onSubmitFormHandler = event=>{
        event.preventDefault();
        
        
        if(formState.password.trim() === '' || formRef.password.value === ''
           || formState.passwordConfirm.trim() === '' || formRef.passwordConfirm.value === '' )
        {
            setInputErrorClass({ passwordConfirmErrorClass:'invalidField', passwordErrorClass: 'invalidField'});
            return setErrorMessage('All fields are required');
        }

        if(formState.password.trim() !== formState.passwordConfirm.trim() ){
            return setErrorMessage('Passwords don\'t match !');
        }

        if(formState.password.trim().length < 6 ){
            return setErrorMessage('At least 6 characters required !');
        }
        

         //clear fields
         setInputErrorClass('');
         setErrorMessage('');
    
         setSpinner(true);
    
         const token = props.history.location.pathname.split('/')[2];

         if(!token){
             return setErrorMessage('Unathorized request, please repeat process');
         }

         axios.patch(`/users/resetPassword/${token}`,formState)
         .then((response)=>{
           
          setSpinner(false);
          props.setIsEmailSentTrue();
          formRef.reset();
          
          setSuccessMessage('Password changed !');
        
    
         }).catch( (error)=>{
    
          setSpinner(false);
          props.setIsEmailSentTrue();
          formRef.reset();
          
          if(error.message === 'Network Error'){
            return setErrorMessage('Network error');
          }
          if(error.response.data.status === 'fail'){
            setErrorMessage('Token invalid !');

          }else{
            setErrorMessage('An error occured ! Try again !');
          }
    
          console.log('ForgotPassword :', error);
    
         });
    
         
    
    };

    return (
       
        <React.Fragment>
             <div className='ForgotMain'>
         
        <div className='ForgotPasswordDiv'>
         

                <form onSubmit={onSubmitFormHandler} ref={ (el) => setFormRef(el) }>

                <label className='textDanger2' style={{ marginBottom: '15px'}}>{errorMessage}</label>

                <label className='textSuccess2' style={{ marginBottom: '15px'}}>{successMessage}</label>

                <label  htmlFor='passwordField' className='emailLabel1'>Password</label>
                <input 
                    type='password' 
                    name='password' 
                    id='passwordField'
                    className={inputErrorClass.passwordErrorClass}
                    onChange={ (event)=> onInputChangedHanlder(event,'password')} 
                />

                <label  htmlFor='passwordConfirmField' className='emailLabel1' style={{marginTop:'20px'}}>Confirm Password</label>
                <input 
                    type='password' 
                    name='passwordConfirm' 
                    id='passwordConfirmField'
                    className={inputErrorClass.passwordConfirmErrorClass}
                    onChange={ (event)=> onInputChangedHanlder(event,'passwordConfirm')} 
                />

                    <Button
                    buttonClass='ForgotPassword'
                    type='Submit'
                    >
                        { showSpinner? 
                        <i className='fa fa-spinner fa-spin'></i>:
                        'Submit' 
                        }
                    
                    </Button>
                
                </form>
    
       

        </div>
        </div>
        </React.Fragment>
    );

};



const mapDispatchToProps = dispatch => {

    return{
      setIsEmailSentTrue : () => dispatch( {type: actions.FORGOT_PASSWORD_EMAIL_SENT_TRUE }),
      setIsEmailSentFalse : () => dispatch( {type: actions.FORGOT_PASSWORD_EMAIL_SENT_FALSE }),
    }
  
  };

export default connect(null, mapDispatchToProps) ( ResetPassword );


