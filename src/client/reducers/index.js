import { combineReducers } from "redux";

const checkBox = (store, action) => {
  if (action.type === "TOGGLE_CHECK") {
    return {
      checked: !store.checked
    };
  }

  return store || { checked: false };
};

const number = (store, action) => {
  if (action.type === "INC_NUMBER") {
    return {
      value: store.value + 1
    };
  } else if (action.type === "DEC_NUMBER") {
    return {
      value: store.value - 1
    };
  }

  return store || "";
};

const year = (store, action) => {
  if (action.type === "SET_YEAR") {
    return {
      year: action.year
    };
  }

  return store || { year: "Year" };
};

const make = (store, action) => {
  if (action.type === "SET_MAKE") {
    return {
      make: action.make
    };
  }

  return store || { make: "Make" };
};

const model = (store, action) => {
  if (action.type === "SET_MODEL") {
    console.log("action", action);
    return {
      model: action.model
    };
  }

  return store || { make: "Model" };
};

const engine = (store, action) => {
  if (action.type === "SET_ENGINE") {
    return {
      model: action.engine
    };
  }

  return store || { engine: "Engine" };
};

export default combineReducers({
  checkBox,
  number,
  year,
  make,
  model,
  engine
});
