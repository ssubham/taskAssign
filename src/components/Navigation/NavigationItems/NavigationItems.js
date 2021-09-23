import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigatorItems = (props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/" active>Home</NavigationItem>
        {props.isAuthenticated? <div>UserProfile</div>:null}
        {!props.isAuthenticated 
            ? <NavigationItem link="/auth">Register/Login</NavigationItem> 
            : <NavigationItem link="/logout">Logout</NavigationItem> 
        }
        
    </ul>
)

export default navigatorItems;