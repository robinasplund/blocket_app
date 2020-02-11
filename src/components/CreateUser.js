import React,{useState} from 'react';
import {Row,Col,Button} from 'reactstrap';

import NavbarNormal from './NavbarNormal.js';

function CreateUser(){

  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[firstName,setFirstName]=useState('');
  const[lastName,setLastName]=useState('');
  const[phone,setPhone]=useState('');

  const[emailError,setEmailError]=useState(false);
  const[passwordError,setPasswordError]=useState(false);

  async function createNewUser(){

    // Frontend email and password validation
    let regXEmail = /\S+@\S+\.\S+/;
    let regXPassword = /^[\w ]+$/;
    if(!regXEmail.test(email)) { setEmailError(true); }
    else if(password.length<6 || !regXPassword.test(password)) { 
      setEmailError(false); 
      setPasswordError(true);
    }
    else{
      setPasswordError(false);

      // Backend
      const data = { 
        firstName: firstName,
        lastName: lastName,
        phone, phone,
        email:email, 
        password:password 
      };     
      try {
        const response = await fetch('/json/users/', {
          method: 'POST',
          body: JSON.stringify(data),  
          headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();
        console.log('Success:', JSON.stringify(json));
        createUserSuccess();
      } catch (error) {
        console.error('Error:', error);
      }
    } 
  }

  async function createUserSuccess(){
    let path = document.location.pathname;
    let splittedPath = path.replace('/createuser','/createusersuccess');
    window.location=splittedPath;
  }

  return(
    <div className="CreateUserComponent">

      <NavbarNormal />

      <Row className="mt-5 pt-5">
        <Col xs={3} className="mx-auto">
          <input type="text" placeholder="Förnamn" className="form-control" onChange={(e)=>setFirstName(e.target.value)}/>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col xs={3} className="mx-auto">
          <input type="text" placeholder="Efternamn" className="form-control" onChange={(e)=>setLastName(e.target.value)}/>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col xs={3} className="mx-auto">
          <input type="text" placeholder="Telefon nummer" className="form-control" onChange={(e)=>setPhone(e.target.value)}/>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col xs={3} className="mx-auto">
          <input type="text" placeholder="E-post" className="form-control" onChange={(e)=>setEmail(e.target.value)}/>                      
        </Col>
      </Row>
      {emailError?
        <Row>
          <Col className="mx-auto">
            <p className="text-danger text-center"><small>  Ej godkänd E-post adress ! </small></p>
          </Col>
        </Row> : ''
      }

      <Row className="mt-2">
        <Col xs={3} className="mx-auto">
          <input type="password" placeholder="Lösenord" className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
        </Col>
      </Row>
      {passwordError?
        <Row>
          <Col className="mx-auto">
            <p className="text-danger text-center"><small> Lösenord får endast innehålla bokstäver och siffror och skall vara minst sex tecken långt ! </small></p>
          </Col>
        </Row> : ''
      }

      <Row className="mt-4">
        <Col className="text-center">
          <Button color="success" onClick={createNewUser}> Skapa användare </Button>
        </Col>
      </Row>

    </div>
  );
}
export default CreateUser;

/*
           <Row>
          <Col>
            {wantToLogin?'':
            <img src={GoBackIcon} alt="go back arrow"/>
            }
          </Col>
        </Row>
*/