import React from 'react';
import {Route, Redirect} from 'react-router-dom';


const ProtectUserRoute = ( { component: Component, authStatus, role, ...rest}) =>{
  
    return (
        <Route {...rest} render={
            
            props => {

                if(authStatus && role ==='user'){
                    
                    return <Component {...rest} {...props}/>
                }else{
                    return <Redirect to={
                        {
                            pathname:'/',
                            state:{
                                from:props.location
                            }
                        }
                    }
                    />
                }
            
        }
        }/>
    )

};


export default ProtectUserRoute;