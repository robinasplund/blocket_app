import React, {useEffect,useState} from "react";
import {Row,Col,Button,FormGroup,Label,Input } from 'reactstrap';

import NavbarNormal from './NavbarNormal.js';

function UserPageAddArticle(){

  const[user,setUser]=useState({
    index:''
  });
  const[article,setArticle]=useState({
    name:'',
    category:'möbler',
    price:'',
    description:'',
    purchases:0
  });

  useEffect(() => {
		async function loadDataFromDb(){
      let path= await document.location.pathname;
      let splittedPath= path.replace('/useraddarticle/','');
      let result = await fetch('/json/users/'+splittedPath);
      result = await result.json();
      setUser({
        index:result
      }); 
    }
    loadDataFromDb();
    	// eslint-disable-next-line
  },[]);

  async function saveArticle(){

    const data = { name: article.name, 
                   category: article.category, 
                   price: article.price, 
                   description: article.description,
                   purchases: article.purchases, 
                   user: user.index._id }
    try{
      const response = await fetch('/json/articles/',{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{ 'Content-Type': 'application/json' }
      });
      const json = await response.json();
      console.log('Success',JSON.stringify(json));

      let path = document.location.pathname;
      let splittedPath = path.replace(path,'/useraddedarticles/'+user.index._id);
      window.location=splittedPath;
    }
    catch (error) {
      console.error('Error:', error);
    }
  }


  return(
    <div className="UserPageAddArticle">

      <NavbarNormal />

      <Row className="mt-5 pt-5">
        <Col xs={3} className="mx-auto text-center">

          <input 
            className="form-control" 
            placeholder="Namn" 
            onChange={(e)=>setArticle({ ...article,name:e.target.value })}> 
          </input>
          <input 
            className="form-control" 
            placeholder="Pris" 
            onChange={(e)=>setArticle({ ...article,price:e.target.value })}> 
          </input>

          <FormGroup className="mt-3">
            <Label for="exampleSelect">Kategori</Label>
            <Input type="select" onChange={ (e)=>setArticle({ ...article, category: e.target.value }) } >
              <option value="möbler" > Möbler </option>
              <option value="kläder" > Kläder </option>
              <option value="bilar" > Bilar </option>
              <option value="elektronik" > Elektronik </option>
              <option value="leksaker" > Leksaker </option>
              <option value="dator/mobil" > Dator/Mobil </option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="exampleText"> Beskrivning </Label>
            <Input type="textarea" onChange={ (e)=>setArticle({ ...article, description: e.target.value }) } />
          </FormGroup>

        </Col>    
      </Row>

      <Row className="mt-5">
        <Col xs={6} className="mx-auto text-center">
          <Button color="success" onClick={saveArticle}> Spara </Button>
        </Col>
      </Row>

    </div> 
  );
}
export default UserPageAddArticle;

