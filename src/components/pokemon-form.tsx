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

  const validateForm = () => {
    let newForm: Form = form;
    //validator name
    if (!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) {
      const errorMsg: string = "Name required (1-25).";
      const newField: Field = {
        value: form.name.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ name: newField } };
    } else {
      const newField: Field = {
        value: form.name.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ name: newField } };
    }
    //validator hp
    if (!/^[0-9]{1,3}$/.test(form.hp.value)) {
      const errorMsg: string = "Health points between 0-999.";
      const newField: Field = {
        value: form.hp.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ hp: newField } };
    } else {
      const newField: Field = {
        value: form.hp.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ hp: newField } };
    }

    //validator cp
    if (!/^[0-9]{1,2}$/.test(form.cp.value)) {
      const errorMsg: string = "Damage points between 0-99.";
      const newField: Field = {
        value: form.cp.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ cp: newField } };
    } else {
      const newField: Field = {
        value: form.cp.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ cp: newField } };
    }
    setForm(newForm);
    return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
  };

  const isTypesValid = (type: string): boolean => {
    {
      /* if there is one box checked, unable the user to untick the last one. hasType check that use does not lock a checked box*/
    }
    if (form.types.value.length === 1 && hasType(type)) {
      return false;
    }

    {
      /* if there is one box checked, unable the user to untick the last one*/
    }
    if (form.types.value.length >= 3 && !hasType(type)) {
      return false;
    }
    return true;
  };

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
    const isFormValid = validateForm();
    if (isFormValid) {
      history.push(`/pokemons/${pokemon.id}`);
    }
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
                  {form.name.error && (
                    <div className="card-panel red accent-1">
                      {" "}
                      {form.name.error}
                    </div>
                  )}
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
                  {form.hp.error && (
                    <div className="card-panel red accent-1">
                      {" "}
                      {form.hp.error}
                    </div>
                  )}
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
                  {form.cp.error && (
                    <div className="card-panel red accent-1">
                      {" "}
                      {form.cp.error}
                    </div>
                  )}
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
                          disabled={!isTypesValid(type)} // if type is not valid (false)  then lock the box and cannot tick it.
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
