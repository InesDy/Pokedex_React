import React, { FunctionComponent, useState } from "react";
import { useHistory } from "react-router-dom";
import Pokemon from "../models/pokemon";
import formatType from "../helpers/format-type";

type Props = {
  pokemon: Pokemon;
};

type Field = {
  value?: any;
  error?: string;
  isValid?: boolean;
};

type Form = {
  name: Field;
  hp: Field;
  cp: Field;
  types: Field;
};

const PokemonForm: FunctionComponent<Props> = ({ pokemon }) => {
  const [form, setForm] = useState<Form>({
    name: { value: pokemon.name, isValid: true },
    hp: { value: pokemon.hp, isValid: true },
    cp: { value: pokemon.cp, isValid: true },
    types: { value: pokemon.types, isValid: true },
  });

  const history = useHistory();

  const types: string[] = [
    "Plante",
    "Feu",
    "Eau",
    "Insecte",
    "Normal",
    "Electrik",
    "Poison",
    "Fée",
    "Vol",
    "Combat",
    "Psy",
  ];

  const hasType = (type: string): boolean => {
    return form.types.value.includes(type);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField });
  };

  const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    let newField: Field;

    if (checked) {
      //if user ticks one type, it adds up to the list
      const newTypes: string[] = form.types.value.concat([type]);
      newField = { value: newTypes };
    } else {
      //if user unchecks
      const newTypes: string[] = form.types.value.filter(
        (currentType: string) => currentType !== type
      );
      newField = { value: newTypes };
    }

    setForm({ ...form, ...{ types: newField } });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    history.push(`/pokemons/${pokemon.id}`);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            <div className="card-image">
              <img
                src={pokemon.picture}
                alt={pokemon.name}
                style={{ width: "250px", margin: "0 auto" }}
              />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name.value}
                    onChange={(e) => handleInputChange(e)}
                    className="form-control"
                  ></input>
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Health point</label>
                  <input
                    id="hp"
                    name="hp"
                    type="number"
                    value={form.hp.value}
                    onChange={(e) => handleInputChange(e)}
                    className="form-control"
                  ></input>
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Damage</label>
                  <input
                    id="cp"
                    name="cp"
                    type="number"
                    value={form.cp.value}
                    onChange={(e) => handleInputChange(e)}
                    className="form-control"
                  ></input>
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map((type) => (
                    <div key={type} style={{ marginBottom: "10px" }}>
                      <label>
                        <input
                          id={type}
                          type="checkbox"
                          value={type}
                          checked={hasType(type)}
                          onChange={(e) => selectType(type, e)}
                          className="filled-in"
                        ></input>
                        <span>
                          <p className={formatType(type)}>{type}</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PokemonForm;
