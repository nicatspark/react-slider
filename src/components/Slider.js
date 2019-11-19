import React, { useRef } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
// eslint-disable-next-line
import feather, { chevronLeft } from '../../node_modules/feather-icons/dist/feather';

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
  &::-webkit-scrollbar{
    height: 8px;
  }
  &::-webkit-scrollbar-track {}
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 4px;
  }
`;

const CardSection = styled.section`
  min-width: 100vw;
  height: 100%;
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

const ChevronDiv = styled.div.attrs(props => ({
  style: props.right ? {transform:'rotate(180deg)',left:'unset',right:'0'}: null,
}))`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
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
      document.querySelector('.chevron.left').style.display='none';
    }
    function isScrollEnd() {
      document.querySelector('.chevron.left').style.display='none';
    }
    function isScrollMiddle() {
      document.querySelector('.chevron.left').style.display='flex';
    }
  }

  // Do when component starts up.
  React.useEffect(scrollStop, []);
  // Initiate React Feather icons.
  React.useEffect(() => feather.replace(),[]);
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
  }

  return (
    <ComponentWrapper ref={componentWrapper}>
      <CardsContainer
        ref={sliderContainer}
        className="cards-container"
        onScroll={debounce(handleScroll, 200)}
      >
        {cards.map((cardItem, i) => (
          <CardSection className="card-section" key={i} ref={cardEl} draggable='true' onDragStart={onDragStart}>
            <CardDiv onClick={handleOnClick}>{cardItem.itemNr}</CardDiv>
          </CardSection>
        ))}
      </CardsContainer>
      <ChevronDiv left className="chevron left"><i data-feather="chevron-left"></i></ChevronDiv>
      <ChevronDiv right className="chevron right"><i data-feather="chevron-left"></i></ChevronDiv>
    </ComponentWrapper>
  );
}

export default Slider;
