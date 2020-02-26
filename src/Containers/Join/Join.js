import React from 'react';
import './Join.css';
import Button from './../../Components/Button/Button';

const join= (props) =>{

    const loadSignInPage = ()=>{
        props.history.push('/signin');
    };

 return (
     <div className='JoinMain'>

         <section className='JoinLeft'>
                <form>
                    <label for='name' className='l1'>Name</label>
                    <input type='text' name='name' id='name'/>

                    <label for='email' className='l2'>Email</label>
                    <input type='email' name='email' id='email'/>

                    <label for='phone' className='l3'>Phone Number</label>
                    <input type='text' name='phone' id='phone'/>

                    <label for='password'  className='l4'>Password</label>
                    <input type='password' name='password' id='password'/>
                    
                    <div className='JoinRadioHolder'>
                    <label for='male'  className='l5'>Male</label>
                    <input type='radio' name='gender' id='male'/>
                    
                    <label for='female'  className='l6'>Female</label>
                    <input type='radio' name='gender' id='female'/>  
                    </div>                  
                    
                    <div className='JoinBtnHolder'>
                       <Button buttonClass='JoinScreenBtn'>Join</Button>
                       <label className='l7' onClick={loadSignInPage}>Already have an account?</label>
                     </div>
                </form>

         </section>

         <section className='JoinRight'></section>
     </div>
 );
};

export default join;