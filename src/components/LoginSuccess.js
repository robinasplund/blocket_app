import React, {useState,useEffect} from 'react';
import {Row,Col} from 'reactstrap';

import NavbarNormal from './NavbarNormal.js';

function LoginSuccess(){

  const[user,setUser]=useState({
    index:''
  });

  useEffect(() => {
		async function loadDataFromDb(){
      let path= await document.location.pathname;
      let splittedPath= path.replace('/loginsuccess/','');
      let result = await fetch('/json/users/'+splittedPath);
      result = await result.json();
      setUser({
        index:result
      }); 
    }
    loadDataFromDb();
    	// eslint-disable-next-line
  },[]);

  return(
    <div className="LoginSuccessComponent">

      <NavbarNormal />

      <Row className="mt-5 pt-5">
        <Col xs={6} className="mx-auto text-center">
          <p> Du är nu inloggad som <p className="text-success"> {user.index.email} </p></p>
        </Col>         
      </Row>

    </div>
  );

}
export default LoginSuccess;