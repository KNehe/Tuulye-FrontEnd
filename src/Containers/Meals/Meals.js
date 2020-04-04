import React,{useEffect, useState} from 'react';
import axios from './../../Axios/axios';
import MealCard from './../../Components/MealCard/MealCard';
import './Meals.css';

const Meals = props =>{

    const [mealList, setMealsState] = useState([]);
    const [noResult, setNoResult] = useState('');

    const [pagination, setPagination] = useState({size:3,page:1});
    const[numberOfPages, setNumberOfPages] = useState({number:1});
    
    

    useEffect( ()=>{
        
        axios.get(`/meals/${pagination.size}/${pagination.page}`).then( result =>{
            setMealsState(result.data.data.meals);
            setNumberOfPages(result.data.data.pages);
        })
        .catch(err=>{
           console.log("Meals.js Error",err);
        });

    },[pagination.page,pagination.size]);
    
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

              if(result.data.data.result === 'No results found'){

              return setNoResult(
                                <div
                                   style={{marginTop:'10px', fontWeight:"bold"}}>
                                       {result.data.data.result}
                                </div>
                                );
              }
              
          
              setNoResult('');
              setMealsState(result.data.data.result);

            })
            .catch((error)=>{
                setNoResult('');
                console.log('search error: ', error);
            })

        }

       
    };

    const onPaginationLinkClickedHandler = (event,page)=>{

      event.preventDefault();
      setPagination({page:page,size:3});

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
    
    const paginationLinks = [];

    for(let i = 1; i <= numberOfPages; i ++){

      const link = <li 
                      className={pagination.page === i ? 'PaginationLinkActive' : 'PaginationLinkNormal'} 
                      key={i}
                      onClick={ (event)=> onPaginationLinkClickedHandler(event,i) }>
                          {i}
                    </li>;

      paginationLinks.push(link); 

    }

    
return(  
    <React.Fragment>

        <div className='MealHeader'>

            <h4 className='MealTitle'>Ready Meals</h4>
            
            {/* Input search field */}
            <div className='userSearch'>
                <input type='text' placeholder='Search' onChange={onSearchHandler}/>
                    {noResult? noResult : ''}
           </div>

        </div>
        
        {/* list of meals */}
        <div className='Meals'>
            {noResult? '' : meals}
        </div>
        
        {/* pagination */}
        <div className='PaginationDiv'>
            <ul className='PaginationList'>

               { mealList.length > 1 & !noResult ? paginationLinks : '' }
            
            </ul>
        
        </div>

    </React.Fragment>

      
      );
};

export default Meals;