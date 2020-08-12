import React, { FunctionComponent, useState } from "react";
import Pokemon from "../models/pokemon";
import "./pokemon-card.css";

type Props = {
  pokemon: Pokemon;
  borderColor?: string; //optional prop
};

const PokemonCard: FunctionComponent<Props> = ({
  pokemon,
  borderColor = "#009688",
}) => {
  const [color, setColor] = useState<string>();

  const showBorder = () => {
    setColor(borderColor); // colour set just above as prop'#009688'
  };

  const hideBorder = () => {
    setColor("#f5f5f5"); //Back to grey border (picked as initial)
  };

  const formatDate = (date: Date): string => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div
      className="col s6 m4"
      onMouseEnter={showBorder}
      onMouseLeave={hideBorder}
    >
      <div className="card horizontal" style={{ borderColor: color }}>
        <div className="card-image">
          <img src={pokemon.picture} alt={pokemon.name} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>
              {" "}
              <big className="name">{pokemon.name}</big> <br />{" "}
              <small>{pokemon.types}</small>
              <p>
                <small> {formatDate(pokemon.created)}</small>
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
