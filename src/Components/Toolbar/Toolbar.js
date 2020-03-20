import React, { useState } from 'react';
import './Toolbar.css';
import {withRouter, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import HumbergerIcon from '../HumbergerIcon/HumbergerIcon';
import SideDrawer from './../../Containers/SideDrawer/SideDrawer';
import BackDrop from './../BackDrop/BackDrop';



const Toolbar = (props) =>{

    const [drawerState,setDrawerState] = useState(false);

    const loadHome = ()=> {
        props.history.push('/');
    };

    const  onHumbergerIconClickedHandler = ()=>{
        setDrawerState(true);
    };

    const onBackDropClickedHandler = ()=>{
     setDrawerState(false);
    };

    const logoutHandler = () =>{
     localStorage.clear();
     props.history.push('/');
    };

    return (
        <React.Fragment>

            <div className="Toolbar">

                <SideDrawer show={drawerState}/>
                <BackDrop show={drawerState} clicked={onBackDropClickedHandler}/>
                
                <div className="Title"> 
                    {
                        props.role == 'admin' && props.isLoggedIn ?
                      <HumbergerIcon show={true} click={onHumbergerIconClickedHandler}/> : 
                      <HumbergerIcon show={false} />
                    }

                    <h4 onClick={loadHome}>TUULYE</h4>
                </div>

                <div className="Navigation">
                    
                    {props.isLoggedIn?
                    
                    <ul>
                        <li>
                            <p >{props.name}</p>
                        </li>

                        <li onClick={logoutHandler}><i className='fa fa-sign-out'></i> </li>
                        
                    </ul>:

                    <ul>
                        <li>
                            <NavLink to='/about' exact activeClassName='activeLink' >About</NavLink>
                        </li>
                        <li>
                            <NavLink to='/faq' exact activeClassName='activeLink'  >FAQ</NavLink>
                        </li>
                        <li>
                            <NavLink to='contact' exact activeClassName='activeLink' >Contact</NavLink>
                        </li>
                        
                    </ul>
                      }
                </div>
            </div>

        </React.Fragment>
    );
};

const mapStateToProps = state =>{
    
    return{
        name: 'Nehe',
        isLoggedIn: true,
        role: 'admin'
    };
};


export default connect(mapStateToProps)(withRouter(Toolbar));