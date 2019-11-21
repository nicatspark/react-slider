import React, { useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Slider from './components/Slider';

const selectTransitionDelay = 800;
let alreadyClicked = false;

const GlobalStyle = createGlobalStyle`
  .hidden {
    display: none !important;
  }
  /* body {
    color: ${props => (props.whiteColor ? 'white' : 'black')};
  } */
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: #ccc;
  color: #333;
  user-select: none;
  & > nav {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 220px;
  }
`;

const SelectedItem = styled.div`
  position: absolute;
  top: 10%;
  left: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 1px solid #d3d3d3;
  min-height: 300px;
  font-size: 280px;
  color: #bbb;
  filter: blur(0);
  transition: 1s all;
  &.dotransition {
    color: #ccc;
    transition: unset;
    filter: blur(30px);
    font-size: 350px;
  }
`;

const HighlightSelectAction = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 10px solid rgba(255, 255, 255, 0);
  transition: ${selectTransitionDelay}ms all ease-out;
  &.startTransition {
    transition: unset;
    border: 10px solid rgba(255, 255, 255, 0.4);
  }
  &.endTransition {
    border: 10px solid rgba(255, 255, 255, 0);
    width: 200px;
    height: 200px;
    transition: unset;
    transition: ${selectTransitionDelay}ms all ease-out;
  }
`;

function App() {
  const [cards] = useState([
    { itemNr: 1 },
    { itemNr: 2 },
    { itemNr: 3 },
    { itemNr: 4 },
    { itemNr: 5 },
    { itemNr: 6 },
    { itemNr: 7 },
  ]);
  const [selectedCard, setSelectedCard] = useState(3);
  const selectTransition = useRef();
  const displayContainer = useRef();

  const handleSelected = item => {
    const selDisplayEl = displayContainer.current;
    selDisplayEl.innerHTML = item.itemNr;
    selDisplayEl.classList.add('dotransition');
    setTimeout(
      () => selDisplayEl.classList.remove('dotransition'),
      100,
    );
    setSelectedCard(item.itemNr);
  };

  const onCardClick = cardItem => {
    if (alreadyClicked) return;
    alreadyClicked = true;
    const el = selectTransition.current;
    el.classList.add('startTransition');
    new Promise(resolve => {
      setTimeout(() => {
        el.classList.add('endTransition');
        resolve();
      }, 100);
    }).finally(() => {
      setTimeout(() => {
        el.classList.remove('endTransition', 'startTransition');
        alreadyClicked = false;
        nextPage();
      }, selectTransitionDelay);
    });
    console.log('Selected Item: ', cardItem);

    function nextPage() {
      console.log('Next page.');
    }
  };

  return (
    <Container>
      <SelectedItem ref={displayContainer}>X</SelectedItem>
      <Slider
        handleSelect={handleSelected}
        cards={cards}
        selectedCard={selectedCard}
        onCardClick={onCardClick}
        cardHeight="150px"
        cardSectionWidth="100vw"
      />
      <HighlightSelectAction ref={selectTransition} />
      <GlobalStyle />
    </Container>
  );
}

export default App;
