import React,{useEffect, useState} from 'react';
import axios from './../../Axios/axios';
import AdminMealCard from './../../Components/AdminMealCard/AdminMealCard';
import Modal from '../../Components/Modal/Modal';
import BackDrop from './../../Components/BackDrop/BackDrop';
import Button from './../../Components/Button/Button';
import './ManageMeals.css';
import Notification from '../../Components/Notification/Notification';
import storage from './../../Firebase/firebase';

const ManageMeals = props =>{

    const [mealList, setMealsState] = useState([]);
    const [noResult, setNoResult] = useState('');

    const [showEditModal, setEditModal] = useState(false);
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [showBackDrop, setBackDrop] = useState(false);
    const [showAddMealModal,setShowAddMealModal] = useState(false);

    //meal for editing
    const [chosenMeal,setChosenMeal] = useState({name:'',price:'',image:'',_id:''});

    //meal for adding
    const [meal,setMeal] = useState({name:'',price:'',image:''});
    
    const [imageFile,setImageFile]= useState({});
    
    const [errorMessage,setErrorMessage] = useState('');

    const [notification, setNotification] = useState({type:'',show:false, message:''});

    const [spinner,setSpinner] = useState(false);

    const [pagination, setPagination] = useState({size:3,page:1});
    const[numberOfPages, setNumberOfPages] = useState({number:1});

       //used to track if user has cleared search box
    //and cause useEffect to run again
    const[isSearchEmpty, setIsSearchEmpty] = useState(false);

    
    //used to determine whether to show pagination or not
    //if true then no need to paginate
    const [searchValue,setSearchValue] =useState(true);

    useEffect( ()=>{

        axios.get(`/meals/${pagination.size}/${pagination.page}`).then( result =>{
            setMealsState(result.data.data.meals);
            setNumberOfPages(result.data.data.pages);
            setIsSearchEmpty(false);
        })
        .catch(err=>{
           console.log("Meals.js Error",err);
        });

    },[notification,pagination.page,pagination.size,isSearchEmpty]);

    const onBtnCancelClickedHandler = event =>{
        event.preventDefault();

        setEditModal(false);
        setDeleteModal(false);
        setBackDrop(false);
        setShowAddMealModal(false);
        setSpinner(false);

    };

    const pencilClickedHandler = (event,meal)=>{
        event.preventDefault();
        setChosenMeal(meal);
        setEditModal(true);
        setBackDrop(true);

    };

    const trashClickedHandler = (event,meal) =>{

        event.preventDefault();

        setChosenMeal(meal);
        setDeleteModal(true);
        setBackDrop(true);

    };

    const onBackDropClickedHandler = () =>{
     setEditModal(false);
     setDeleteModal(false);
     setBackDrop(false);
     setShowAddMealModal(false);
    };

    const onInputChangedHandler = (event,inputName) =>{
     event.preventDefault();

     const inputValue = event.target.value;

     const clonedState = {...chosenMeal};
    
     if(inputName === 'price'){

         setChosenMeal({name:clonedState.name, price:inputValue, image:clonedState.image, _id:clonedState._id});
     }
     if(inputName === 'image'){

         const imageFile = event.target.files[0];
         setImageFile(imageFile);
         
    }
    if(inputName === 'name'){
        setChosenMeal({name:inputValue, price:clonedState.price, image:clonedState.image, _id:clonedState._id});

         
    }
    };

    const onEditFormSubmittedHandler = event =>{

        event.preventDefault();

        if(chosenMeal.price.toString().trim() === '' || chosenMeal.name.toString().trim() === '' || chosenMeal.image === ''){
          return setErrorMessage('No changes to be made');

        }else{

            setErrorMessage('');
            setSpinner(true);

            if(imageFile != null ){

                uploadImage().then((url)=>{
                 
                    const updatedMeal = {
                        _id: chosenMeal._id,
                        name: chosenMeal.name,
                        price: chosenMeal.price,
                        image: url 
                    }
    
                    axios.patch(`/meals/${chosenMeal._id}`,updatedMeal)
                .then((result)=>{
    
                    setSpinner(false);
                    setNotification({show:true, type:'success', message: 'Changes saved successsfully !'});
    
                    return setTimeout(()=>{
                        setNotification({show:false});
                        setBackDrop(false);
                        setEditModal(false);
                    },4000);
                })
                .catch((error)=>{
                //    console.log(error);
                   setSpinner(false);
                   setErrorMessage('An error occurred !'); 
    
                   setNotification({show:true ,type:'danger',message: 'An error occurred !' });
    
                    setTimeout(()=>{
                        setNotification({show:false});
                    },3000);
    
                });
    
                }).catch(()=>{
    
                    setSpinner(false);
                    setErrorMessage('An error occurred !'); 
     
                    setNotification({show:true ,type:'danger',message: 'An error occurred !' });
     
                    setTimeout(()=>{
                        setNotification({show:false});
                    },3000);
                });

            }else{

                axios.patch(`/meals/${chosenMeal._id}`,chosenMeal)
                .then((result)=>{
    
                    setSpinner(false);
                    setNotification({show:true, type:'success', message: 'Changes saved successsfully !'});
    
                    return setTimeout(()=>{
                        setNotification({show:false});
                        setBackDrop(false);
                        setEditModal(false);
                    },4000);
                })
                .catch((error)=>{
                //    console.log(error);
                   setSpinner(false);
                   setErrorMessage('An error occurred !'); 
    
                   setNotification({show:true ,type:'danger',message: 'An error occurred !' });
    
                    setTimeout(()=>{
                        setNotification({show:false});
                    },3000);
    
                });

            }

            
           
            

        }
    };

    const onBtnDeleteClickedHandler = event =>{

        event.preventDefault();

        setSpinner(true);

        axios.delete(`/meals/${chosenMeal._id}`)
        .then((result)=>{

            setSpinner(false);
            setNotification({type:'success',show:true,message:`${chosenMeal.name} Deleted successfully !`});

            return setTimeout(()=>{
                setNotification({show:false});
                setBackDrop(false);
                setDeleteModal(false);
            },4000);

        })
        .catch((error)=>{

            setSpinner(false);
            setNotification({type:'danger',show:true,message:`Error: ${chosenMeal.name} Not Deleted !`});

            return setTimeout(()=>{
                setNotification({show:false});
                setBackDrop(false);
                setDeleteModal(false);
            },4000);

        });
    };

    const onAddMealSectionClickedHandler = event =>{

        event.preventDefault();

        setShowAddMealModal(true);
        setBackDrop(true);

    };

    const onInputAddChangedHandler = (event,inputName) =>{
        event.preventDefault();
   
        const inputValue = event.target.value;
   
        const clonedState = {...meal};
       
        if(inputName === 'price'){
   
            setMeal({name:clonedState.name, price:inputValue, image:clonedState.image});
        }

        if(inputName === 'image'){

            const image = event.target.files[0];
            setImageFile(image);
       }

       if(inputName === 'name'){
           setMeal({name:inputValue, price:clonedState.price, image:clonedState.image});
      
       }

    };

    const uploadImage = () => {
       
        return new Promise( (resolve,reject)=>{

            const uploadTask = storage.ref(`images/${imageFile.name}`).put(imageFile);

            uploadTask.on(
                "state_changed",
                snapshot => {
                  console.log('snapshot ....',snapshot);
                },
                error => {
                  // Error function ...
                  setSpinner(false);
                  setErrorMessage('An error occurred ! Try again!');
      
                  setNotification({show:true,type:'danger', message:'Image upload failed Try again!'});
                  console.log(error);
                  return setTimeout(()=>{
                      setNotification({show:false});
                      setShowAddMealModal(false);
                      setBackDrop(false);
                  },4000);
                 
                },
                () => {
                  // complete function ...
                  storage
                    .ref("images")
                    .child(imageFile.name)
                    .getDownloadURL()
                    .then(url => {
                        url ? resolve(url) : reject();
                    });
                }
              );

        });

        

     
      };

      const onAddFormSubmittedHandler = (event) => { 
        
        event.preventDefault();

        if(imageFile === '' || meal.name.trim() === '' || meal.price.trim() === ''){
            return setErrorMessage('All fields are required');

        }else{

            setErrorMessage('');
            setSpinner(true);

            uploadImage().then( (url) =>{
                 
                const newMeal = {
                    name: meal.name,
                    price:meal.price,
                    image: url
                }
                axios.post('/meals',newMeal)
                .then((result)=>{
                    
                    setSpinner(false);
                    setNotification({type:'success',show:true, message: `${result.data.data.meal.name} : Added successfully !`});
    
                    return setTimeout(()=>{
                        setNotification({show:false});
                        setShowAddMealModal(false);
                        setBackDrop(false);
                    },4000);
    
                })
                .catch((error)=>{
                    
                    setSpinner(false);
                    setErrorMessage('An error occurred ! Try again!');
    
                    setNotification({show:true,type:'danger', message:'An error occurred !'});
    
                    return setTimeout(()=>{
                        setNotification({show:false});
                        setShowAddMealModal(false);
                        setBackDrop(false);
                    },4000);
    
                });
    

            }).catch( ()=>{
                setSpinner(false);
                setErrorMessage('An error occurred ! Try again!');
    
                setNotification({show:true,type:'danger', message:'Image upload failed Try again! 2'});
                
                return setTimeout(()=>{
                    setNotification({show:false});
                    setShowAddMealModal(false);
                    setBackDrop(false);
                },4000);
            });

         

        }

    };

    const onSearchHandler = event =>{
        event.preventDefault();

        const inputValue = event.target.value;
        const query = {'name':inputValue};

        if(inputValue.trim() === ''){

          setNoResult('');

          //search is empty
          //to fire useEffect
          setIsSearchEmpty(true);

          //to allow pagination
          setSearchValue(true);
        }
        
        if(inputValue.trim() !== ''){

            axios.post('/search/',query)
            .then((result)=>{
              if(result.data.data.result === 'No results found')
              {

             //to remove pagination
              setSearchValue(false);

              return setNoResult(
                                <div
                                   style={{textAlign:'center',marginTop:'10px', fontWeight:"bold"}}>
                                       {result.data.data.result}
                                </div>
                                );
              }

              //to remove pagination
              setSearchValue(false);
              //remove no result message
              setNoResult('');
              setMealsState(result.data.data.result) 
            })
            .catch((error)=>{
                setNoResult('');
                //to remove pagination
                setSearchValue(false);
                console.log('search error: ', error);
            })

        }

       
    };

    const onPaginationLinkClickedHandler = (event,page)=>{

        event.preventDefault();
        setPagination({page:page,size:3});
  
      };
  


    const meals = mealList.map( meal=>

        <AdminMealCard 
            key={meal._id}  
            name={meal.name} 
            price={meal.price} 
            image={meal.image}
            pencilClicked={(event)=> pencilClickedHandler(event,meal) }
            trashClicked={ (event) => trashClickedHandler(event,meal) }
           
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
    

  return (
       <React.Fragment>

        
        <Notification show={notification.show} type={notification.type} message={notification.message}>
        </Notification>

       <BackDrop show={showBackDrop} clicked={onBackDropClickedHandler}/>
       
       {/* modal for editing */}
       <Modal show={showEditModal}>

             <div className='EditTitle'>
                 <h4>Edit</h4>
             </div>

             <div> 

              <div className='editTextDanger'>
                  <label >{errorMessage}</label>
              </div>

               <form className='editForm' id='editForm'onSubmit={onEditFormSubmittedHandler}>
                    
                    
                    <label  htmlFor='image' id='editlb1'>Image</label>
                    <input 
                        type='file' 
                        name='file' 
                        id='image'
                        onChange={(event)=>onInputChangedHandler(event,'image')}
                    />

                    <label  htmlFor='name' id='editlb2'>Name</label>
                    <input 
                        type='text' 
                        name='name' 
                        id='name'
                        placeholder={chosenMeal.name}
                        onChange={(event)=>onInputChangedHandler(event,'name')}
                    />

                    <label htmlFor='price' id='editlb3'>Price</label>
                    <input 
                        type='text' 
                        name='price' 
                        id='price'
                        placeholder={chosenMeal.price}
                        onChange={(event)=>onInputChangedHandler(event,'price')}
                    />
                    <div className='editBtnDiv'>
                        <Button 
                           buttonClass='editBtn'
                           type='Submit'
                        > 

                         {spinner ?  <i className='fa fa-spinner fa-spin'></i> : 'Save Changes' }
                           
                        </Button>

                        <Button 
                           buttonClass='cancelBtn'
                           click={onBtnCancelClickedHandler}
                        >
                               Cancel
                        </Button>
                        </div>
                    
                </form>

             </div>
             
       </Modal>
       
       {/* modal for deleting */}
       <Modal show={showDeleteModal}>

           <div className='DeleteModal'>
              <p>Are you sure you want to delete  <span className='DeleteModalMealName'>{chosenMeal.name}</span> ?</p>
           </div>

           <div className='deleteBtnDiv'>
                        <Button 
                           buttonClass='deleteBtn'
                           type='Submit'
                           click={onBtnDeleteClickedHandler}
                        > 

                         {spinner ?  <i className='fa fa-spinner fa-spin'></i> : 'Delete' }
                           
                        </Button>

                        <Button 
                           buttonClass='cancelBtn'
                           click={onBtnCancelClickedHandler}
                        >
                               Cancel
                        </Button>
            </div>

       </Modal>

        
       {/* modal for adding meals */}
       <Modal show={showAddMealModal}>

             <div className='EditTitle'>
                 <h4>Add Meal</h4>
             </div>

             <div> 

              <div className='editTextDanger'>
                  <label >{errorMessage}</label>
              </div>

               <form className='editForm' id='editForm'onSubmit={onAddFormSubmittedHandler}>
                    
                    
                    <label  htmlFor='image' id='editlb1'>Image</label>
                    <input 
                        type='file' 
                        name='file' 
                        id='image'
                        onChange={(event)=>onInputAddChangedHandler(event,'image')}
                    />

                    <label  htmlFor='name' id='editlb2'>Name</label>
                    <input 
                        type='text' 
                        name='name' 
                        id='name'
                        onChange={(event)=>onInputAddChangedHandler(event,'name')}
                    />

                    <label htmlFor='price' id='editlb3'>Price</label>
                    <input 
                        type='text' 
                        name='price' 
                        id='price'
                        onChange={(event)=>onInputAddChangedHandler(event,'price')}
                    />
                    <div className='editBtnDiv'>
                        <Button 
                           buttonClass='editBtn'
                           type='Submit'
                        > 

                         {spinner ?  <i className='fa fa-spinner fa-spin'></i> : 'Save Changes' }
                           
                        </Button>

                        <Button 
                           buttonClass='cancelBtn'
                           click={onBtnCancelClickedHandler}
                        >
                               Cancel
                        </Button>
                        </div>
                    
                </form>

             </div>
             
       </Modal>   
       
        <div className='MealHeader'>
            
            <h4 className='MealTitle'>Manage Meals</h4>
            
            {/* Add a meal button */}
            <div className='AddMealSection' onClick={onAddMealSectionClickedHandler}>

                <div className='AddMealLabel'>
                    +
                </div>

            </div>
            
            {/* Search input field */}
            <div className='SearchSection'>
                <input 
                        type='text' 
                        name='search' 
                        placeholder='Search'
                        onChange={onSearchHandler}
                    />
                {noResult? noResult : ''}
            </div>

        </div>
        
        {/* the list of meals */}
        <div className='MealsSection'>
             
            {meals.length === 0 ? 
                
                <div style={{ marginTop: '50px', textAlign:"center", fontSize:'20px'}}>
                    <p>Loading meals... <i className='fa fa-spinner fa-spin'></i></p> 
                </div> :

            ''}

             {noResult? '' : meals}
        </div>

        {/* pagination */}
        <div className='PaginationDiv'>
            <ul className='PaginationList'>

               { !noResult && searchValue ? paginationLinks : '' }
            
            </ul>
        
        </div>

    </React.Fragment>
  );
};

export default ManageMeals;