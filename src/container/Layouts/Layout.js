import React, {Component} from 'react';
import { connect } from 'react-redux';

import {} from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';


class Home extends Component {

    render(){
        return (
        <div>
            <Toolbar {...this.props}></Toolbar>
            <main className="View">
                {this.props.children}
            </main>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};


export default connect( mapStateToProps )(Home);