import React, { useState, useEffect } from 'react';
import './DashBoard.css';
import axios from './../../Axios/axios';

const DashBoard = props =>{

    const [stats,setStats] = useState({no_of_meals:'',no_of_purchases:''});

    useEffect( ()=>{

        axios.get('statistics/')
        .then((result)=>{
            setStats({ no_of_meals: result.data.data.no_of_meals,
                       no_of_purchases: result.data.data.no_of_purchases})
        })
        .catch((error)=>{
            console.log('Dashboard.js: getStatisticsError', error);
        });

    }, []);

    return (  

        <div className='DashBoardMain'>

            <div className='DashBoardLeft'>
                <p>Number Of Meals Created</p>
                <p><span className='StatDigit'>{stats.no_of_meals}</span></p>
            </div>

            <div className='DashBoardRight'>
                <p>Number Of Purchases</p>
                <p><span className='StatDigit'>{stats.no_of_purchases}</span></p>
            </div>

        </div>
    );
};


export default DashBoard;