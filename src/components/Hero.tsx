import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

// const HeroTitle = styled.h1`
//   font-size: 2rem;
//   font-weight: 500;
// `;

const HeroWrapper = styled.div<{ modalIsOpen?: boolean }>`
  padding: 40px 30px;
  max-width: 850px;
  margin: auto;
  text-align: center;
  min-height: 100vh;
  overflow: ${(p) => (p.modalIsOpen ? "hidden" : null)};
`;

const InnerWrapper = styled.div`
  max-width: 400px;
  margin: auto;
`;

const AddyInput = styled.input`
  padding: 15px;
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
const AddySubmit = styled.input`
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

const AddyForm = styled.form`
  font-family: inherit;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Footer = styled.div`
  margin: 20px auto;
  color: #777;
  font-size: 1.25rem;
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
  const [addyInput, setAddyInput] = useState<string>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(addyInput);
    const cleanedAddress = cleanAddress(addyInput);
    if (cleanedAddress) {
      history.push(`/${cleanedAddress}`);
    }
  };
  return (
    <HeroWrapper>
      <InnerWrapper>
        {/* <HeroTitle>eth.af</HeroTitle> */}
        <AddyForm onSubmit={handleSubmit}>
          <AddyInput
            type="text"
            value={addyInput}
            onChange={(e) => {
              setAddyInput(e.target.value);
            }}
            placeholder="addy / ENS"
            name="addy"
          />
          <AddySubmit type="submit" value="Let's Go" disabled={!addyInput} />
        </AddyForm>
        <Footer>eth.af ©2021</Footer>
      </InnerWrapper>
    </HeroWrapper>
  );
};

export default Hero;
