import React, { useRef } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';

const CardsContainer = styled.nav`
  background: orangered;
  font-family: sans-serif;
  scroll-snap-type: x mandatory;
  display: flex;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
`;

const CardSection = styled.section`
  min-width: 100vw;
  height: 100%;
  box-shadow: inset 0px 0px 0px 2px rgb(189, 14, 14);
  scroll-snap-align: center;
  scroll-snap-stop: always;
  position: relative;
`;

const CardDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 180px;
  width: 300px;
  background: #fff;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
  text-align: center;
  line-height: 170px;
  font-size: 180px;
  font-weight: bold;
  color: #eee;
`;

function Slider({ cards, handleSelect }) {
  // const { isScrolled, setScrolled } = useState(false);
  const sliderContainer = useRef();

  const scrollEnd = e => {
    const selectedCard = Math.round(
      sliderContainer.current.scrollLeft /
        sliderContainer.current.offsetWidth,
    );
    console.log(selectedCard + 1);
    handleSelect(cards[selectedCard]);
  };

  React.useEffect(scrollEnd, []);

  const handleScroll = e => scrollEnd(e);

  return (
    <CardsContainer
      ref={sliderContainer}
      onScroll={debounce(handleScroll, 200)}
    >
      {cards.map((cardItem, i) => (
        <CardSection key={i}>
          <CardDiv>{cardItem.itemNr}</CardDiv>
        </CardSection>
      ))}
    </CardsContainer>
  );
}

export default Slider;
