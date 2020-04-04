import React from 'react';
import './FAQ.css';

const faq = props =>{

    return(
        <div className='FAQMain'>
            
            <div className='FAQLeft'>
                <h4>  How do I receive my meal ? <br /> 
                    <span className='answer'> We shall contact you</span>
                </h4>

                <h4 data-testid='When'>  When do I pay for a meal ? <br /> 
                    <span className='answer'> When you choose a meal of interest</span>
                </h4>

                <h4 data-testid='Do'>  Do you provide all kinds of meals ?  <br /> 
                    <span className='answer'> We only give what we have prepared</span>
                </h4>
                
                <h4>   Where are your offices located ? <br />  
                <span className='answer'> We have no offices</span>
                </h4>

            </div>

            <div className='FAQRight'>

            </div>

        </div>
    );
};

export default faq;