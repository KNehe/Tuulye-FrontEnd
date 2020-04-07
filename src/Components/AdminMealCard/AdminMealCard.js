import React from 'react';
import './AdminMealCard.css';
// import image  from './../..//Assets/piza.jpg';

const adminMealCard = props =>{
    
    return (
        <div className='MealCardA' onClick={props.click}>

            <div className='CardImage' style={{marginTop:'20px'}}>
                <img src={props.image} alt='Meal'/> 
            </div>

            <div className='CardText'>
                <span className='CardName' >{props.name}</span>
                <span className='CardPrice' >{props.price}/=</span>
                <span className='AdminCardIcons'>
                    <i className='fa fa-pencil' onClick={props.pencilClicked}></i>
                    <span className='AdminCardIconsSpaceBetween'> </span>
                    <i className='fa fa-trash' onClick={props.trashClicked}></i>
                </span>
            </div>

        </div>
    );
};

export default adminMealCard;