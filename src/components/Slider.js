import React, { useRef, useState, useEffect } from 'react';
import Selectors from './Selectors';
import styled from 'styled-components';
import { debounce } from 'lodash';
import feather, {
  // eslint-disable-next-line
  chevronLeft,
} from '../../node_modules/feather-icons/dist/feather';

const ComponentWrapper = styled.nav`
  position: relative;
`;

const CardsContainer = styled.div`
  background: orangered;
  font-family: sans-serif;
  scroll-snap-type: x mandatory;
  display: flex;
  -webkit-overflow-scrolling: touch;
  overflow-x: overlay;
  overflow-y: hidden;
  height: 100%;
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 4px;
  }
  &.drag-active {
    cursor: grabbing !important;
    scroll-snap-type: unset;
  }
`;

const CardSection = styled.section`
  min-width: ${props => props.cardSectionWidth};
  height: 100%;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  position: relative;
`;

const CardDiv = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  height: ${props => props.cardHeight};
  width: 300px;
  background: #fff;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
  text-align: center;
  line-height: 150px;
  font-size: 150px;
  font-weight: bold;
  color: #eee;
  cursor: pointer;
`;

const ChevronDiv = styled.div.attrs(props => ({
  style: props.right
    ? { transform: 'rotate(180deg)', left: 'unset', right: '0' }
    : null,
}))`
  position: absolute;
  top: 10px;
  left: 0;
  height: ${props => props.cardHeight};
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    color: #000;
    svg {
      transform: scale(2.3);
    }
  }
  svg {
    transform: scale(2);
    transition: 200ms all;
  }
`;

function Slider({
  cards,
  handleSelect,
  selectedCard,
  onCardClick,
  cardHeight,
  cardSectionWidth,
}) {
  // const { isScrolled, setScrolled } = useState(false);
  // const getCard = index => {
  //   return cards[index];
  // };

  // eslint-disable-next-line
  const [selectedCardState, setSelectedCardState] = useState(
    selectedCard,
  );
  // eslint-disable-next-line
  const [sectionWidth, setSectionWidth] = useState(0);
  const [desiredCardIndex, setDesiredCardIndex] = useState(
    selectedCardState,
  );
  const latestDesiredCardIndex = useRef(desiredCardIndex);
  const componentWrapper = useRef();
  const sliderContainer = useRef();
  const chevronLeft = useRef();
  const chevronRight = useRef();
  const cardEl = useRef();

  const scrollStop = e => {
    const calcSelectedCardnr = Math.round(
      sliderContainer.current.scrollLeft /
        sliderContainer.current.offsetWidth,
    );
    setSelectedCardState(calcSelectedCardnr);
    if (calcSelectedCardnr === 0) isScrollBegining();
    else if (calcSelectedCardnr >= cards.length - 1) isScrollEnd();
    else isScrollMiddle();
    handleSelect(cards[calcSelectedCardnr]);

    function isScrollBegining() {
      chevronLeft.current.classList.add('hidden');
    }
    function isScrollEnd() {
      chevronRight.current.classList.add('hidden');
    }
    function isScrollMiddle() {
      chevronRight.current.classList.remove('hidden');
      chevronLeft.current.classList.remove('hidden');
    }
  };

  const gotoNext = () => {
    latestDesiredCardIndex.current++;
    const index = Math.min(
      cards.length,
      latestDesiredCardIndex.current,
    );
    setDesiredCardIndex(index);
  };

  const gotoPrevious = () => {
    latestDesiredCardIndex.current--;
    const index = Math.max(0, latestDesiredCardIndex.current);
    setDesiredCardIndex(index);
  };

  const gotoCard = index => {
    try {
      sliderContainer.current.children[index].scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    } catch (e) {
      return;
    }
  };

  useEffect(() => {
    if (Number.isInteger(desiredCardIndex))
      gotoCard(desiredCardIndex);
  }, [desiredCardIndex]);

  // Do when component starts up.
  useEffect(scrollStop, []);

  useEffect(() => {
    feather.replace(); // Initiate React Feather icons.
    // Store width of one section in preparation for a desktop view.
    setSectionWidth(cardEl.current.offsetWidth);
    // Listen for scroll start.
    const slConEl = sliderContainer.current;
    slConEl.addEventListener(
      'scroll',
      debounce(scrollStart, 200, {
        leading: true,
        trailing: false,
      }),
    );
    function scrollStart() {
      console.log('Scroll event started.');
    }
    return () => {
      slConEl.removeEventListener(
        'scroll',
        debounce(scrollStart, 200, {
          leading: true,
          trailing: false,
        }),
      );
    };
  }, []);

  const handleOnClick = e => {
    e.preventDefault();
    onCardClick(e);
  };

  useEffect(() => {
    // This enables dragging
    // TODO: When released, store index of card in view to state and use gotoCard.
    const slidCont = sliderContainer.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    slidCont.addEventListener('mousedown', e => {
      isDown = true;
      slidCont.classList.add('drag-active');
      startX = e.pageX - slidCont.offsetLeft;
      scrollLeft = slidCont.scrollLeft;
    });
    slidCont.addEventListener('mouseleave', () => {
      isDown = false;
      slidCont.classList.remove('drag-active');
    });
    slidCont.addEventListener('mouseup', () => {
      isDown = false;
      slidCont.classList.remove('drag-active');
    });
    slidCont.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      window.requestAnimationFrame(() => {
        const x = e.pageX - slidCont.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slidCont.scrollLeft = scrollLeft - walk;
      });
    });
  }, []);

  return (
    <ComponentWrapper ref={componentWrapper}>
      <CardsContainer
        ref={sliderContainer}
        className="cards-container"
        onScroll={debounce(scrollStop, 200)}
      >
        {cards.map((cardItem, i) => (
          <CardSection
            className="card-section"
            key={i}
            ref={cardEl}
            cardSectionWidth={cardSectionWidth}
          >
            <CardDiv onClick={handleOnClick} cardHeight={cardHeight}>
              {cardItem.itemNr}
            </CardDiv>
          </CardSection>
        ))}
      </CardsContainer>
      <Selectors
        cards={cards}
        selectedCardIndex={selectedCardState}
        gotoCard={gotoCard}
      />
      <ChevronDiv
        left
        cardHeight={cardHeight}
        className="chevron left"
        ref={chevronLeft}
        onClick={gotoPrevious}
      >
        <i data-feather="chevron-left"></i>
      </ChevronDiv>
      <ChevronDiv
        right
        cardHeight={cardHeight}
        className="chevron right"
        ref={chevronRight}
        onClick={gotoNext}
      >
        <i data-feather="chevron-left"></i>
      </ChevronDiv>
    </ComponentWrapper>
  );
}

export default Slider;
