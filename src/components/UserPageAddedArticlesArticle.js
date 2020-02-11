import React, { useEffect, useState } from 'react';
import {Row,Col} from 'reactstrap';
import ProductIcon from '../images/product-icon.png';
import {Link} from 'react-router-dom';
import DeleteIcon from '../images/delete-icon.png';
import EditIcon from '../images/edit-icon.png';
import EyeIcon from '../images/eye-icon.png';


function UserPageAddedArticlesArticle({item}){

  useEffect(()=>{
    let date = item.date.toString();
    let splittedDate = date.split("",10);
    setDate(splittedDate);
    	// eslint-disable-next-line
  },[]);

  let[date,setDate]=useState();

  async function deleteArticle(){
 
    try {
      const response = await fetch('/json/articles/'+item._id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const json = await response.json();
      console.log('Answer from backend:', JSON.stringify(json));
      let path = document.location.pathname;
      window.location=path;
    }
    catch(error){
      console.error('Error:', error);
    }     
  }

  return(   
      <Row className="UserPageAddedArticlesArticleComponent">

        <Col xs={2}></Col>

        <Col xs={8} className="mx-auto">

            <Row className="UserPageAddedArticlesArticle mt-1">
              <Col>
              
                <Row>           
                  <Col xs={3}>
                    <h5 className="text-muted pt-3 pl-3"> {item.name} </h5>
                  </Col>
                  <Col xs={3} className="text-left">
                    <p className="text-muted pt-3"> Kategori <u> {item.category} </u></p>
                  </Col>
                  <Col xs={2} className="text-left">
                    <p className="text-muted pt-3"><strong> {item.price}.00 kr </strong></p>
                  </Col>
                  <Col xs={4} className="text-right">
                    <p className="text-primary pt-3 pr-3"> {date} </p>
                  </Col>       
                </Row>

                <Row>
                < Col xs={3} className="p-3">
                    <img src={ProductIcon} alt="produkt-ikon" className="img-fluid max-width:100% height:auto mx-auto d-block"></img>
                  </Col>
                  <Col xs={9}>
                    <p className="text-muted pr-3"> {item.description} </p>
                  </Col>
                </Row>
              
              </Col>            
            </Row>

        </Col>

        <Col xs={2}>
          <Row>
            <Col xs={4}>
              <Link to={"/article/"+item._id}>
                <img 
                  src={EyeIcon} 
                  alt="Granska ikon" 
                  className="img-fluid max-width:100% height:auto mx-auto d-block icon"
                />
              </Link>
            </Col>
            <Col xs={4}>
              <Link to={"/usereditarticle/"+item._id}>
                <img 
                  src={EditIcon} 
                  alt="Redigera ikon" 
                  className="img-fluid max-width:100% height:auto mx-auto d-block icon mt-1"
                />
              </Link>
            </Col>
            <Col xs={4}>
              <img 
                src={DeleteIcon} 
                alt="Ta bort ikon" 
                className="img-fluid max-width:100% height:auto mx-auto d-block icon" 
                onClick={deleteArticle}
              />
            </Col>   
          </Row>
        </Col>

      </Row>       
  );

}
export default UserPageAddedArticlesArticle;

