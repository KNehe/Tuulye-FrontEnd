import React,{useEffect, useState} from 'react';
import axios from './../../Axios/axios';
import MealCard from './../../Components/MealCard/MealCard';
import './Meals.css';

const Meals = props =>{

    const [mealList, setMealsState] = useState([]);
    const [noResult, setNoResult] = useState('');

    useEffect( ()=>{

        axios.get('/meals/').then( result =>{
            setMealsState(result.data.data.meals);
        })
        .catch(err=>{
           console.log("Meals.js Error",err);
        });

    },[]);
    
    const onMealSelectedHandler = (mealId)=>{

        // props.history.push({
        //     pathName:'/chosenmeal',
        //     search: encodeURIComponent(mealId)
        // });
        props.history.push(`/chosenmeal/${mealId}`)
    };

    const onSearchHandler = event =>{
        event.preventDefault();

        const inputValue = event.target.value;
        const query = {'name':inputValue};

        if(inputValue.trim() === ''){
         setNoResult('');
        }
        
        if(inputValue.trim() !== ''){

            axios.post('/search/',query)
            .then((result)=>{
              if(result.data.data.result === 'No results found')
              {
              return setNoResult(
                                <div
                                   style={{marginTop:'10px', fontWeight:"bold"}}>
                                       {result.data.data.result}
                                </div>
                                );
              }
              setNoResult('');
              setMealsState(result.data.data.result) 
            })
            .catch((error)=>{
                console.log('search error: ', error);
            })

        }

       
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

            <div className='userSearch'>
                <input type='text' placeholder='Search' onChange={onSearchHandler}/>
                    {noResult? noResult : ''}
           </div>

        </div>
        
        
        <div className='Meals'>
            {noResult? '' : meals}
        </div>

    </React.Fragment>

      
      );
};

export default Meals;