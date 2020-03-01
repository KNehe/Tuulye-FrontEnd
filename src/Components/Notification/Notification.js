import React from 'react';
import './Notification.css';

const notification = props =>{

    let cssClass;

    if(props.type === 'success')
    {
        cssClass = 'NotificationSuccess';

    }else if(props.type === 'danger')
    {
        cssClass = 'NotificationDanger';
    }
    
    

return(


            <React.Fragment>

                <div 
                    className={cssClass}
                    style={ { opacity:props.show? '1': '0', display:props.show? null:'none'}}
                >
                {  props.message !==  ''? 
                        <h4 style={{ padding:'0.5em'}}>{props.message}</h4>

                   : props.children
                }
               
                </div>
            </React.Fragment>
)
};


export default notification;