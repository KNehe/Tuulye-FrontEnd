import React,{useEffect, useState} from 'react';
import axios from './../../Axios/axios';
import MealCard from './../../Components/MealCard/MealCard';
import './Meals.css';

const Meals = props =>{

    const [mealList, setMealsState] = useState([]);

    useEffect( ()=>{

        axios.get('/meals/').then( result =>{
            setMealsState(result.data.data.meals);
        })
        .catch(err=>{
           console.log("Meals.js",err);
        });

    },[]);
    
    const onMealSelectedHandler = (mealId)=>{

        // props.history.push({
        //     pathName:'/chosenmeal',
        //     search: encodeURIComponent(mealId)
        // });
        props.history.push(`/chosenmeal/${mealId}`)
    };

    const meals = mealList.map( meal=>

        <MealCard 
            key={meal._id}  
            name={meal.name} 
            price={meal.price} 
            image={meal.image}
            click={(event)=> onMealSelectedHandler(meal._id) }
        />
    );

    
return(  
    <React.Fragment>

        <div className='MealHeader'>
            <h4 className='MealTitle'>Ready Meals</h4>
        </div>
        
        <div className='Meals'>
             {meals}
        </div>

    </React.Fragment>

      
      );
};

export default Meals;