import React from "react";
import styled from "styled-components";

const NavbarContainer = styled.div`
  position: fixed;
  width: 100%;
  background-color: transparent;
  top: 0;
  left: 0;
  right: 0;
  margin: 0;
  z-index: 1;
`;

const AppTitle = styled.h1`
  text-align: left;
  margin: 15px 25px;
  font-weight: 700;
  padding: 0px;
  font-size: 20px;
`;

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <AppTitle>amulet</AppTitle>
    </NavbarContainer>
  );
};

export default Navbar;
