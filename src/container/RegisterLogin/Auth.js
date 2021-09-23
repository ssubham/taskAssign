import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';   
import { Redirect } from 'react-router-dom';
//import Aux from '../../hoc/Aux';

import { Form, Button, Input, Select, Typography } from 'antd';

import classes from './Auth.css';
import * as actions from '../../store/actions/index';
//import { checkValidity } from '../../shared/Utility';


const { Option } = Select;
const { Title } = Typography;

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };


const Auth = props => {
    
    const [isSignup, setIsSignup] = useState(true)
    const {authRedirectPath, onSetAuthRedirectPath} = props;
    const [authForm, setAuthForm] = useState({
        username:"",
        useremail:"",
        userpassword:"",
        userage:"",
        role:"customer"
    })
    useEffect(() =>{
        if(authRedirectPath !== '/'){
            //onSetAuthRedirectPath();
        }
    }, [authRedirectPath, onSetAuthRedirectPath])
    
    const inputChangedHandler = (e) =>{

        setAuthForm(prevState => ({...prevState, [e.target.id] : e.target.value}))
        
    }
    const submitHandler = (event) =>{
        //event.preventDefault();
        //console.log(authForm);
        props.onAuth(authForm.username, authForm.useremail, authForm.userpassword, authForm.userage, authForm.role, isSignup)
    }
    const onRoleChangeHandler=(value) => {
        setAuthForm(prevState => ({...prevState, role : value}))
    }
    const switchSignupHandler = () =>{
        setIsSignup(!isSignup);
    }

    let errorMsg = null;
    if(props.error){
        errorMsg = (<p>{props.error.message}</p>);
    }

    let authRedirect = null;
    console.log("props.isAuthenticated ", props.isAuthenticated, props.authRedirectPath);
    if(props.isAuthenticated && props.authRedirectPath !== undefined){
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMsg}

            <Title level={3}>{isSignup ? "SignUp" : "SignIn"}</Title>

            <Form {...layout} onFinish={submitHandler}
      //onFinishFailed={onFinishFailed}
                autoComplete="off"
            //    onSubmit= {submitHandler}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Write your name!',
                    },
                    ]}
                    onChange={inputChangedHandler}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="userpassword"
                    rules={[
                    {
                        required: true,
                        message: 'Write your password!',
                    },
                    ]}
                    onChange={inputChangedHandler}
                >
                    <Input.Password />
                </Form.Item>
                {isSignup ? <Form.Item
                    label="Email"
                    name="useremail"
                    rules={[
                    {
                        required: true,
                        message: 'Write your email!',
                    },
                    ]}
                    onChange={inputChangedHandler}
                >
                    <Input />
                </Form.Item> : null}
                
                {isSignup ? <Form.Item
                    label="Age"
                    name="userage"
                    rules={[
                    {
                        required: false,
                        message: 'Write your age!',
                    },
                    ]}
                    onChange={inputChangedHandler}
                >
                    <Input />
                </Form.Item> : null }
                {isSignup ? <Form.Item label="User Role">
                
                <Select name="role" onChange={onRoleChangeHandler} defaultValue="customer">
                    <Option value="customer">Customer</Option>
                    <Option value="manager">Manager</Option>
                    <Option value="admin">Admin</Option>
                </Select>
                </Form.Item> : null}
                <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">SUBMIT</Button>
                </Form.Item>
            <Button 
                onClick = {switchSignupHandler}
                htmlType="button" > SWITCH TO {isSignup ? 'Signin': 'Signup'}
                 
            </Button>
            
            </Form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.userId !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (name, email, password, age, role, isSignup) => dispatch(actions.auth(name, email, password, age, role, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)( Auth );
