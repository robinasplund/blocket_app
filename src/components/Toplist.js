import React, {useEffect,useState} from "react";
import {Row} from 'reactstrap';

import ToplistArticle from './ToplistArticle.js';

function Toplist(){

  const[articles,setArticles]=useState({
    index:[]
  });

  useEffect(() => {
		async function loadDataFromDb(){
      let result = await fetch('/json/articles/purchases/toplist');
      result = await result.json();
      setArticles({
        index:result
      });
    }
    loadDataFromDb();
    	// eslint-disable-next-line
	},[]);


  return(
    <div className="ToplistComponent">

      <h4 className="text-center pb-3 pt-5 special-font"> De populäraste varorna just nu </h4>

      {articles.index.length === 0 ? '' : 
        <Row> {articles.index.map((item,key)=> <ToplistArticle item={item} key={key+1} /> )} </Row> 
      }    
      
    </div>
  );

}
export default Toplist;

