import React from 'react';
import './SideDrawer.css';
import {withRouter, NavLink} from 'react-router-dom';

const sideDrawer = props =>{

    const logoutHandler = ()=>{
     localStorage.clear();
    };
    
    return(
        
        <div className='SideDrawer' style={{ display:props.show?null:'none'}}>

            <div className='DrawerHeader'>
                <p className='DrawerHeaderText'>Admin</p>
            </div>

            <div className='DrawerContent'>
         

                    <ul className='DrawerNavs'>
                       <li className='DrawerNavItem'>
                            <NavLink to='' exact activeClassName='activeLink' >
                            <i className='fa fa-cogs'></i> Settings
                            </NavLink>
                        </li> 
                        <li onClick={logoutHandler} className='DrawerNavItem'>
                            <NavLink to='logout' exact  >
                            <i className='fa fa-sign-out'></i> LogOut 
                            </NavLink>
                        </li>     
                    </ul>
           
            </div>

        </div>
    );

};


export default sideDrawer;