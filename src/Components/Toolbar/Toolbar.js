import React from 'react';
import './Toolbar.css';
import {withRouter, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';



const toolbar = (props) =>{

    const loadHome = ()=> {
        props.history.push('/');
    };

    return (
        <React.Fragment>

            <div className="Toolbar">
                <div className="Title">
                    <h4 onClick={loadHome}>TUULYE</h4>
                </div>
                <div className="Navigation">
                    {props.isLoggedIn?
                    
                    <ul>
                        <li>
                            <NavLink to='contact' exact activeClassName='activeLink' >{props.name}</NavLink>
                        </li>
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
        name: state.userName,
        isLoggedIn: state.isLoggedIn
    };
};


export default connect(mapStateToProps)(withRouter(toolbar));