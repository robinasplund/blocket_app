import React, {useEffect,useState} from 'react';
import {Row,Col} from 'reactstrap';
import ProductIcon from '../images/product-icon.png';
import {Link} from 'react-router-dom';

function SearchPageArticle({item}){

  return(
    <Link to={"/article/"+item._id} style={{ textDecoration: 'none' }}>
      <Row className="SearchBarArticle p-2 mt-1">

        <Col xs={3}>
          <img src={ProductIcon} alt="produkt-ikon" className="img-fluid max-width:100% height:auto mx-auto d-block"></img>
        </Col>
        <Col xs={2}>
          <h5 className="text-muted pt-4"> {item.name} </h5>
        </Col>
        <Col xs={2}>
          <p className="text-muted pt-4"><strong> {item.price} ,00 kr </strong></p>
        </Col>
        <Col xs={3} className="pt-4">
          <p className="text-muted"> {item.user.firstName} {item.user.lastName} </p>
        </Col>
        <Col xs={2}>
          <p className="text-primary"> {item.date} </p>
        </Col>
          
      </Row>
    </Link>
  );

}
export default SearchPageArticle;

