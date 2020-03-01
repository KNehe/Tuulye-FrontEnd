import React,{useState,useEffect} from 'react';
import axios from './../../Axios/axios';
import MealCard from './../../Components/MealCard/MealCard';
import './ChosenMeal.css';
import Button from './../../Components/Button/Button';
import isPhoneNumberValid from './../../Utils/PhoneValidation';
import Notification from './../../Components/Notification/Notification';


const ChosenMeal = props =>{

    const [meal,setMeal] = useState({});

    const [errorMessage,setErrorMessage] = useState('');

    const [inputValues, setInputValues] = useState({pin:'',phone:'',network:''});

    const [inputErrorClasses,setInputErrorClasses] = useState({phoneInputErrorClass:'',pinInputErrorClass:''});

    const [notification, setNotification] = useState({type:'',show:false, message:''});

    const [spinner,setSpinner] = useState(false);

    useEffect( ()=>{

        const mealId = props.match.params.id;

        axios.get( `meals/${mealId}`)
        .then((response)=>{
            const {data} = response;
            setMeal(data.data.meal);
        })
        .catch((error)=>{
            console.log(error);
        });
        
    },[props.match.params.id]);
    
    const onInputChangedHandler = (event, inputName) =>{

        event.preventDefault();

        let inputValue = event.target.value;
        const previousState = {...inputValues};

        if(inputName === 'network'){
            setInputValues({network:inputValue,pin:previousState.pin,phone:previousState.phone});
        }

        if(inputName === 'pin'){
            setInputValues({network:previousState.network,pin:inputValue,phone:previousState.phone});
        }

        if(inputName === 'phone'){
            setInputValues({network:previousState.network,pin:previousState.pin,phone:inputValue});
        }

    };
    

    const onPayButtonClickedHandler = event =>{

        event.preventDefault();
    
        const prevError = {...inputErrorClasses};
         
        if(inputValues.network === '' && inputValues.phone  === '' && inputValues.pin  === ''){
            setInputErrorClasses({phoneInputErrorClass:'invalidField',pinInputErrorClass:'invalidField'});
            return setErrorMessage('All fields are required');
        }
        if(inputValues.network === ''){
            return setErrorMessage('Choose a network');
        }
        if(inputValues.phone ==='' ){
            setInputErrorClasses({phoneInputErrorClass:'invalidField',pinInputErrorClass:prevError.pinInputErrorClass});
            return setErrorMessage('Phone Number is required');
        }

        if(!isPhoneNumberValid(inputValues.phone)){
            setInputErrorClasses({phoneInputErrorClass:'invalidField',pinInputErrorClass:prevError.pinInputErrorClass});
            return setErrorMessage('Invalid Phone Number');
        }
        if(inputValues.pin  === ''){
            setInputErrorClasses({pinInputErrorClass:'invalidField',phoneInputErrorClass:prevError.phoneInputErrorClass});
            return setErrorMessage('A pin is required');
        }
        
        setErrorMessage('');
        setInputErrorClasses(''); 
        
        setSpinner(true);

        axios.post('meals/payBill',inputValues)
            .then(response=>{
                setSpinner(false);
                setNotification({type:'success',show:true, message:''});
               return setTimeout(()=>{
                    setNotification({show:false});           
                },5000);
            })
            .catch(error=>{
                setSpinner(false);
                setNotification({type:'danger',show:true, message:'An error occured ! Try again'});
               return setTimeout(()=>{
                    setNotification({show:false});           
                },5000);
            });
        
    };
    

    const mealDisplay =  
        <MealCard 
            key={meal._id}  
            name={meal.name} 
            price={meal.price} 
            image={meal.image}
        />


    return(
        <React.Fragment>

            <Notification show={notification.show} type={notification.type} message={notification.message}>
                <p style={{ padding:'0.5em'}}>Payment successfull !</p>
                <p style={{ padding:'0.5em'}}>You'll be called shortly</p>
            </Notification>

            <div className='ChosenMain'>

                <div className='ChosenLeft'>
                    <h4 className='CTitle'>Chosen Meal</h4>
                    {mealDisplay}
                </div>

                <div className='ChosenRight'>
                    <label className='textError'>{errorMessage}</label>
                    <form onSubmit={onPayButtonClickedHandler}>
                    <div className='Radios'>
                        <input type='radio' name='pay' id='airtel' value='airtel'
                               onChange={ (event)=> onInputChangedHandler(event,'network')}/>
                        <label htmlFor='airtel' id='airtelLabel'>Airtel Money</label>
                        
                        <span className='SpaceBox'></span>

                        <input type='radio' name='pay' id='mtn' value='mtn'
                               onChange={ (event)=> onInputChangedHandler(event,'network')}/>
                        <label htmlFor='mtn' id='mtnLabel'>MTN Mobile Money</label>
                    </div>

                    <div className='InputsPay'>
                        <label htmlFor='phoneN'>Phone Number</label>
                        <input type='text' id='phoneN' name='phoneN'
                               onChange={ (event)=> onInputChangedHandler(event,'phone')}
                               className={inputErrorClasses.phoneInputErrorClass}/>

                        <label htmlFor='pin' id='pinLabel'>Pin</label>
                        <input type='password' id='pin'
                               onChange={ (event)=> onInputChangedHandler(event,'pin')}
                               className={inputErrorClasses.pinInputErrorClass}/>

                        <Button
                             buttonClass='Pay' 
                             type='Submit'
                        >
                            { spinner? 
                              <i className='fa fa-spinner fa-spin'></i>:
                               'Pay' 
                            }
                            
                        </Button>
                    </div>
                    </form>
                </div>

        </div>

        </React.Fragment>
        
    );
};

export default ChosenMeal;