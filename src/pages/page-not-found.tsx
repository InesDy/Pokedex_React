import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

const PageNotFound: FunctionComponent = () => {
  return (
    <div className="center">
      <img
        src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png"
        alt="Page non trouvée"
      />
      <h1>Hey, this page does not exit !</h1>
      <Link to="/" className="waves-effect waves-teal btn-flat">
        Back to homepage
      </Link>
    </div>
  );
};

export default PageNotFound;
