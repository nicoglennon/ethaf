import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Trail from "./Trail";

// const HeroTitle = styled.h1`
//   font-size: 2rem;
//   font-weight: 500;
// `;

const HeroWrapper = styled.div``;

const InnerWrapper = styled.div`
  max-width: 400px;
  margin: auto;
`;

const AddyInput = styled.input`
  padding: 15px;
  margin-bottom: 15px;
  font-family: inherit;
  font-size: 1.5rem;
  border: 3px solid transparent;
  border-radius: 10px;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 10px;
  &:hover {
    border: 3px solid #eee;
  }

  &:focus {
    border: 3px solid #aaa;
  }

  transition: all 200ms ease;
`;
const AddySubmit = styled.button`
  padding: 15px;
  font-family: inherit;
  font-size: 1.5rem;
  color: #fff;
  background-color: #000;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 10px;
  border: 3px solid transparent;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.7;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  transition: all 200ms ease;
`;

const AddyForm = styled.div`
  font-family: inherit;
  display: flex;
  flex-direction: column;
`;

const Footer = styled.div<{ marginTop: number }>`
  margin: 10px auto;
  color: #bbb;
  font-size: 1.25rem;
  margin-top: ${(p) => `${p.marginTop}px`};
`;

const NicoLink = styled.a`
  color: #666 !important;
  transition: all 200ms ease;
  &:hover {
    color: #222 !important;
  }
`;
const cleanAddress = (addy: string | undefined) => {
  if (!addy) {
    return null;
  }
  if (addy.includes(".eth")) {
    return addy.slice(0, addy.length - 4);
  }
  return addy;
};

const Hero: React.FC = () => {
  let history = useHistory();
  const [addyInput, setAddyInput] = useState<string>("");

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const cleanedAddress = cleanAddress(addyInput);
    if (cleanedAddress) {
      history.push(`/${cleanedAddress}`);
    }
  };
  return (
    <HeroWrapper>
      <InnerWrapper>
        <Trail>
          <AddyForm>
            <AddyInput
              type="text"
              value={addyInput}
              onChange={(e) => {
                setAddyInput(e.target.value);
              }}
              placeholder="addy / ENS"
              name="addy"
            />
            <AddySubmit
              type="submit"
              disabled={!addyInput}
              onClick={handleSubmit}
            >
              lurk
            </AddySubmit>
          </AddyForm>
          <Footer marginTop={30}>
            <div>eth.af ©2021</div>
          </Footer>
          <Footer marginTop={0}>
            <div>
              made by{" "}
              <NicoLink href="https://twitter.com/nicoglennon" target="_blank">
                nico
              </NicoLink>
            </div>
          </Footer>
        </Trail>
      </InnerWrapper>
    </HeroWrapper>
  );
};

export default Hero;
