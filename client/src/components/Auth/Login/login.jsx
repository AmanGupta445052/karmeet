import React, { useState } from 'react';
import { Grid, Form, Segment, Header, Icon, Button, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../../server/firebase.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import '../Auth.css';

const Login = () => {
  const auth = getAuth();
  const [userState, setUserState] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState([]);

  const handleInput = event => {
    const { name, value } = event.target;
    setUserState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const checkForm = () => {
    if (!userState.email || !userState.password) {
      setErrorState([{ message: 'Please fill in all fields' }]);
      return false;
    }
    return true;
  };

  const onSubmit = event => {
    event.preventDefault();
    setErrorState([]);
    if (checkForm()) {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, userState.email, userState.password)
        .then(userCredential => {
          setIsLoading(false);
          const user = userCredential.user;
          console.log(user);
          // You can navigate to another page or perform other actions upon successful login
        })
        .catch(error => {
          setIsLoading(false);
          setErrorState([{ message: error.message }]);
        });
    }
  };

  const formatErrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>);
  };

  return (
    <Grid verticalAlign="middle" textAlign="center" className="grid-form">
      <Grid.Column style={{ maxWidth: '500px' }}>
        <Header icon as="h2">
          <Icon name="user" />
          Login
        </Header>
        <Form onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              name="email"
              value={userState.email}
              icon="mail"
              iconPosition="left"
              onChange={handleInput}
              type="email"
              placeholder="User Email"
            />
            <Form.Input
              name="password"
              value={userState.password}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="User Password"
            />
          </Segment>
          <Button disabled={isLoading} loading={isLoading} type="submit">
            Login
          </Button>
        </Form>
        {errorState.length > 0 && (
          <Message error>
            <h3>Errors</h3>
            {formatErrors()}
          </Message>
        )}
        <Message>
          Not a User? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
