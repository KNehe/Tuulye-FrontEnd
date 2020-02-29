import React from 'react';
import './Modal.css';


const modal = props =>{
    
    let cssClass;

    if(props.type === 'error')
    {
        cssClass = 'ModalError';

    }else if(props.type === 'message')
    {
        cssClass = 'ModalMessage';

    }

    return (
    
        <React.Fragment>

            <div 
                className={cssClass}
                style={ { opacity:props.show? '1': '0'}}
            >
             {props.children}
            </div>
        </React.Fragment>
        
    );
};

export default modal;