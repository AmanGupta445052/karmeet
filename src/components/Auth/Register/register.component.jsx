import React, { useState } from "react";
import { Grid, Form, Segment, GridColumn, Header, Icon, Message } from "semantic-ui-react";
import "../Auth.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../server/firebase.js";
import { Link, useNavigate } from "react-router-dom"; 
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Register = () => {
  const auth = getAuth();
  const navigate = useNavigate(); 
  let user = {
    userName: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  const userCollectionRef = collection(db, "users");

  const [userState, setuserState] = useState(user);
  const [errorState, seterrorState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInput = (event) => {
    let target = event.target;
    setuserState((currentState) => {
      let currentuser = { ...currentState };
      currentuser[target.name] = target.value;
      return currentuser;
    });
  };

  const checkForm = () => {
    if (isFormEmpty()) {
      seterrorState((error) => error.concat({ message: "Fill in all fields" }));
      return false;
    } else if (!checkPassword()) {
      return false;
    }
    return true;
  };

  const isFormEmpty = () => {
    return (
      !userState.userName.length ||
      !userState.password.length ||
      !userState.email.length ||
      !userState.confirmpassword.length
    );
  };

  const checkPassword = () => {
    if (userState.password.length < 8) {
      seterrorState((error) =>
        error.concat({ message: "Password length should be greater than 8" })
      );
      return false;
    } else if (userState.password !== userState.confirmpassword) {
      seterrorState((error) =>
        error.concat({ message: "Password and Confirm Password do not match" })
      );
      return false;
    }
    return true;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    seterrorState(() => []);
    setIsSuccess(false);
    if (checkForm()) {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, userState.email, userState.password)
        .then((createdUserCredential) => {
          const createdUser = createdUserCredential.user;
          updateProfile(createdUser, {
            displayName: userState.userName,
            photoURL: `http://gravatar.com/avatar/${createdUser.uid}?d=identicon`,
          }).then(() => {
            saveUserInDB(createdUser);
          }).catch((profileError) => {
            setIsLoading(false);
            seterrorState((error) => error.concat(profileError));
          });
        })
        .catch((serverError) => {
          setIsLoading(false);
          if (serverError.code === 'auth/email-already-in-use') {
            seterrorState((error) => error.concat({ message: 'Email address is already in use. Please use a different email.' }));
          } else {
            seterrorState((error) => error.concat(serverError));
          }
        });
    }
  };

  const saveUserInDB = (createdUser) => {
    setIsLoading(true);
    addDoc(userCollectionRef, {
      uid: createdUser.uid,
      displayName: userState.userName,
      photoURL: `http://gravatar.com/avatar/${createdUser.uid}?d=identicon`,
    })
      .then(() => {
        setIsLoading(false);
        setIsSuccess(true);
        navigate('/login');
      })
      .catch((error) => {
        setIsLoading(false);
        seterrorState((errorState) => [...errorState, error]);
      });
  };

  const formaterrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-yellow-300 to-blue-500 w-screen">
    <Grid verticalAlign="middle" textAlign="center" style={{ width: '100%', maxWidth: '400px' }}>
      <GridColumn >
        <Header as="h2">
          <br/>
          Register
        </Header>
        <Form onSubmit={onSubmit} >
          <Segment stacked>
            <Form.Input
              name="userName"
              icon="user"
              value={userState.userName}
              iconPosition="left"
              onChange={handleInput}
              placeholder="Username"
              type="text"
            />

            <Form.Input
              name="email"
              icon="mail"
              value={userState.email}
              iconPosition="left"
              onChange={handleInput}
              placeholder="User email"
              type="email"
            />

            <Form.Input
              name="password"
              icon="lock"
              value={userState.password}
              iconPosition="left"
              onChange={handleInput}
              placeholder="User password"
              type="password"
            />

            <Form.Input
              name="confirmpassword"
              icon="lock"
              value={userState.confirmpassword}
              iconPosition="left"
              onChange={handleInput}
              placeholder="Confirm Password"
              type="password"
            />
          </Segment>
          <button className="bg-white w-20 h-10 rounded-lg">Submit</button>
        </Form>

        {errorState.length > 0 && (
          <Message error>
            <h3>Errors</h3>
            {formaterrors()}
          </Message>
        )}
        {isSuccess && (
          <Message success>
            <h3>Successfully Registered</h3>
          </Message>
        )}
        <Message>
          Already an User? <Link to="/login">Login </Link>
        </Message>
      </GridColumn>
    </Grid>
    </div>
  );
};

export default Register;
