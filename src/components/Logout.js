import React,{useState,useEffect} from 'react';
import {Row,Col,Button} from 'reactstrap';
import {Link} from 'react-router-dom';

import NavbarNormal from './NavbarNormal.js';

function Logout(){

  const[loginEmail,setLoginEmail]=useState({ email:'' });
  const[loginPassword,setLoginPassword]=useState({ password:'' });

  useEffect(()=>{
    async function checkIfLoggedIn(){

      let result = await fetch('/json/login');
      result = await result.json();
      //console.log(result);
      let loggedInUser = await fetch('/json/users/'+result);
      loggedInUser = await loggedInUser.json();
      //console.log(loggedInUser);
      setLoginEmail({
        loginEmail:loggedInUser.email
      });
      setLoginPassword({
        loginPassword:loggedInUser.password
      });
    }
    checkIfLoggedIn();
    // eslint-disable-next-line
  },[]);

  async function logout(){
    /*let result = await fetch('/json/login/*');
    result = await result.json();
    console.log(result); */

    const url = '/json/login/';
    const data = { email: loginEmail.email, password: loginPassword.password };
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(data),  
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      console.log('Success:', JSON.stringify(json));
    } catch (error) {
      console.error('Error:', error);
    } 
    window.location='/';
  }

  return(
    <div className="LogoutComponent">

      <NavbarNormal />

      <Row className="mt-5 pt-5">
        <Col xs={6} className="mx-auto text-center">
          <p> Är du säker på att du vill logga ut ? </p>
          <Button color="danger" onClick={logout}>Logga ut</Button>
        </Col>
      </Row>

    </div>
  );

} 
export default Logout;