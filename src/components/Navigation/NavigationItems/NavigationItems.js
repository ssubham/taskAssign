import React from 'react';

import {} from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigatorItems = (props) =>(
    <ul className={"NavigationItems"}>
        <NavigationItem exact="true" link="/" active>Home</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/dashboard">UserProfile</NavigationItem>:null}
        {!props.isAuthenticated 
            ? <NavigationItem link="/auth">Register/Login</NavigationItem> 
            : <NavigationItem link="/logout">Logout</NavigationItem> 
        }
        
    </ul>
)

export default navigatorItems;