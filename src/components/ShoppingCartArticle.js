import React from 'react';
import {Row,Col} from 'reactstrap';
import ProductIcon from '../images/product-icon.png';
import {Link} from 'react-router-dom';
import {CustomInput} from 'reactstrap';

function ShoppingCartArticle({item,articlesPurchased,setArticlesPurchased}){

  function handleClick(){
    if(item.active===true){
      item.active=false;
    }
    else{
      item.active=true;
    }
    
    //console.log(item);
  }


  return(
    
    <Row className="ShoppingCartArticleComponent">
     
    
      <Col xs={2}></Col>
      <Col xs={8}>
        <Link to={"/article/"+item._id} style={{ textDecoration: 'none' }}>
        <Row className="ShoppingCartArticle mt-1 p-2">
          <Col xs={3}>
            <img src={ProductIcon} alt="produkt-ikon" className="img-fluid max-width:100% height:auto mx-auto d-block"></img>
          </Col>
          <Col xs={4}>
            <p className="text-muted mt-4"> {item.name} </p>
          </Col>
          <Col xs={3}>
            <p className="text-muted mt-4"> {item.price} ,00 kr </p>
          </Col>        
        </Row>
        </Link>
      </Col>
      <Col xs={2}>
        <CustomInput 
          type="checkbox" 
          id={item._id} 
          className="checkbox" 
          onClick={handleClick}
        />
      </Col>

      
    </Row>  
   

  );

}
export default ShoppingCartArticle;

/*

onClick={()=>setArticlesPurchased( [...articlesPurchased, item ]  ) } 

<Link to={"/article/"+item._id} style={{ textDecoration: 'none' }}>

        <Row className="ShoppingCartArticle mt-1 p-2">
          <Col xs={3}>
            <img src={ProductIcon} alt="produkt-ikon" className="img-fluid max-width:100% height:auto mx-auto d-block"></img>
          </Col>
          <Col xs={4}>
            <p className="text-muted mt-4"> {item.name} </p>
          </Col>
          <Col xs={3}>
            <p className="text-muted mt-4"> {item.price} ,00 kr </p>
          </Col>        
        </Row>
*/