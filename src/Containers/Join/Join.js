import React ,{useState}from 'react';
import './Join.css';
import Button from './../../Components/Button/Button';
import ValidateEmail from './../../Utils/EmailValidation';
import axios from './../../Axios/axios';



const  Join= (props) =>{

    const [formState,setFormState] = useState({name:'',email:'',phone:'',password:'',gender:''});

    const [inputErrorClasses, setInputErrorClasses] =
        useState({
                emailErrorClass:'', passwordErrorClass:'', nameErrorClass:'',
                genderErrorClass:'',phoneErrorClass:''
        });

    const [errorMessage, setErrorMessage] = useState('');

    const [showSpinner,setSpinner] = useState(false);


    const loadSignInPage = ()=>{
        props.history.push('/signin');
    };
    
    //Saving input filed data in state as user types
    const onInputChangeHandler = (event,inputName)=>{

        event.preventDefault();

        let oldState = {...formState};
        let inputValue = event.target.value;

        if(inputName === 'name'){
            setFormState({
                 name:inputValue,email: oldState.email, phone: oldState.phone,
                 password: oldState.password, gender: oldState.gender});
        }
        if(inputName ==='email'){
            setFormState({name:oldState.name,email: inputValue,
                          password: oldState.password, phone: oldState.phone, gender: oldState.gender});
        }
        if(inputName === 'phone'){
            setFormState({name:oldState.name,email: oldState.email,
                          password: oldState.password, phone: inputValue, gender: oldState.gender});
        }
        if(inputName === 'password'){
            setFormState({name:oldState.name,email: oldState.email, 
                         password: inputValue, phone: oldState.phone, gender: oldState.gender});
        }

        if(inputName === 'gender'){
            setFormState({name:oldState.name,email: oldState.email, 
                         password: oldState.password, phone: oldState.phone, gender: inputValue});
        }
    };
   
    //Form validation ans submition
    const onFormSubmittedHandler = event=>{
        event.preventDefault();
        
        if(formState.name.trim() === '' && formState.email.trim() === '' && formState.phone.trim() === '' 
           && formState.gender.trim() === '' && formState.password.trim() === '')
        {
            setInputErrorClasses({ nameErrorClass:'invalidField',
                                    emailErrorClass:'invalidField',
                                    phoneErrorClass:'invalidField',
                                    passwordErrorClass:'invalidField',
                                    genderErrorClass:'invalidField'});
                                    
            return setErrorMessage('All fields are required');  
        }

        if(formState.name.trim() === '')
        {
            setInputErrorClasses({ nameErrorClass:'invalidField'})
            return setErrorMessage('Name is required');  
        }

        if(formState.name.length < 2)
        {
            setInputErrorClasses({ nameErrorClass:'invalidField'})
            return setErrorMessage('Name should be atleast 2 characters');  
        }
        
        if(formState.email.trim() === '')
        {
            setInputErrorClasses({ emailErrorClass:'invalidField'});
            return setErrorMessage('Email is required');
        }

        if(!ValidateEmail(formState.email.trim()))
        {
            setInputErrorClasses({ emailErrorClass:'invalidField'})
            return setErrorMessage('Invalid Email');
        }
        
        if(formState.phone.trim() === '')
        {
            setInputErrorClasses({ phoneErrorClass:'invalidField'})
            return setErrorMessage('Phone is required');  
        }


        if(formState.password.trim() === '')
        {
            setInputErrorClasses({ passwordErrorClass:'invalidField'})
            return setErrorMessage('Password is required');  
        }

        if(formState.password.length < 6)
        {
            setInputErrorClasses({ passwordErrorClass:'invalidField'})
            return setErrorMessage('Password Must be atleast 6 characters');   
        }

        if(formState.gender.trim() === '')
        {
            setInputErrorClasses({ genderErrorClass:'invalidField'})
            return setErrorMessage('Gender is required');  
        }

         //clear fields
         setInputErrorClasses('');
         setErrorMessage('');

         setSpinner(true);

         //submit to server
         axios.post('/users/signup',formState)
         .then( response =>{
             localStorage.setItem('authToken',response.data.token);
             setSpinner(false);
             props.history.push('/meals');
         })
         .catch(error =>{
             setErrorMessage('Email already in use!');
             setSpinner(false);
             console.log("JOIN ERROR", error);
         });

    };

 return (
     <div className='JoinMain'>

         <section className='JoinLeft'>
                <form onSubmit={onFormSubmittedHandler}>
                   <label className='textDanger'>{errorMessage}</label>
                    <label htmlFor='name' className='l1'>Name</label>
                    <input 
                        type='text' 
                        name='name' 
                        id='name' 
                        onChange={ (event)=> onInputChangeHandler(event,'name')}
                        className={inputErrorClasses.nameErrorClass} 
                    />

                    <label htmlFor='email' className='l2'>Email</label>
                    <input 
                        type='email' 
                        name='email' 
                        id='email' 
                        onChange={ (event)=> onInputChangeHandler(event,'email')}
                        className={inputErrorClasses.emailErrorClass}
                    />

                    <label htmlFor='phone' className='l3'>Phone Number</label>
                    <input 
                        type='text' 
                        name='phone' 
                        id='phone' 
                        onChange={ (event)=> onInputChangeHandler(event,'phone')}
                        className={inputErrorClasses.phoneErrorClass}
                     />

                    <label htmlFor='password'  className='l4'>Password</label>
                    <input 
                        type='password' 
                        name='password' 
                        id='password' 
                        onChange={ (event)=> onInputChangeHandler(event,'password')} 
                        className={inputErrorClasses.passwordErrorClass}
                        />
                    
                    <div className='JoinRadioHolder'>
                    <label htmlFor='male'  className='l5'>Male</label>
                    <input 
                        type='radio' 
                        name='gender' 
                        id='male' 
                        value='male' 
                        onChange={ (event)=> onInputChangeHandler(event,'gender')} 
                        className={inputErrorClasses.genderErrorClass}/>
                    
                    <label htmlFor='female'  className='l6'>Female</label>
                    <input 
                        type='radio' 
                        name='gender' 
                        id='female' 
                        value='female' 
                        onChange={ (event)=> onInputChangeHandler(event,'gender')}
                        className={inputErrorClasses.genderErrorClass}
                    />  
                    </div>                  
                    
                    <div className='JoinBtnHolder'>
                       <Button 
                            buttonClass='JoinScreenBtn' 
                            type='submit'
                        >
                             { showSpinner? 
                              <i className='fa fa-spinner fa-spin'></i>:
                               'Join' 
                            }
                        </Button>
                       <label className='l7' onClick={loadSignInPage}>Already have an account?</label>
                     </div>
                </form>

         </section>

         <section className='JoinRight'></section>
     </div>
 );
};

export default Join;