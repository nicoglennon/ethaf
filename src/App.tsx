import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Hero from "./components/Hero";
import Trail from "./components/Trail";
import Wallet from "./components/Wallet";
import Alien from "./assets/alien.png";

const AppWrapper = styled.div`
  padding: 40px 30px 60px 30px;
  max-width: 875px;
  margin: auto;
  text-align: center;
  min-height: 100vh;
`;
export default function App() {
  return (
    <Router>
      <AppWrapper>
        <Trail>
          <div
            style={{
              margin: "auto",
              textAlign: "center",
              width: "max-content",
              padding: "15px",
            }}
          >
            <Link to="/">
              <img style={{ width: 75 }} alt="aas" src={Alien} />
            </Link>
          </div>
        </Trail>

        <Switch>
          <Route path="/:walletParam">
            <Wallet />
          </Route>
          <Route path="/">
            <Hero />
          </Route>
        </Switch>
      </AppWrapper>
    </Router>
  );
}
