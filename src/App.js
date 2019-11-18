import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Slider from './components/Slider';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: #ccc;
  color: #333;
  & > nav {
    position: absolute;
    top: 65%;
    left: 0;
    right: 0;
    height: 200px;
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
  const selectedContainer = useRef();
  const handleSelected = item => {
    const selDisplay = selectedContainer.current;
    selDisplay.innerHTML = item.itemNr;
    selDisplay.classList.add('dotransition');
    setTimeout(
      () => selDisplay.classList.remove('dotransition'),
      100,
    );
  };

  return (
    <Container>
      <SelectedItem ref={selectedContainer}>M</SelectedItem>
      <Slider handleSelect={handleSelected} cards={cards} />
    </Container>
  );
}

export default App;
