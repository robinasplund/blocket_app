import React, { useContext } from "react";
import {Row,Col} from 'reactstrap';

import Toplist from './Toplist.js';
import Categories from './Categories.js';
import NavbarNormal from './NavbarNormal.js';

import HeaderImage from '../images/loppis.jpg';

function StartPage(){

  return(
    <div className="StartPageComponent">

     <NavbarNormal /> 

      <Row className="Header mt-4">
        <Col>
          <img 
            src={HeaderImage} 
            alt="Bild på olika typer utav varor" 
            className="img-fluid max-width:100% height:auto mx-auto d-block" 
          />             
        </Col>
      </Row>  
      
      <Toplist />
      <Categories/>
      
    </div>
  );

}
export default StartPage;

