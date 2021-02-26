import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Hero from "./components/Hero";
import Trail from "./components/Trail";
import Wallet from "./components/Wallet";

const AppWrapper = styled.div`
  padding: 40px 30px 60px 30px;
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
          <div
            style={{
              margin: "auto",
              textAlign: "center",
              width: "max-content",
              padding: "15px",
            }}
          >
            <Link to="/">
              {/* <div style={{ fontSize: "2rem" }}>eth.af</div> */}
              <img
                style={{ width: 75 }}
                alt="aas"
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/nazar-amulet_1f9ff.png"
              />
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
