import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

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
  /* overflow: hidden; */
  scroll-snap-align: center;
  scroll-snap-stop: always;
  position: relative;
  /* figure {
    height: 180px;
    width: 300px;
    margin: 10px 70px;
    background: #fff;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
    text-align: center;
    line-height: 170px;
    font-size: 180px;
    font-weight: bold;
    color: #eee;
  } */
`;

const Card = styled.div`
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

function Slider(props) {
  // eslint-disable-next-line
  const { isScrolled, setScrolled } = useState(false);
  const sliderContainer = useRef(null);
  // eslint-disable-next-line
  const [payload, setPayload] = useState([
    { itemNr: 1 },
    { itemNr: 2 },
    { itemNr: 3 },
    { itemNr: 4 },
    { itemNr: 5 },
    { itemNr: 6 },
    { itemNr: 7 },
  ]);

  const handleScroll = e => {
    const selectedCard = Math.round(
      sliderContainer.current.scrollLeft /
        sliderContainer.current.offsetWidth,
    );
    console.log(selectedCard);
    props.handleSelect(payload[selectedCard]);
  };

  return (
    <CardsContainer
      ref={sliderContainer}
      onScroll={_.debounce(handleScroll, 200)}
    >
      {payload.map((card, i) => (
        <CardSection key={i}>
          <Card>{card.itemNr}</Card>
        </CardSection>
      ))}
    </CardsContainer>
  );
}

export default Slider;
