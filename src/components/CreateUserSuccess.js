import React from 'react';
import {Row,Col} from 'reactstrap';
import {Link} from 'react-router-dom';

import NavbarNormal from './NavbarNormal.js';

function CreateUserSuccess(){

  return(
    <div className="CreateUserSuccessComponent">

      <NavbarNormal />

      <Row className="mt-5 pt-5">
        <Col xs={6} className="mx-auto text-center">
          <p> Du har skapat en användare </p>
            <Link to={"/login/"} style={{ textDecoration: 'none' }}>
              <p> Logga in ? </p>
            </Link>
        </Col>         
      </Row>

    </div>
  );

}
export default CreateUserSuccess;