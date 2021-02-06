import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Wallet from "./components/Wallet";

export default function App() {
  return (
    <Router>
      <Switch>
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
