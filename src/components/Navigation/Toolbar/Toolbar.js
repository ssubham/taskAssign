import React from 'react';
import {} from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';


const toolbar = (props) =>(
    
    <header className="Toolbar">
        {console.log(props)}
        <div className="Logo">
            {/*<Logo />*/}
        </div>
        <nav className="DesktopOnly">
            <NavigationItems isAuthenticated = {props.isAuthenticated}/>
        </nav>
    </header>
)

export default toolbar;