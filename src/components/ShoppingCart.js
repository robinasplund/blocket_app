import React,{useState,useEffect} from "react";
import {Row,Col,Button} from "reactstrap";

import ShoppingCartArticle from './ShoppingCartArticle.js';
import NavbarNormal from './NavbarNormal.js';

function ShoppingCart(){

  const[user,setUser]=useState({
    index:''
  });
  const[articles,setArticles]=useState({
    index:''
  });

  const[articlesPurchased,setArticlesPurchased]=useState( [] );

  const[showReceipt,setShowReceipt]=useState(false);

  useEffect(() => {
		async function loadDataFromDb(){
      let path= await document.location.pathname;
      let splittedPath= path.replace('/shoppingcart/','');
      let result = await fetch('/json/users/'+splittedPath);
      result = await result.json();
      setUser({
        index:result
      }); 
      setArticles({
        index:result.articles
      });     
    }
    loadDataFromDb();
    	// eslint-disable-next-line
  },[]);

async function buyArticles(){

  for(let article of articles.index){

    if(article.active===true){

      const data={
        "purchases":article.purchases+1
      }
      try {
        const response = await fetch('/json/articles/'+article._id, {
          method: 'PUT',
          body: JSON.stringify(data),  
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await response.json();
        console.log('Answer from backend:', JSON.stringify(json));
    
      }
      catch(error){
        console.error('Error:', error);
      } 

      setArticlesPurchased( [...articlesPurchased, article ]  );
      setShowReceipt(true);
      setArticles({index:''});
      
    }



  }


  
}



  return(
    <div className="ShoppingCartComponent">

      <NavbarNormal />

      <Row className="mt-5">
        <Col>
          {articles.index.length===0?'':
            articles.index.map((item,key)=> 
              <ShoppingCartArticle 
                item={item} 
                key={key+1} 
                articlesPurchased={articlesPurchased}
                setArticlesPurchased={setArticlesPurchased} 
              />  
            )
          }
        </Col>
      </Row>

      {articles.index.length===0?'':
      <Row className="mt-5 pb-5">
        <Col xs={3}className="mx-auto text-center">
          <Button color="success" onClick={buyArticles}> Köp </Button>
        </Col>
      </Row>}

      <button onClick={()=>console.log(articles,articlesPurchased,showReceipt)}>SHOW NIGA</button>
    </div>
  );
}
export default ShoppingCart;