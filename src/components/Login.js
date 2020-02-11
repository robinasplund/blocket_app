import React,{useState} from 'react';
import {Row,Col,Button} from 'reactstrap';
import {Link} from 'react-router-dom';

import NavbarNormal from './NavbarNormal.js';

function Login(){

  const[loginEmail,setLoginEmail]=useState('');
  const[loginPassword,setLoginPassword]=useState('');

  const[emailError,setEmailError]=useState(false);
  const[passwordError,setPasswordError]=useState(false);
  const[loginError,setLoginError]=useState(false);
  
  async function login(){

    // Frontend email and password validation
    setLoginError(false);
    let regXEmail = /\S+@\S+\.\S+/;
    let regXPassword = /^[\w ]+$/;
    if(!regXEmail.test(loginEmail)) { setEmailError(true); }
    else if(loginPassword.length<6 || !regXPassword.test(loginPassword)) { 
      setEmailError(false); 
      setPasswordError(true);
    }
    else{
      setPasswordError(false);

      // Backend 
      const data = { email: loginEmail, password: loginPassword };     
      try {
        const response = await fetch('/json/login/', {
          method: 'POST',
          body: JSON.stringify(data),  
          headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();
        //console.log('Answer from backend:', JSON.stringify(json));
        checkIfLoggedin();
      }
      catch(error){
        console.error('Error:', error);
      }
    }
  }

  async function checkIfLoggedin(){

    let result = await fetch('/json/login/');
    result = await result.json();
    if(result.length>0){
      let path = document.location.pathname;
      let splittedPath = path.replace('/login','/loginsuccess');
      window.location=splittedPath+result;
    }
    else{
      console.log('du kan ej logga in ');
      setLoginError(true);
    }
  }



  return(
    <div className="LoginComponent">
      

        <NavbarNormal />

        <Row className="mt-5 pt-5">
          <Col xs={3} className="mx-auto">           
            <input type="text" placeholder="E-post" className="form-control" onChange={(e)=>setLoginEmail(e.target.value)}/>           
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
            <input type="password" placeholder="Lösenord" className="form-control" onChange={(e)=>setLoginPassword(e.target.value)}/>
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
            <Button color="success" onClick={login}> Logga in </Button>
          </Col>
        </Row>
        {loginError?
        <Row>
          <Col className="mx-auto">
            <p className="text-danger text-center pt-1"><small>  Det finns ingen användare med dessa inloggningsuppgifter ! </small></p>
          </Col>
        </Row> : ''
        }
        
        <Row className="mt-4">
          <Col className="text-center">
            <Link to={"/createuser/"} style={{ textDecoration: 'none' }}>
              <p> Ingen användare ? Skapa en ny </p>
            </Link>
          </Col>
        </Row>

    </div>
  );

} 
export default Login;


