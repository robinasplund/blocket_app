import React from 'react';
import {Row,Col} from 'reactstrap';
import ProductIcon from '../images/product-icon.png';
import {Link} from 'react-router-dom';

function ToplistArticle({item}){

  return(  
      <Col xs={12} sm={2} className="ToplistArticle">
        <Link to={"/article/"+item._id} style={{ textDecoration: 'none' }}>

          <Row>
            <Col>
              <h5 className="text-center p-3 text-muted"> {item.name} </h5>
            </Col>
          </Row>        
          <Row>
            <Col>
              <img src={ProductIcon} alt="produkt-ikon" className="img-fluid max-width:100% height:auto mx-auto d-block"></img>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="text-center p-3 text-muted"> {item.price} ,00 kr </p>
            </Col>
          </Row> 
          
        </Link> 
      </Col>  
  );

}
export default ToplistArticle;