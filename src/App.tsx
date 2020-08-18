import React, { FunctionComponent } from "react";
import PokemonList from "./pages/pokemon-list";
import PokemonDetail from "./pages/pokemon-detail";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
        </Switch>
      </div>
    </Router>
  );
};

export default App;
