import React from 'react';
import './HumbergerIcon.css';

const humbergerIcon = props =>{

    return (
        <div 
            className='HumbergerIcon' 
            style={{ opacity:props.show?1:0}}
            onClick={props.click}
        >
            <div className='HumbergerLine'></div>
            <div className='HumbergerLine'></div>
            <div className='HumbergerLine'></div>
        </div>
    );

};

export default humbergerIcon;