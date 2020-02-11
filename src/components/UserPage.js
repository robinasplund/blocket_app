import React, {useEffect,useState} from "react";
import {Row,Col} from 'reactstrap';

function UserPage(){

  const[user,setUser]=useState({
    index:''
  });

  useEffect(() => {
		async function loadDataFromDb(){
      let path= await document.location.pathname;
      let splittedPath= path.replace('/user/','');
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
    <div className="UserComponent">

      <Row>
        <Col className="text-center mt-5">
          <p>{user.index.email}</p>
        </Col>    
      </Row>

    </div>   
  );
}
export default UserPage;