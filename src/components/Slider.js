import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const CardsContainer = styled.div`
  background: orangered;
  font-family: sans-serif;
  scroll-snap-type: x mandatory;
  display: flex;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
`;

const CardSection = styled.section`
  min-width: 500px;
  height: 100%;
  overflow: hidden;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  position: relative;
  figure {
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
    /* &:first-child {
      margin-left: 200px;
    }
    &:last-child {
      margin-right: 200px;
    } */
    /* img {
      display: inline-block;
      height: 90%;
      object-fit: cover;
      width: 100%;
      visibility: hidden;
    } */
  }
`;

function Slider() {
  // eslint-disable-next-line
  const { isScrolled, setScrolled } = useState(false);
  const sliderContainer = useRef(null);
  const [payload, setPayload] = useState([
    { card: 1 },
    { card: 2 },
    { card: 3 },
    { card: 4 },
    { card: 5 },
    { card: 6 },
    { card: 7 },
  ]);

  const handleScroll = e => {
    console.log(
      Math.round(
        sliderContainer.current.scrollLeft /
          sliderContainer.current.offsetWidth,
      ) + 1,
    );
  };

  return (
    <CardsContainer
      ref={sliderContainer}
      onScroll={_.debounce(handleScroll, 200)}
    >
      {payload.map((card, i) => (
        <CardSection key={i}>
          <figure>{card.card}</figure>
        </CardSection>
      ))}
    </CardsContainer>
  );
}

export default Slider;
