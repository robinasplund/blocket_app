import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"; 
import {BrowserRouter as Router,Route} from "react-router-dom";

import StartPage from "./components/StartPage.js";
import Article from "./components/article.js";
import Login from "./components/Login.js";
import LoginSuccess from "./components/LoginSuccess.js";
import Logout from "./components/Logout.js";
import SearchPage from "./components/SearchPage.js";
import UserPage from "./components/UserPage.js";
import UserPageAddArticle from "./components/UserPageAddArticle.js";
import UserPageAddedArticles from "./components/UserPageAddedArticles.js";
import UserPageEditArticle from "./components/UserPageEditArticle.js";
import CreateUser from "./components/CreateUser.js";
import CreateUserSuccess from "./components/CreateUserSuccess.js";
import ShoppingCart from "./components/ShoppingCart.js";
import Footer from "./components/Footer.js";

function App() {
  return (
    <Router>
      <div className="AppContainer container">
         
         <div className="main">

       
        <Route path="/" exact component={StartPage} />
        <Route path="/login" component={Login} />
        <Route path="/loginsuccess" component={LoginSuccess} />
        <Route path="/logout" component={Logout} />
        <Route path="/createuser" component={CreateUser} />
        <Route path="/createusersuccess" component={CreateUserSuccess} />
        <Route path="/search" component={SearchPage} />
        <Route path="/article/:id" component={Article} />
        <Route path="/user/:id" component={UserPage} />
        <Route path="/useraddarticle/:id" component={UserPageAddArticle} />
        <Route path="/useraddedarticles/:id" component={UserPageAddedArticles} />
        <Route path="/usereditarticle/:id" component={UserPageEditArticle} />
        <Route path="/shoppingcart" component={ShoppingCart} />
        </div>
        <div className="foot">
        <Footer />
         </div>
       

      </div>
    </Router>
  );
}
export default App;
