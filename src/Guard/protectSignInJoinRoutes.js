import React from 'react';
import {Route, Redirect} from 'react-router-dom';


const ProtectSignInJoinRoutes = ( { component: Component, authStatus, ...rest}) =>{
  
    return (
        <Route {...rest} render={
            
            props => {

                if(authStatus){

                    return <Redirect to={
                        {
                            pathname:'/',
                            state:{
                                from:props.location
                            }
                        }
                    }
                    />
                    
                }else{

                    return <Component {...rest} {...props}/>
                    
                }
            
        }
        }/>
    )

};


export default ProtectSignInJoinRoutes;