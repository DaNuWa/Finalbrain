
import React from 'react';

const Card = ({ name, rank, id }) => {

  return (
    <div className='tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
      <img alt='robots' src={`https://i.pravatar.cc/150?img=${id}`} />
      <div>
        <h2>{name}</h2>
        <p>Rank :{rank}</p>
      </div>
    </div>
  );
}

export default Card;