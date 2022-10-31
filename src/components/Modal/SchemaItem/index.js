import React from "react";
import Select from "react-select";
import { formSelectDefault } from "../../../utils/index";
import "./index.css";
import MinimizeIcon from "@mui/icons-material/Minimize";

const SchemaItem = ({
  item,
  schemas,
  setSchemas,
  setSelectedSchemas,
  selectedSchemas,
}) => {
  return (
    <div className="schema__item addschem__item">
      <span
        className="round__color"
        style={{ background: item.color === "user" ? "#5ddb78" : "#d24572" }}
      ></span>
      <Select
        value={item}
        onChange={(e) => {
          setSelectedSchemas((prev) => {
            const index = selectedSchemas.findIndex((i) => i.id === item.id);
            const data = JSON.parse(JSON.stringify(selectedSchemas));
            data[index] = e;
            return data;
          });
          setSchemas((prev) => {
            const index = prev.findIndex((i) => i.id === e.id);
            prev[index] = item;
            return prev;
          });
        }}
        name="type"
        className="react__select"
        options={schemas}
        placeholder={"select"}
        components={{
          IndicatorSeparator: () => null,
        }}
        styles={{
          ...formSelectDefault,
        }}
      />

      <MinimizeIcon
        className="minimizer"
        onClick={() => {
          setSchemas((prev) => [...prev, item]);
          setSelectedSchemas((prev) => {
            const filtered = prev.filter((i) => i.id !== item.id);
            return filtered;
          });
        }}
      />
    </div>
  );
};

export default SchemaItem;
