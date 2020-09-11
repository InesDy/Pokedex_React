import React, { FunctionComponent, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import PokemonForm from "../components/pokemon-form";
import Pokemon from "../models/pokemon";
// import POKEMONS from "../models/mock-pokemons";

type Params = { id: string };

const PokemonEdit: FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/pokemons/edit/${match.params.id}`)
      .then((response) => response.json())
      .then((res) => {console.log
        return res}
      .then((pokemon) => {
        if (pokemon.id) setPokemon(pokemon);
      });
  }, [match.params.id]);

  return (
    <div>
      {pokemon ? (
        <div className="row">
          <h2 className="header center">Edit {pokemon.name}</h2>
          <PokemonForm pokemon={pokemon}></PokemonForm>
        </div>
      ) : (
        <h4 className="center">No pokemon !</h4>
      )}
    </div>
  );
};

export default PokemonEdit;
