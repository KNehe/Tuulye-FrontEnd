import React from 'react';
import './Toolbar.css';
import {withRouter} from 'react-router-dom';


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
                    <ul>
                        <li>About</li>
                        <li>FAQ</li>
                        <li>Contact</li>
                    </ul>
                </div>
            </div>

        </React.Fragment>
    );
}


export default withRouter(toolbar);