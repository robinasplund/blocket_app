import React, {useEffect,useState} from 'react';
import {Row,Col,Button} from 'reactstrap';
import ProductIcon from '../images/product-icon.png';
import {Link} from 'react-router-dom';
import NavbarNormal from './NavbarNormal.js';

function Article(){

  const[article,setArticle]=useState({
    id:'',
    name:'',
    category:'',
    price:'',
    description:'',
    date:'',
    userFirstName:'',
    userLastName:'',
    userPhone:'',
    userEmail:''
  });
  const[loggedInUser,setLoggedInUser]=useState({
    index:''
  });
  const[inShoppingCartSuccess,setInShoppingCartSuccess]=useState(false);
  const[inShoppingCartError,setInShoppingCartError]=useState(false);


  useEffect(() => {
		async function loadDataFromDb(){
      let path= await document.location.pathname;
      let splittedPath= path.replace('/article/','');
      let result = await fetch('/json/articles/'+splittedPath);
      result = await result.json();

      let date = result.date.toString();
      let splittedDate = date.split("",10);
     
      setArticle({
        id: result._id,
        name: result.name,
        category: result.category,
        price: result.price,
        description: result.description,
        date: splittedDate,
        userFirstName: result.user.firstName,
        userLastName: result.user.lastName,
        userPhone: result.user.phone,
        userEmail: result.user.email
      });

      let loggedInUser= await fetch('/json/login');
      loggedInUser= await loggedInUser.json();
      setLoggedInUser({
        index:loggedInUser
      });
    }
    loadDataFromDb();
    	// eslint-disable-next-line
  },[]);
  
  async function addArticleToShoppingCart(){
     
    const data = { "article": article.id };
      try {
        const response = await fetch('/json/users/'+loggedInUser.index, {
          method: 'PUT',
          body: JSON.stringify(data),  
          headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();
        console.log('Answer from backend:', JSON.stringify(json));
      }
      catch(error){
        console.error('Error:', error);
      }           
  }
  

  return(
    <div className="ArticleComponent">

      <NavbarNormal />

      <Row className="mx-auto mt-5">
        <Col xs={3}></Col>

        <Col xs={6} className="bg-light">

          <Row className="pt-5 pl-5 pr-5">
            <Col xs={8}>
              <h4 className="text-muted"> {article.name} </h4>
            </Col>
            <Col xs={4} className="text-right">
              <p className="text-muted"><strong> {article.date} </strong></p>
            </Col>           
          </Row>

          <Row className="pl-5">
            <Col xs={4} className="">
              <p className="text-muted"> 
                Kategori <Link to={'/search/'+article.category}> {article.category} </Link>
              </p>
            </Col>
          </Row>
          
          <Row className="mt-4">
            <Col>
              <img src={ProductIcon} alt="produkt-ikon" className="img-fluid max-width:100% height:auto mx-auto d-block"></img>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col xs={9} className="mx-auto">
              <p className=""> {article.description} </p>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <h5 className="text-center text-muted"><strong> {article.price} ,00 kr </strong></h5>
            </Col>
          </Row> 

          <Row className="mt-4">
            <Col>
              <Row className="h-25">
                <Col>
                  <p> {article.userFirstName} {article.userLastName} </p>
                </Col>
              </Row>
              <Row className="h-25">
                <Col>
                  <p> {article.userPhone} </p>
                </Col>
              </Row>
              <Row className="h-25">
                <Col>
                  <p> {article.userEmail} </p>
                </Col>
              </Row>
            </Col>
          </Row> 

        </Col>

        <Col xs={3}>
          <Row className="">
            <Col className="mx-auto text-center">
              <Button color="success" onClick={addArticleToShoppingCart}>Lägg till i varukorg</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              {!inShoppingCartSuccess ? '' : 
                <p className="text-success mt-2 ml-3"> Varan ligger nu i din varukorg </p>
              }
               {!inShoppingCartError ? '' : 
                <p className="text-danger mt-2 ml-3"> Varan ligger redan i din varukorg </p>
              }
            </Col>
          </Row>
        </Col>
         
      </Row>
    </div>
  )
}
export default Article;









/*
    -- Check if user allready has article in basket
    let fullUser = await fetch('/json/users/'+loggedInUser.index);
    fullUser = await fullUser.json();

    for(let articlish of fullUser.articles){
      //console.log(articlish._id);
      if(articlish._id === article.id){
        console.log('same');
        setInShoppingCartError(true);
      }
      else{
        setInShoppingCartError(false);
        setInShoppingCartSuccess(true);
      }
    }

    */