import React from 'react';
import {Col} from 'reactstrap';

import {Link} from 'react-router-dom';

function Category({item}){

  return(
   
      <Col xs={2} className="CategoryComponent">
        <Link to={'/search/'+item.name} style={{ textDecoration: 'none' }}>

          <p className="text-center text-muted"> {item.name} </p>
          <img src={item.img} alt="product icon" className="img-fluid max-width:100% height:auto mx-auto d-block pb-4" />

        </Link> 
      </Col>
  );

}
export default Category;