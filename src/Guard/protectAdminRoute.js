import React from 'react';
import {Route, Redirect} from 'react-router-dom';


const ProtectAdminRoute = ( { component: Component, authStatus, role, ...rest}) =>{
  
    return (
        <Route {...rest} render={
            props => {

                if(authStatus && role === 'admin'){
                    
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


export default ProtectAdminRoute;