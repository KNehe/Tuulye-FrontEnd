import React from 'react';
import Toolbar from '../Toolbar/Toolbar';
import './Layout.css';

const layout = props => {

    return (
        <div className="Layout">
            <Toolbar/>
            {props.children}
        </div>
    );
};

export default layout;