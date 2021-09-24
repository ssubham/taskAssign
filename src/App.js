import React, {Suspense, lazy} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './container/Home/Home';
import Logout from './container/RegisterLogin/Logout/Logout';
import * as actions from './store/actions/index';
import Layout from './container/Layouts/Layout';


const Auth = lazy(() => {
  return import('./container/RegisterLogin/Auth');
});
const Dashboard = lazy(() => {
  return import('./container/Dashboard/Dashboard');
});



const App = (props) => {

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props}/>} />
      <Route path="/dashboard" render={(props) => <Dashboard {...props} /> } />
      <Route path="/" exact render={(props) => <Home {...props} /> } />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated){
    routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props} /> } />
        <Route path="/dashboard" render={(props) => <Dashboard {...props} /> } />
        <Route path="/" exact render={(props) => <Home {...props} /> } />
        <Redirect to="/" />
      </Switch>
    )
    // console.log("isAuthss ", routes);
  }


  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading... </p>}>{routes}</Suspense>  
      </Layout>
    </div>
  )
}

const mapStateToProps = state => {
  
  return {
    isAuthenticated: state.auth.token !== null,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};


export default withRouter(
  connect(
    mapStateToProps, 
    mapDispatchToProps
  )(App)
);
