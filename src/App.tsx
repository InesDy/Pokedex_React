import React, { FunctionComponent } from "react";
import PokemonList from "./pages/pokemon-list";
import PokemonDetail from "./pages/pokemon-detail";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PageNotFound from "./pages/page-not-found";

import "./App.css";

const App: FunctionComponent = () => {
  return (
    <Router>
      <div>
        {/* Nav for all the pages*/}
        <nav>
          <div className="nav-wrapper teal">
            <Link to="/" className="brand-logo center">
              {" "}
              Pokédex{" "}
            </Link>
          </div>
        </nav>
        {/* Routes handler */}
        <Switch>
          <Route exact path="/" component={PokemonList} />
          <Route exact path="/pokemons" component={PokemonList} />
          <Route exact path="/pokemons/:id" component={PokemonDetail} />
          <Route component={PageNotFound} />{" "}
          {/* Route without a path will be redirect on the page not found - always at the end of the Routes.*/}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
