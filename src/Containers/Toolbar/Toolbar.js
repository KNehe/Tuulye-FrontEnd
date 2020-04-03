import React from 'react';
import './Toolbar.css';
import {withRouter, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import HumbergerIcon from '../../Components/HumbergerIcon/HumbergerIcon';
import SideDrawer from '../SideDrawer/SideDrawer';
import BackDrop from '../../Components/BackDrop/BackDrop';
import Radium from 'radium';
import actions from '../../Store/actions';



const Toolbar = (props) =>{

    const loadHome = ()=> {
        props.history.push('/');
    };

    const  onHumbergerIconClickedHandler = ()=>{

        props.onShowDrawer();

    };

    const onBackDropClickedHandler = ()=>{
     
        props.onHide();
    };

    const logoutHandler = () =>{
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

                <SideDrawer show={props.showDraw}/>
                <BackDrop show={props.showBack} clicked={onBackDropClickedHandler}/>
                
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
        name: state.auth.name,
        isLoggedIn: state.auth.isLoggedIn,
        role: state.auth.role,
        showDraw: state.drawerBackDrop.showDrawer,
        showBack: state.drawerBackDrop.showBackDrop
    };
};

const mapDispatchToProps = dispatch =>{
    
    return{
      onLoggedOut : ()=> dispatch({ type: actions.LOGOUT,value:false}),
      onShowDrawer : ()=> dispatch({ type: actions.SHOW_DRAWER}),
      onHide : () => dispatch({ type: actions.HIDE_BACKDROP_DRAWER})
    };
};




export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Radium(Toolbar)));