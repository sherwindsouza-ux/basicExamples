import React from 'react';

function Card(props) {
    return <div class="card">
           <div><img src={props.image} alt={props.name} /></div>
           <div>{props.name}</div>
        </div>
}

export default Card;