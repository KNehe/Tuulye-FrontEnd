import React , {useState} from 'react';
import './Contact.css';
import Button from './../../Components/Button/Button';
import ValidateEmail from './../../Utils/EmailValidation';


const Contact = props =>{

    const [formState,setFormState] = useState({email:'',message:''});

    const [inputErrorClasses, setInputErrorClasses] = useState({ emailErrorClass:'', messageErrorClass:''});

    const [errorMessage, setErrorMessage] = useState('');

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

         //clear fields
         setInputErrorClasses('');
         setErrorMessage('');

         //submit to server
         console.log(formState);
    };

    return (
        <div className='ContactMain'>

            <div className='ContactLeft'>

                <form onSubmit={onFormSubmittedHandler}>
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

                    <Button buttonClass='Contact' type='Submit'>SEND US A MESSAGE</Button>
                </form>


            </div>

            <div className='ContactRight'></div>

        </div>
    );
};


export default Contact;