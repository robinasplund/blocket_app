import React, {useEffect,useState} from "react";
import {Row} from 'reactstrap';

import NavbarNormal from './NavbarNormal.js';

import UserPageAddedArticlesArticle from './UserPageAddedArticlesArticle.js';

function UserPageAddedArticles(){

  const[user,setUser]=useState({
    index:''
  });
  const[articles,setArticles]=useState({
    index:''
  });

  useEffect(() => {
		async function loadDataFromDb(){
      let path= await document.location.pathname;
      let splittedPath= path.replace('/useraddedarticles/','');
      let result = await fetch('/json/users/'+splittedPath);
      result = await result.json();
      setUser({
        index:result
      }); 

      let articles = await fetch('/json/articles/articleuser/'+result._id);
      articles = await articles.json();
      console.log(articles);
      setArticles({
        index:articles
      }); 
    }
    loadDataFromDb();
    	// eslint-disable-next-line
  },[]);
  
  return(
    <div className="UserPageAddedArticlesComponent">

      <NavbarNormal />
    
      <div className="mt-5">
        {articles.index.length === 0 ? '' :           
          articles.index.map((item,key)=> <UserPageAddedArticlesArticle item={item} key={key+1} articles={articles} setArticles={setArticles} /> )    
        }
      </div>
    
    </div> 
  );
}
export default UserPageAddedArticles;