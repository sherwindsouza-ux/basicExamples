import React, { useState, useEffect } from 'react';

import './App.css';
import Card from './components/Card';


function randomNumber() {
  const min = 1; // Minimum value (inclusive)
  const max = 151; // Maximum value (exclusive)
  return Math.floor(Math.random() * (max - min) + min);
}

const itemUrls = [
  'https://pokeapi.co/api/v2/pokemon/' + randomNumber(),
  'https://pokeapi.co/api/v2/pokemon/' + randomNumber(),
  'https://pokeapi.co/api/v2/pokemon/' + randomNumber(),
  'https://pokeapi.co/api/v2/pokemon/' + randomNumber(),
  'https://pokeapi.co/api/v2/pokemon/' + randomNumber(),
  'https://pokeapi.co/api/v2/pokemon/' + randomNumber(),        
];

const fetchItem = (url) => {
  return fetch(url).then(response => response.json());
};

const fetchAllItems = () => {
  try {
    const fetchPromises = itemUrls.map(url => fetchItem(url));
    return Promise.all(fetchPromises);        
  } catch (error) {
    console.error(error);
  }
};

function App() {
  const [data, setData] = useState([{url: "", name: ""}]);  


  useEffect(() => {
    const res = fetchAllItems();
    res.then(response => {
        let data = response.map(function(value) {
          const url = value.sprites.other["official-artwork"].front_default;
          const name = value.forms[0].name;
          return {
            url: url,
            name: name,
          };
        });
        console.log(data);
        setData(data);
    });  
  }, []);


  return (
    <div>
      <h1>Pokemon Characters</h1>


      {data.map(item => 
         <Card id={item.name} image={item.url} name={item.name} />)
      }

    </div>
  );
}


export default App;


