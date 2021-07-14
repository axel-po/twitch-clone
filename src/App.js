import React from "react";
import Nav from "./components/Nav/Nav";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Live from "./pages/Live";
import GameStreams from "./pages/GameStreams";
import { HashRouter, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <HashRouter>
      <Sidebar />
      <Nav />
      <div className="App">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/live/:slug" component={Live} exact />
          <Route path="/game/:slug" component={GameStreams} exact />
        </Switch>
      </div>
    </HashRouter>
  );
}
