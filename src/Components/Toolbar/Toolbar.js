import React, { useState } from 'react';
import './Toolbar.css';
import {withRouter, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import HumbergerIcon from '../HumbergerIcon/HumbergerIcon';
import SideDrawer from './../../Containers/SideDrawer/SideDrawer';
import BackDrop from './../BackDrop/BackDrop';
import Radium from 'radium';



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
     props.onLoggedOut();
     props.history.push('/');
    };

    const styles ={
        '@media (min-width: 360px)':{
            paddingLeft:'1.3em'
        },
        '@media (min-width: 400px)':{
            paddingLeft:'1.3em'
        }
    };

    return (
        <React.Fragment>

            <div className="Toolbar">

                <SideDrawer show={drawerState}/>
                <BackDrop show={drawerState} clicked={onBackDropClickedHandler}/>
                
                <div className="Title"> 
                    {
                        props.role === 'admin' && props.isLoggedIn ?
                      <HumbergerIcon show={true} click={onHumbergerIconClickedHandler}/> : 
                       <div style={styles}></div>
                    }

                    <h4 onClick={loadHome} style={{paddingLeft:'5px'}}>TUULYE</h4>
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
        name: state.name,
        isLoggedIn: state.isLoggedIn,
        role: state.role
    };
};

const mapDispatchToProps = dispatch =>{
    return{
      onLoggedOut : ()=> dispatch({ type: 'LOGOUT',value:false})
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Radium(Toolbar)));