import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import throttle from 'lodash/throttle';

const payload = [
  {
    url:
      'https://s3.amazonaws.com/appforest_uf/f1573502006658x593350952181959600/IMG_7552.JPG',
    filter: 'nashville',
  },
  {
    url: 'https://source.unsplash.com/featured/?dinner',
    filter: 'aden',
  },
  {
    url: 'https://source.unsplash.com/featured/?dinner/1',
    filter: 'mayfair',
  },
  {
    url: 'https://source.unsplash.com/featured/?dinner/2',
    filter: 'lofi',
  },
  {
    url: 'https://source.unsplash.com/featured/?dinner/3',
    filter: 'kelvin',
  },
  {
    url: 'https://source.unsplash.com/featured/?lunch/4',
    filter: 'mayfair',
  },
];

const Container = styled.div`
  background: orangered;
  font-family: sans-serif;
  scroll-snap-type: x mandatory;
  display: flex;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
`;

const Section = styled.section`
  min-width: 500px;
  height: 100%;
  overflow: hidden;
  scroll-snap-align: center;
  scroll-snap-stop: normal;
  position: relative;
  figure {
    height: 180px;
    margin: 10px 70px;
    background: #fff;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
    img {
      display: inline-block;
      height: 90%;
      object-fit: cover;
      width: 100%;
      visibility: hidden;
    }
  }
`;

function scrollCheck(sliderContainer) {
  _.throttle(function() {
    console.log(
      Math.round(
        sliderContainer.scrollLeft / sliderContainer.offsetWidth,
      ) + 1,
    );
  }, 200);
}

function Slider() {
  const sliderContainer = useRef(null);

  const handleScroll = e => {
    console.log('I am beeing scrolled.');
  };
  useEffect(() => {
    // console.log(typeof document.addEventListener);
    sliderContainer.addEventListener(
      'scroll',
      () => handleScroll(sliderContainer),
      true,
    );
  }, []);

  return (
    <Container ref={sliderContainer} onScroll={handleScroll}>
      {payload.map((card, i) => (
        <Section key={i}>
          <figure className={card.filter}>
            {console.log(card)}
            <img src={card.url} alt="" />
          </figure>
        </Section>
      ))}
    </Container>
  );
}

export default Slider;
