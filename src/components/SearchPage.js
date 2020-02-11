import React,{useEffect,useState} from 'react';
import {Row,Col} from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import SearchPageArticle from'./SearchPageArticle.js';
import SearchPageCategories from './SearchPageCategories.js';
import NavbarSearch from './NavbarSearch.js';

function SearchPage(){

  const[articles,setArticles]=useState({
    index:[]
  });
  
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);

  useEffect(() => {
		async function loadDataFromDb(){
      //console.log('running yse effect');
      let path= await document.location.pathname;
      let splittedPath= path.replace('/search/','');
      let result = await fetch('/json/articles/category/'+splittedPath);
      result= await result.json();

       // Handle date
      for(let x=0; x<result.length; x++){
        result[x].date= result[x].date.toString();
        result[x].date= result[x].date.split("",10);
      }

     setArticles({
       index: result
     });
    }
    loadDataFromDb();
    	// eslint-disable-next-line
  },[]);

  async function searchDatabase(e){

    if(e.target.value.length>0){
      let result = await fetch('/json/articles/name/'+e.target.value);
      result = await result.json();

      // Handle date
      for(let x=0; x<result.length; x++){
        console.log(result[x].date);
        result[x].date= result[x].date.toString();
        result[x].date= result[x].date.split("",10);
      }

      setArticles({ index:result });
    }
    else{
      setArticles({ index:[] });
    }
  }


  function sortByLowestPrice(){
    articles.index.sort(function(a, b) {
      return parseFloat(a.price) - parseFloat(b.price);
    });
  }
  function sortByPopularity(){
    articles.index.sort(function(a, b) {
      return parseFloat(a.purchases) - parseFloat(b.purchases);
    });
  }
  function sortByDate(){
    articles.index.sort(function(a, b) {
      // Date A
      a.date = a.date.toString();
      a.date = a.date.replace(/,/g,''); 
      a.date = a.date.replace(/-/g,''); 
      // Date B
      b.date = b.date.toString();
      b.date = b.date.replace(/,/g,''); 
      b.date = b.date.replace(/-/g,'');
     
      return parseInt(b.date) - parseInt(a.date);
    });
    rebuildDate();
  }
  function rebuildDate(){
    for(let x=0; x<articles.index.length; x++){
      articles.index[x].date= articles.index[x].date.slice(0, 4) + '-' + articles.index[x].date.slice(4, 6) + '-' + articles.index[x].date.slice(6, 8);
    }
  }


  return(
    <div className="SearchPageComponent">

      <NavbarSearch searchDatabase={searchDatabase} /> 

      <Row className="mt-5 pb-5">

        <Col xs={2}>
          <SearchPageCategories setArticles={setArticles} /> 
        </Col>

        <Col xs={8}>
          {articles.index.length === 0 ? '' : 
          articles.index.map((item,key)=> <SearchPageArticle item={item} key={key} />    )}      
        </Col>

        <Col xs={2}> 
          {articles.index.length===0?'':
            <Row className="mt-1">
              <Col>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret color="light">
                    Filtrera sökning
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={sortByDate}> Datum </DropdownItem>
                    <DropdownItem onClick={sortByLowestPrice}> Lägsta pris </DropdownItem>
                    <DropdownItem onClick={sortByPopularity}> Populärast </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
            </Row>      
          }      
        </Col>

      </Row>
           
    </div>
  );

}
export default SearchPage;

