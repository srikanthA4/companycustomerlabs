export const formSelectDefault = {
  control: (base) => ({
    ...base,
    border: "2px solid #ced4da",
  }),
  optionsContainer: (provided, state) => ({
    ...provided,
    height: "30px",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9599ad",
  }),
};
