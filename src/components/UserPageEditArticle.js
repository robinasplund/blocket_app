import React, {useEffect,useState} from "react";
import {Row,Col,Button,FormGroup,Label,Input} from 'reactstrap';

import NavbarNormal from './NavbarNormal.js';

function UserPageEditArticle(){

  const[article,setArticle]=useState({
    id:'',
    user:'',
    name:'',
    category:'',
    price:''
  }); 
  
  useEffect(() => {
		async function loadDataFromDb(){
      let path= await document.location.pathname;
      let splittedPath= path.replace('/usereditarticle/','');
      let result = await fetch('/json/articles/'+splittedPath);
      result = await result.json();

      console.log(result);
      setArticle({
        id: result._id,
        user: result.user,
        name: result.name,
        category: result.category,
        description: result.description,
        price: result.price
      });
    }
    loadDataFromDb();
    	// eslint-disable-next-line
  },[]);


  async function saveUpdatedArticle(){

    const data={
      "name": article.name,
      "category": article.category,
      "description": article.description,
      "price": article.price
    }
    try {
      const response = await fetch('/json/articles/'+article.id, {
        method: 'PUT',
        body: JSON.stringify(data),  
        headers: { 'Content-Type': 'application/json' }
      });
    const json = await response.json();
    console.log('Answer from backend:', JSON.stringify(json));

    let path = document.location.pathname;
    let splittedPath = path.replace(path,'/useraddedarticles/'+article.user._id);
    window.location=splittedPath;
    }
    catch(error){ console.error('Error:', error); }   
  }


  return(
    <div className="UserPageEditArticleComponent">

      <NavbarNormal />

      <Row className="mt-5 pt-5">
        <Col xs={3} className="mx-auto text-center">

          <input 
            className="form-control" 
            value={article.name}
            onChange={(e)=>setArticle({ ...article,name:e.target.value })}> 
          </input>
          <input 
            className="form-control" 
            value={article.price}
            onChange={(e)=>setArticle({ ...article,price:e.target.value })}> 
          </input>

          <FormGroup className="mt-3">
            <Label for="exampleSelect">Kategori</Label>
            <Input type="select" value={article.category} onChange={ (e)=>setArticle({ ...article, category: e.target.value }) } >
              <option value="möbler" > Möbler </option>
              <option value="kläder" > Kläder </option>
              <option value="bilar" > Bilar </option>
              <option value="elektronik"  > Elektronik </option>
              <option value="leksaker" > Leksaker </option>
              <option value="dator/mobil" > Dator/Mobil </option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="exampleText"> Beskrivning </Label>
            <Input type="textarea" value={article.description} onChange={ (e)=>setArticle({ ...article, description: e.target.value }) } />
          </FormGroup>

        </Col>    
      </Row>

      <Row className="mt-5">
        <Col xs={6} className="mx-auto text-center">
          <Button color="success" onClick={saveUpdatedArticle}> Spara </Button>
        </Col>
      </Row>

    </div> 
  );
}
export default UserPageEditArticle;