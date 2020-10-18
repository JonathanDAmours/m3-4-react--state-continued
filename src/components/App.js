import React from "react";
import data from "../data";
import Typeahead from "./Typeahead.js";
import styled from "styled-components";

import GlobalStyles from "./GlobalStyles";

function App(props) {
  // TODO!
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Typeahead
          categories={data.categories}
          suggestions={data.books}
          handleSelect={(suggestion) => {
            window.alert(suggestion);
          }}
        />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 600px;
  justify-content: center;
  align-items: center;
`;

export default App;
