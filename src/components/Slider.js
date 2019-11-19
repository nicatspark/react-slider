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
  cursor: pointer;
`;

function Slider({ cards, handleSelect, defaultCard, onCardClick }) {
  // const { isScrolled, setScrolled } = useState(false);
  // const getCard = index => {
  //   return cards[index];
  // };

  // eslint-disable-next-line
  const { selectedCard, setSelectedCard } = React.useState(
    defaultCard || 4,
  );
  // eslint-disable-next-line
  const [sectionWidth, setSectionWidth] = React.useState(0);
  const sliderContainer = useRef();
  const cardEl = useRef();

  function scrollStop(e) {
    // debugger;
    const selectedCardnr = Math.round(
      sliderContainer.current.scrollLeft /
        sliderContainer.current.offsetWidth,
    );
    if (selectedCardnr === 0) isScrollStart();
    else if (selectedCardnr >= cards.length - 1) isScrollEnd();
    console.log(selectedCardnr + 1);
    handleSelect(cards[selectedCardnr]);

    function isScrollStart() {
      console.log('Scroll start.');
    }
    function isScrollEnd() {
      console.log('Scroll end.');
    }
  }

  React.useEffect(scrollStop, []);
  React.useEffect(() => {
    setSectionWidth(cardEl.current.offsetWidth);
  }, []);

  const handleScroll = e => scrollStop(e);

  const handleOnClick = e => {
    e.preventDefault();
    onCardClick(e);
  };

  return (
    <CardsContainer
      ref={sliderContainer}
      className="cards-container"
      onScroll={debounce(handleScroll, 200)}
    >
      {cards.map((cardItem, i) => (
        <CardSection className="card-section" key={i} ref={cardEl}>
          <CardDiv onClick={handleOnClick}>{cardItem.itemNr}</CardDiv>
        </CardSection>
      ))}
    </CardsContainer>
  );
}

export default Slider;
