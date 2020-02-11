import React, { useState,useEffect } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown,
         DropdownToggle,DropdownMenu,DropdownItem, } from 'reactstrap';

import shoppingCartIcon from '../images/shopping-cart.png';
import productIcon from '../images/product-icon-small.png';

function MyNavbar({searchDatabase}){

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const[isLoggedIn,setIsLoggedIn]=useState(false);
  const[addArticlePath,setAddArticlePath]=useState({
    path:''
  });
  const[addedArticlesPath,setAddedArticlesPath]=useState({
    path:''
  });
  const[shoppingCartPath,setShoppingCartPath]=useState({
    path:''
  });

  useEffect(()=>{
    async function checkIfLoggedIn(){

      let result = await fetch('/json/login');
      result = await result.json();
      if(result.length>0){
        setIsLoggedIn(true);
        setAddArticlePath({path:'/useraddarticle/'+result});
        setAddedArticlesPath({path:'/useraddedarticles/'+result});
        setShoppingCartPath({path:'/shoppingcart/'+result});
      }
    }
    checkIfLoggedIn();
    // eslint-disable-next-line
  },[]);

  return (
    <div className="NavbarComponent">
    <Navbar color="light" light expand="md">

      {/*<NavbarBrand href="/">Start</NavbarBrand>*/}

      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>

        <Nav className="NavbarComponentNavbar" navbar>
          <NavItem className="flex1">
            <NavLink href="/" active>Start</NavLink>
          </NavItem>           
          <NavItem className="flex2">
            <input className="form-control w-50 mx-auto" placeholder="Sök efter önskad vara" onChange={searchDatabase} autoFocus="true" />
          </NavItem>

          <NavItem className="flex3"></NavItem>

          {!isLoggedIn?'':
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <img src={productIcon} alt="varu ikon" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href={addArticlePath.path}>
                  Lägg till vara
                </DropdownItem>
                <DropdownItem href={addedArticlesPath.path}>
                  Hantera varor
                </DropdownItem>            
              </DropdownMenu>
            </UncontrolledDropdown>
          }
          {!isLoggedIn?'':
            <NavItem> 
              <NavLink 
                className="img-fluid max-width:100% height:auto mx-auto d-block" 
                href={shoppingCartPath.path}> <img src={shoppingCartIcon} 
                alt="bild på kundvagn" /> 
              </NavLink>
            </NavItem>
          }     
          <NavItem> 
            {isLoggedIn?
              <NavLink href="/logout/">Logga ut</NavLink>:
              <NavLink href="/login/">Logga in</NavLink>
             }            
          </NavItem> 
          
        </Nav>

      </Collapse>
    </Navbar>
  </div>
  );
}

export default MyNavbar;

