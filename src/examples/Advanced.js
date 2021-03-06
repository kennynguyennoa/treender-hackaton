import React, { useState, useMemo, useRef } from 'react';
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
    url: './img/tree5.jpeg',
    description: 'hei'
  }
];

function Advanced() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>Treender</h1>
      <div className='cardContainer'>
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <div className='textContainer'>
                <h3>{character.name}</h3>
                <h3>{character.description}</h3>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button style={{ backgroundColor: 'red' }} onClick={() => swipe('left')}>
          Dislike
        </button>
        <button style={{ backgroundColor: !canGoBack && 'blue' }} onClick={() => goBack()}>
          Super Like!
        </button>
        <button style={{ backgroundColor: 'green' }} onClick={() => swipe('right')}>
          Like
        </button>
      </div>
      {/* {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )} */}
    </div>
  );
}

export default Advanced;
