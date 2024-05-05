import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Grid, Form, Segment, Header, Icon, Button, Message } from 'semantic-ui-react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '../Auth.css';

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
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
        .then(() => {
          setIsLoading(false);
          navigate('/dashboard-loggedIn'); // Navigate to the dashboard after successful login
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
    <div className='flex justify-center items-center h-screen bg-gradient-to-b from-yellow-300 to-blue-500 w-screen'>
      <Grid verticalAlign="middle" textAlign="center" style={{ width: '100%', maxWidth: '400px' }}>
        <Grid.Column >
        <Header icon as="h2" >
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
          Not a User? <NavLink to="/register">Register</NavLink>
        </Message>
      </Grid.Column>
    </Grid>
    </div>
  );
};

export default Login;
