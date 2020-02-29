import React,{useState,useEffect} from 'react';
import axios from './../../Axios/axios';
import MealCard from './../../Components/MealCard/MealCard';
import './ChosenMeal.css';
import Button from './../../Components/Button/Button';
import Modal from './../../Components/Modal/Modal';
import BackDrop from './../../Components/BackDrop/BackDrop';

const ChosenMeal = props =>{

    const [meal,setMeal] = useState({});

    const [showModal, setShowModalState] = useState(false);

    useEffect( ()=>{

        const mealId = props.match.params.id;

        axios.get( `meals/${mealId}`)
        .then((response)=>{
            const {data} = response;
            setMeal(data.data.meal);
            console.log(meal);
        })
        .catch((error)=>{
            console.log(error);
        });
        
    },[]);

    const onPayButtonClickedHandler = event =>{
        event.preventDefault();
        setShowModalState(true);
    };

    const onBackDropClickedHandler = ()=>{
        setShowModalState(false);
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
            
            <BackDrop show={showModal} clicked={onBackDropClickedHandler}/>
            <Modal show={showModal} type='message'>

                <div style={{ fontWeight:'bold'}}>
                    <p >Payment Successful !</p>
                    <p style={{ marginTop: '1em'}}>We Shall Call You Shortly</p>
                </div>

            </Modal>

            <div className='ChosenMain'>

                <div className='ChosenLeft'>
                    <h4 className='CTitle'>Chosen Meal</h4>
                    {mealDisplay}
                </div>

                <div className='ChosenRight'>
                    <div className='Radios'>
                        <input type='radio' name='pay' id='airtel'/>
                        <label htmlFor='airtel' id='airtelLabel'>Airtel Money</label>
                        
                        <span className='SpaceBox'></span>

                        <input type='radio' name='pay' id='mtn'/>
                        <label htmlFor='mtn' id='mtnLabel'>MTN Mobile Money</label>
                    </div>

                    <div className='InputsPay'>
                        <label htmlFor='phoneN'>Phone Number</label>
                        <input type='text' id='phoneN'/>

                        <label htmlFor='pin' id='pinLabel'>Pin</label>
                        <input type='password' id='pin'/>

                        <Button buttonClass='Pay' click={onPayButtonClickedHandler}>Pay</Button>
                    </div>
                </div>

        </div>

        </React.Fragment>
        
    );
};

export default ChosenMeal;