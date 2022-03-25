import React, { useState } from 'react';
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card';

const db = [
  {
    name: 'Tree 1',
    url: './img/tree1.jpeg'
  },
  {
    name: 'Tree 2',
    url: './img/tree2.jpeg'
  },
  {
    name: 'Tree 3',
    url: './img/tree3.jpeg'
  },
  {
    name: 'Tree 4',
    url: './img/tree4.jpeg'
  },
  {
    name: 'Tree 5',
    url: './img/tree5.jpeg'
  },
  {
    name: 'Tree 6',
    url: './img/tree1.jpeg'
  },
  {
    name: 'Tree 7',
    url: './img/tree2.jpeg'
  },
  {
    name: 'Tree 8',
    url: './img/tree3.jpeg'
  },
  {
    name: 'Tree 9',
    url: './img/tree4.jpeg'
  },
  {
    name: 'Tree 10',
    url: './img/tree5.jpeg'
  }
];

function Simple() {
  const characters = db;
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };

  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>Treender</h1>
      <div className='cardContainer'>
        {characters.map((character) => (
          <TinderCard
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name)}
            onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      {/* {lastDirection ? (
        <h2 className='infoText'>You swiped {lastDirection}</h2>
      ) : (
        <h2 className='infoText' />
      )} */}
    </div>
  );
}

export default Simple;
