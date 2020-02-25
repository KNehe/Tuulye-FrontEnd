import React from 'react';
import './Toolbar.css';


const toolbar = (props) =>{

    return (
        <React.Fragment>

            <div className="Toolbar">
                <div className="Title">
                    <h4>TUULYE</h4>
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


export default toolbar;