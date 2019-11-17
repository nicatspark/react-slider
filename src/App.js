import React from "react";
import styled from "styled-components";
import Slider from "./components/Slider";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: #ccc;
  color: #333;
  div {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 200px;
  }
`;

function App() {
  return (
    <Container>
      <Slider />
    </Container>
  );
}

export default App;
