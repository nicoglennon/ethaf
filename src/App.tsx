import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Wallet from "./components/Wallet";
// import { ReactComponent as Uni } from "./uni.svg";

export default function App() {
  return (
    <Router>
      <Switch>
        {/* <Uni /> */}
        <Route path="/:walletParam">
          <Wallet />
        </Route>
        <Route path="/">
          <Hero />
        </Route>
      </Switch>
    </Router>
  );
}
