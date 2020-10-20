import React from "react";
import { useState } from "react";
import styled from "styled-components";

const Typeahead = ({ suggestions, handleSelect, categories }) => {
  const [value, setValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  let matchingResults = suggestions.filter((book) => {
    const lowerCasedInput = value.toLowerCase();
    const lowerCasedTitle = book.title.toLowerCase();
    const match = lowerCasedTitle.includes(lowerCasedInput);
    return match && value.length >= 2;
  });

  return (
    <Wrapper>
      <SearchSection>
        <SearchBar
          type="text"
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
          onKeyDown={(ev) => {
            switch (ev.key) {
              case "Enter": {
                handleSelect(ev.target.value);
                break;
              }
              case "ArrowUp": {
                if (selectedIndex <= 0) {
                  return;
                }
                setSelectedIndex(selectedIndex - 1);
                break;
              }
              case "ArrowDown": {
                if (selectedIndex >= matchingResults.length - 1) {
                  return;
                }
                setSelectedIndex(selectedIndex + 1);
                break;
              }
            }
          }}
        />
        <ClearButton onClick={() => setValue("")}>Clear</ClearButton>
      </SearchSection>
      <Box>
        {matchingResults.map((book, bookIndex) => {
          const category = categories[book.categoryId].name;
          const title = book.title.toLowerCase();
          const searchTerm = value.toLowerCase();
          const indexSlice = title.indexOf(searchTerm);
          const valueIndex = value.length;
          const slicing = valueIndex + indexSlice;
          const firstPart = book.title.slice(0, slicing);
          const secondPart = book.title.slice(slicing, title.length);
          const isSelected = bookIndex === selectedIndex;
          return (
            <Suggestion
              isSelected={isSelected}
              style={{
                background: isSelected
                  ? "hsla(50deg, 100%, 80%, 0.25)"
                  : "transparent",
              }}
              onClick={() => handleSelect(book.title)}
            >
              <First>{firstPart}</First>
              <Second>{secondPart}</Second>
              <Category>
                {" "}
                in <Purple>{category}</Purple>
              </Category>
            </Suggestion>
          );
        })}
      </Box>
    </Wrapper>
  );
};
const First = styled.span``;

const Second = styled.span`
  font-weight: bold;
`;

const Category = styled.span`
  font-size: 10px;
  font-style: italic;
  margin-left: 2px;
`;

const Purple = styled.span`
  color: purple;
`;

const Suggestion = styled.li`
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.2em;

  &:hover {
    background-color: lightgoldenrodyellow;
  }
`;

const Box = styled.ul`
  max-width: 400px;
  margin-top: 10px;
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.36);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SearchSection = styled.div`
  display: flex;
  justify-content: center;
`;

const SearchBar = styled.input`
  width: 400px;
  border-radius: 3px;
  border: 1px solid #0b0e07;
  height: 36px;
  color: #000000;
  display: inline-block;
  font-family: Arial;
  padding: 10px;
  position: relative;
  top: 1px;
`;

const ClearButton = styled.button`
  box-shadow: inset 0px -3px 7px 0px #29bbff;
  background: linear-gradient(to bottom, #2dabf9 5%, #0688fa 100%);
  background-color: #2dabf9;
  border-radius: 3px;
  border: 1px solid #0b0e07;
  display: inline-block;
  position: relative;
  top: 1px;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 15px;
  padding: 9px 23px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #263666;
  margin-left: 10px;

  &:hover {
    background: linear-gradient(to bottom, #0688fa 5%, #2dabf9 100%);
    background-color: #0688fa;
  }

  &:active {
    position: relative;
    top: 1px;
  }
`;

export default Typeahead;
