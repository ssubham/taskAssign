import React, {Component} from 'react';
import { connect } from 'react-redux';

//import classes from './Home.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';


class Home extends Component {

    render(){
        return (
        <div>
            <Toolbar></Toolbar>
            <main >
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