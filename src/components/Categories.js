import React,{useState} from 'react';
import {Row,Col} from 'reactstrap';

import Category from './Category.js';

import FurnituresIcon from '../images/Categories-icons/furniture.png';
import ClothesIcon from '../images/Categories-icons/clothes.png';
import CarsIcon from '../images/Categories-icons/cars.png';
import DevvicesIcon from '../images/Categories-icons/devices.png';
import ElectronicsIcon from '../images/Categories-icons/electronics.png';
import ToysIcon from '../images/Categories-icons/toy.png';

function Categories(){

  const[categories]=useState({
    index:[{name:'Möbler',img:FurnituresIcon},
           {name:'Kläder',img:ClothesIcon},
           {name:'Bilar',img:CarsIcon},
           {name:'Elektronik',img:ElectronicsIcon},
           {name:'Leksaker',img:ToysIcon},
           {name:'Dator/Mobil',img:DevvicesIcon}
    ]
  });

  return(
    <div className="CategoriesComponent mt-5 pt-4 pb-5">
      
      <Row>
        <Col>
          <h4 className="text-center pb-3 special-font"> Våra kategorier </h4>
        </Col>
      </Row>
      
      <Row className="w-75 mx-auto">
          {categories.index.map((item,key)=> <Category item={item} key={key+1} /> )}  
      </Row>
           
    </div>
  );

}
export default Categories;

/*
{categories.index.map((item,key)=> <Category item={item} key={key+1} /> )}  
*/