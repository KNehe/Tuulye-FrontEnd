import React from 'react';
import './SideDrawer.css';
import {NavLink,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import actions from './../../Store/actions';

const sideDrawer = props =>{

    const logoutHandler = ()=> {

     props.onLogOut();

     props.onHide();

     props.history.push('/');
    };

    const onDrawerNavItemClickedHandler = () =>{

        props.onHide();

    };
    //for non-implementated parts
    const clickHandler = ()=>{
        alert('Sorry section under maintenance !');
    }
    
    return(
        
        <div className='SideDrawer' style={{ display:props.show?null:'none'}}>

            <div className='DrawerHeader'>
                <p className='DrawerHeaderText'>Admin</p>
            </div>

            <div className='DrawerContent'>
         

                    <ul className='DrawerNavs'>

                    <li className='DrawerNavItem' onClick={onDrawerNavItemClickedHandler} >
                            <NavLink to='managemeals' exact activeClassName='activeLink' >
                            <i className='fa fa-book'></i> Manage Meals
                            </NavLink>
                        </li>

                       <li className='DrawerNavItem' onClick={clickHandler}>
                            <i className='fa fa-book'></i> Orders     
                        </li> 

                        <li className='DrawerNavItem' onClick={clickHandler}>
                            <i className='fa fa-cogs'></i> Settings     
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

const mapDispatchToProps = dispatch =>{
    return{
      onLogOut : ()=> dispatch({ type: actions.LOGOUT,value:false}),
      onHide : () => dispatch({ type: actions.HIDE_BACKDROP_DRAWER})
    };
};




export default connect(null, mapDispatchToProps)(withRouter(sideDrawer)) ;