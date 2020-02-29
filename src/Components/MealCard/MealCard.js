import React from 'react';
import './MealCard.css';
import image  from './../..//Assets/piza.jpg';

const mealCard = props =>{
    
    return (
        <div className='MealCard' onClick={props.click}>

            <div className='CardImage'>
                <img src={image} alt='Meal'/> 
            </div>

            <div className='CardText'>
                <span className='CardName'>{props.name}</span>
                <span className='CardPrice'>{props.price}/=</span>
            </div>

        </div>
    );
};

export default mealCard;