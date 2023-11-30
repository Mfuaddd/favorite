import React, { useEffect, useState } from "react";
import useLocalStorage from "../../hook/useLocalStorage";
import "./index.scss"
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid,faXmark as faXmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons';

library.add(faHeartSolid,faXmarkSolid,faHeartRegular)

function Market() {
  const [fetchData, setFetchData] = useState([]);
  const [basket, setBasket] = useLocalStorage("basket", []);

  useEffect(() => {
    getFetch();
  }, []);
  
  function changeTheme() {
    document.body.classList.toggle("dark")
  }

  async function getFetch() {
    const data = await fetch("https://fakestoreapi.com/products");
    const res = await data.json();
    setFetchData(res);
  }

  function addBasket(newItem) {
    if (basket.find((x)=>x.id === newItem.id)) {
      newItem.theme = "fa-regular"
      setBasket(basket.filter(x=>x.id!==newItem.id))   
    }
    else{
      newItem.theme = "fa-solid"
      setBasket([...basket, newItem]);
      
    }
  }

    function allremoveBasket(newItem){
        newItem.theme = "fa-regular"
        setBasket(basket.filter((x) => x !== newItem));
    }

    function handleHeartClick(x) {
      addBasket(x)
    }

  return (
    <div className="container">
      <div className="basket">
        <h3 style={{display: "inline-block" , margin: "5px"}}>Favorite</h3>
        <ul className="basketwrapper">
        {basket.map((x) => {
          
          return (
            <ul className="card" key={x.id}>
                <div className="img">
                  <img src={x.image} alt="" />
                </div>
              <li>{x.title}</li>
              <button className="close" onClick={() => allremoveBasket(x)}><FontAwesomeIcon icon="fa-solid fa-xmark" /></button>
            </ul>
          );
          
        })}
        </ul>
      </div>
      <hr />
      <div className="market">
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <h3>market</h3>
          <button onClick={changeTheme}>Change Theme</button>
        </div>
        <ul className="wrapper">
          {fetchData.map((x) => {

            let arr = basket.map(y=>{if(x.id === y.id)  return y.id})
            if (arr.length === 0) {
              x.theme = "fa-regular"
            }
            if (arr.includes(x.id)) x.theme = "fa-solid"
            else x.theme = "fa-regular"

            return (
              <ul className="card" key={x.id}>
                <div className="img">
                  <img src={x.image} alt="" />
                </div>
                <li>{x.title}</li>
                <li>{x.price}</li>
                <li>{x.description.slice(0,100)}...</li>

                <button className="heart" onClick={()=>handleHeartClick(x)}><FontAwesomeIcon icon={`${x.theme} fa-heart`} /></button>
              </ul>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Market;
