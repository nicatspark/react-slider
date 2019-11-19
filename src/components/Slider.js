import React, { useRef } from 'react';
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
  defaultCard,
  onCardClick,
  cardHeight,
  cardSectionWidth,
}) {
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
  const componentWrapper = useRef();
  const sliderContainer = useRef();
  const cardEl = useRef();

  function scrollStop(e) {
    // debugger;
    const selectedCardnr = Math.round(
      sliderContainer.current.scrollLeft /
        sliderContainer.current.offsetWidth,
    );
    if (selectedCardnr === 0) isScrollBegining();
    else if (selectedCardnr >= cards.length - 1) isScrollEnd();
    else isScrollMiddle();
    console.log(selectedCardnr + 1);
    handleSelect(cards[selectedCardnr]);

    function isScrollBegining() {
      document.querySelector('.chevron.left').classList.add('hidden');
    }
    function isScrollEnd() {
      document
        .querySelector('.chevron.right')
        .classList.add('hidden');
    }
    function isScrollMiddle() {
      document
        .querySelector('.chevron.left')
        .classList.remove('hidden');
      document
        .querySelector('.chevron.right')
        .classList.remove('hidden');
    }
  }

  // Do when component starts up.
  React.useEffect(scrollStop, []);
  // Initiate React Feather icons.
  React.useEffect(() => feather.replace(), []);
  // Store width of one section in preparation for a desktop view.
  React.useEffect(() => {
    setSectionWidth(cardEl.current.offsetWidth);
  }, []);

  // Get called debounced at the trailing end, ie when motion stops.
  const handleScroll = e => scrollStop(e);

  const handleOnClick = e => {
    e.preventDefault();
    onCardClick(e);
  };

  const onDragStart = e => {
    console.log('Drag started.');
  };

  return (
    <ComponentWrapper ref={componentWrapper}>
      <CardsContainer
        ref={sliderContainer}
        className="cards-container"
        onScroll={debounce(handleScroll, 200)}
      >
        {cards.map((cardItem, i) => (
          <CardSection
            className="card-section"
            key={i}
            ref={cardEl}
            draggable="true"
            onDragStart={onDragStart}
            cardSectionWidth={cardSectionWidth}
          >
            <CardDiv onClick={handleOnClick} cardHeight={cardHeight}>
              {cardItem.itemNr}
            </CardDiv>
          </CardSection>
        ))}
      </CardsContainer>
      <ChevronDiv
        left
        cardHeight={cardHeight}
        className="chevron left"
      >
        <i data-feather="chevron-left"></i>
      </ChevronDiv>
      <ChevronDiv
        right
        cardHeight={cardHeight}
        className="chevron right"
      >
        <i data-feather="chevron-left"></i>
      </ChevronDiv>
    </ComponentWrapper>
  );
}

export default Slider;
