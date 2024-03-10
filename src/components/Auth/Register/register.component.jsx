import React ,{useState} from "react";
import { Grid ,Form,Segment, GridColumn, Header ,Icon,Message} from "semantic-ui-react";
import './Auth.css';
const Register = () => {
 
let user = {
    userName: '',
    email: '',
    password: '',
    confirmpassword: ''
}

let errors = [];

const [userState, setuserState] = useState(user);
const [errorState, seterrorState] = useState([]);


    const handleInput = (event) => {
  let target = event.target;
  setuserState((currentState) => {
    let currentuser = {...currentState};
    currentuser[target.name] = target.value;
    return currentuser;
    })
}

const checkForm = () => {
    if(isFormEmpty()){
        seterrorState((error) => error.concat({message: 'Fill in all fields'}));
        return false;
}else if(!checkPassword){
    return false;
}
return true;
}
const isFormEmpty = () =>{
    return !userState.userName.length || !userState.email.length || !userState.password.length || !userState.confirmpassword.length;
}

const checkPassword = () => {
  if (userState.password.length < 8) {
    seterrorState((error) => error.concat({ message: "Password length should be greater than 8" }));
    return false;
  } else if (userState.password !== userState.confirmpassword) {
    seterrorState((error) => error.concat({ message: "Password and Confirm Password do not match" }));
    return false;
  }
  return true;
}


const onSubmit = (event) => {
    seterrorState(() => []);
if(checkForm()){
    
}else{

}
}

const formaterrors = () => {
   return errorState.map((error,index) => <p key={index}>{error.message}</p>)
}


return (<Grid verticalAlign="middle" textAlign="center" className="grid-form">
<GridColumn style={{ maxWidth:'500px'}}>
<Header as ='h2'>
<Icon name='slack' />
Register 
</Header>
<Form onSubmit={onSubmit}>
<Segment stacked>

<Form.Input name="userName" icon="user" 
value={userState.userName} iconPosition="left" onChange={handleInput} placeholder="Username" type="text" />

<Form.Input name="email" icon="mail" 
value={userState.email} iconPosition="left" onChange={handleInput} placeholder="User email" type="email" />

<Form.Input name="password" icon="lock" 
value={userState.password} iconPosition="left" onChange={handleInput} placeholder="User password" type="password" />

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
<button>Submit</button>
</Form>

{errorState.length > 0 && <Message error>
<h3>Errors</h3>
{formaterrors()}
</Message>}
</GridColumn>
</Grid>)
}

export default Register;
