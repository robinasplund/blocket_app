import React,{useState} from 'react';
import {Row,Col} from 'reactstrap';
import {Link} from 'react-router-dom';

function SearchPageCategories({setArticles}){
 
  async function categorySearch(name){
   let result = await fetch('/json/articles/category/'+name);
   result= await result.json();
   //console.log(result);

       // Handle date
       for(let x=0; x<result.length; x++){
        result[x].date= result[x].date.toString();
        result[x].date= result[x].date.split("",10);
      }

   setArticles({
     index:result
   });
}

  return(
    <div className="SearchPageCategoriesComponent">
      
      <Row>
        <Col>
          <p className="text-muted pb-3"><strong> Kategorier </strong></p>
        </Col>
      </Row>

      <Row>
        <Col>      
          <Link to={'/search/möbler'} style={{ textDecoration: 'none' }}>               
            <p className="text-muted" onClick={()=>categorySearch('möbler')}> Möbler </p>
          </Link>                 
        </Col> 
      </Row>
      <Row>
        <Col>      
          <Link to={'/search/kläder'} style={{ textDecoration: 'none' }}>               
            <p className="text-muted" onClick={()=>categorySearch('kläder')}>  Kläder </p>
          </Link>                 
        </Col> 
      </Row>
      <Row>
        <Col>      
          <Link to={'/search/bilar'} style={{ textDecoration: 'none' }}>               
            <p className="text-muted" onClick={()=>categorySearch('bilar')}>  Bilar </p>
          </Link>                 
        </Col> 
      </Row>
      <Row>
        <Col>      
          <Link to={'/search/elektronik'} style={{ textDecoration: 'none' }}>               
            <p className="text-muted" onClick={()=>categorySearch('elektronik')}> Elektronik </p>
          </Link>                 
        </Col> 
      </Row>
      <Row>
        <Col>      
          <Link to={'/search/leksaker'} style={{ textDecoration: 'none' }}>               
            <p className="text-muted" onClick={()=>categorySearch('leksaker')}>  Leksaker </p>
          </Link>                 
        </Col> 
      </Row>
      <Row>
        <Col>      
          <Link to={'/search/dator/mobil'} style={{ textDecoration: 'none' }}>               
            <p className="text-muted" onClick={()=>categorySearch('dator/mobil')}>  Dator/Mobil </p>
          </Link>                 
        </Col> 
      </Row>
           
    </div>
  );

}
export default SearchPageCategories;

/*
<Row>
        <Col>
          {categories.index.map((item,key)=> 
            <Row>
              <Link to={'/search/'+item.name} style={{ textDecoration: 'none' }}>               
                <h5 className="text-muted" onClick={categorySearch(item.name)}> {item.name} </h5>
              </Link>          
            </Row>
           )} 
        </Col> 
      </Row>
      */