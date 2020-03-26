import React from 'react';
import './Modal.css';


const modal = props =>{


    return (
    
        <React.Fragment>

            <div 
                className='Modal'
                style={ { opacity:props.show? '1': '0', display:props.show? null:'none'}}
            >
             {props.children}
            </div>
        </React.Fragment>
        
    );
};

export default modal;