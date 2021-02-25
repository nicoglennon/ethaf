import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Hero from "./components/Hero";
import Trail from "./components/Trail";
import Wallet from "./components/Wallet";

const AppWrapper = styled.div`
  padding: 40px 30px;
  max-width: 850px;
  margin: auto;
  text-align: center;
  min-height: 100vh;
`;
export default function App() {
  return (
    <Router>
      <AppWrapper>
        <Trail>
          <Link to="/">
            <div
              style={{
                margin: "auto",
                textAlign: "center",
                maxWidth: 200,
                marginBottom: 10,
                padding: "15px",
              }}
            >
              {/* <Uni /> */}
              <div style={{ fontSize: "2rem" }}>eth.af</div>
            </div>
          </Link>
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
