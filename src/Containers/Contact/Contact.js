import React , {useState} from 'react';
import './Contact.css';
import Button from './../../Components/Button/Button';
import ValidateEmail from './../../Utils/EmailValidation';
import axios from './../../Axios/axios';
import Notification from './../../Components/Notification/Notification';


const Contact = props =>{

    const [formState,setFormState] = useState({email:'',message:''});

    const [inputErrorClasses, setInputErrorClasses] = useState({ emailErrorClass:'', messageErrorClass:''});

    const [errorMessage, setErrorMessage] = useState('');

    const [showSpinner, setSpinner] = useState(false);

    const [notification, setNotification] = useState({type:'',show:false, message:''});

    const [formRef,setFormRef] = useState({});

    //saving  form data in state
    const onInputChangedHanlder = (event, inputName) =>{

        event.preventDefault();
        const oldState = {...formState};
        const inputValue = event.target.value;

        if(inputName === 'email'){
            
            setFormState({ email: inputValue, message: oldState.message})
        }

        if(inputName === 'message')
        {
          setFormState({ message: inputValue, email: oldState.email})
        }
    };

    //validation and submission to server
    const onFormSubmittedHandler = event =>{
        event.preventDefault();

        if(formRef.email.value.trim() === '' || formRef.teaxtArea.value.trim() === ''){
            setInputErrorClasses({ emailErrorClass:'invalidField', messageErrorClass:'invalidFieldTextArea'})
            return setErrorMessage('All fields are required');
        }

        if(formState.email.trim() === '' && formState.message.trim() === '')
        {
            setInputErrorClasses({ emailErrorClass:'invalidField', messageErrorClass:'invalidFieldTextArea'})
            return setErrorMessage('All fields are required');
        }

        if(formState.email.trim() === '')
        {
            setInputErrorClasses({ emailErrorClass:'invalidField'})
            return setErrorMessage('Email is required');
        }

        if(!ValidateEmail(formState.email.trim()))
        {
            setInputErrorClasses({ emailErrorClass:'invalidField'})
            return setErrorMessage('Invalid Email');
        }      

        if(formState.message.trim() === '')
        {
            setInputErrorClasses({ messageErrorClass:'invalidTextArea'})
            return setErrorMessage('Message is required');  
        }

        if(formState.message.trim().length < 15)
        {
            setInputErrorClasses({ messageErrorClass:'invalidTextArea'})
            return setErrorMessage('Atleast 15 characters required');   
        }

         //clear errors
         setInputErrorClasses('');
         setErrorMessage('');

         setSpinner(true);

         axios.post('/users/contactus',formState)
         .then( response =>{
            
            setSpinner(false);
            setNotification({type:'success',show:true, message:''});

            formRef.reset();  

           return setTimeout(()=>{
                setNotification({show:false});   
            },5000);
            
             
         })

         .catch(error=>{

            setSpinner(false);
            setNotification({type:'danger',show:true, message:'An error occured ! Try again'});

            formRef.reset();
            
           return setTimeout(()=>{
                setNotification({show:false}); 
            },5000);
            

        })
            
        
    };

    return (
       
        <React.Fragment>

        <Notification show={notification.show} type={notification.type} message={notification.message}>
            <p style={{ padding:'2em', fontWeight: 'bold'}}>We have received your message!</p>
       </Notification>
       
        <div className='ContactMain'>

            <div className='ContactLeft'>

                <form onSubmit={onFormSubmittedHandler} ref={ (el) => setFormRef(el) } >
                    <label className='textDanger'>{errorMessage}</label>
                    <label htmlFor='contactEmail' className='ContactLabel1'>Email</label>
                    <input 
                        type='email' 
                        name='email' 
                        id='contactEmail'
                        className={inputErrorClasses.emailErrorClass}
                        onChange={ (event)=> onInputChangedHanlder(event,'email')} 
                    />

                    <label htmlFor='textArea' className='ContactLabel2'>Message</label>
                    <textarea 
                        cols='10' 
                        rows='4' 
                        id='textArea' 
                        name='teaxtArea'
                        className={inputErrorClasses.messageErrorClass}
                        onChange={ (event)=> onInputChangedHanlder(event,'message')}
                    ></textarea>

                    <Button 
                            buttonClass='Contact' 
                            type='Submit'
                    >
                         { showSpinner? 
                              <i className='fa fa-spinner fa-spin'></i>:
                               'SEND US A MESSAGE' 
                        }
                                
                    </Button>
                </form>


            </div>

            <div className='ContactRight'></div>

        </div>
        </React.Fragment>
    );
};


export default Contact;