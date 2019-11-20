import React from 'react';
import styled from 'styled-components';

const SelectorContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row nowrap;
  position: absolute;
  top: 180px;
`;

const Selector = styled.div`
  padding: 8px 4px;
  cursor: pointer;
  & > div {
    width: 25px;
    height: 5px;
    background: rgb(0, 0, 0, 0.3);
    transition: 200ms transform;
  }
  &:hover > div {
    transform: scaleY(1.4);
    background-color: rgba(0, 0, 0, 0.6);
  }
  &.selected > div {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

function Selectors({ cards, selectedCardIndex }) {
  // console.log(selectedCardIndex);
  return (
    <SelectorContainer>
      {cards.map((cardItem, i) => (
        <Selector
          key={i}
          className={i === selectedCardIndex ? 'selected' : null}
        >
          <div></div>
        </Selector>
      ))}
    </SelectorContainer>
  );
}

export default Selectors;
