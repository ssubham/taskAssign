import React from 'react';
import { NavLink } from 'react-router-dom'
//import { Button } from 'antd';

import {} from './NavigationItem.css'

const navigationItem = (props) => (
    <li className={"NavigationItem"}>
        <NavLink type="link"
            to={props.link}
            
            exact={props.exact}
            activeClassName={"active"}
        >{props.children}</NavLink>
                 {/*<a href={props.link} className={props.active ? classes.active : null}>{props.children}</a>*/}
    </li>
)

export default navigationItem;