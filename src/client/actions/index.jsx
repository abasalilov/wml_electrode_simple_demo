export const toggleCheck = () => {
  return {
    type: "TOGGLE_CHECK"
  };
};

export const incNumber = () => {
  return {
    type: "INC_NUMBER"
  };
};

export const decNumber = () => {
  return {
    type: "DEC_NUMBER"
  };
};

export const setYear = year => {
  return {
    type: "SET_YEAR",
    year: year
  };
};

export const setModel = model => {
  return {
    type: "SET_MODEL",
    model: model
  };
};

export const setMake = mk => {
  return {
    type: "SET_MAKE",
    make: mk
  };
};

export const setTrim = () => {
  return {
    type: "SET_TRIM"
  };
};
