import React, { useState } from "react";
import { Offcanvas, OffcanvasBody } from "reactstrap";
import "./index.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import SchemaItem from "./SchemaItem";
import data from "../../utils/data.json";
import Select from "react-select";
import MinimizeIcon from "@mui/icons-material/Minimize";
import { formSelectDefault } from "../../utils";
import { errorToast } from "../toast";

export const CustomModal = ({ show, onClose }) => {
  const [schemas, setSchemas] = useState(data);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [selectedElement, setSelectedElement] = useState();
  const [loader, setLoader] = useState(false);

  const addschemaHandler = () => {
    if (!selectedElement) {
      errorToast("Please Select Schema to add.");
      return;
    }
    setSchemas((prev) => {
      const filetered = prev.filter((item) => item.id !== selectedElement.id);
      return filetered;
    });
    setSelectedSchemas((prev) => [...prev, selectedElement]);
    setSelectedElement("");
  };

  const saveHandler = () => {
    if (!segmentName) {
      errorToast("Please enter segment name.");
      return;
    } else if (!selectedSchemas.length) {
      errorToast("Please add atleast one schema.");
      return;
    }
    const bodyData = {
      segment_name: segmentName,
      schema: selectedSchemas.map((item) => {
        return {
          [item.field]: item.value,
        };
      }),
    };
    setLoader(true);
    fetch("https://webhook.site/8391f5a6-2c5c-4f76-92ef-848ac6eae167", {
      method: "POST",
      body: JSON.stringify(bodyData),
    })
      .then((res) => {
        errorToast("Successfully added schema.");
        setLoader(false);
      })
      .catch((e) => {
        errorToast(e.message);
        setLoader(false);
      });
  };

  return (
    <Offcanvas
      isOpen={show}
      direction="end"
      toggle={onClose}
      className="offcanvas__end"
      tabIndex="-1"
    >
      <header className="header custom__header">
        <KeyboardArrowLeftIcon className="icon" />
        <h1>Save Segment</h1>
      </header>

      <div className="segment__container">
        <label>Enter the name of the segment</label>
        <input
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
          className="segment__input"
        />
        <p className="segment__text">
          To Save your segment, you need to add the schems to build the query{" "}
        </p>
        <div className="segment__colors">
          <p>
            <span style={{ background: "#5ddb78" }}></span>
            <span>- User Traits</span>
          </p>
          <p>
            <span style={{ background: "#d24572" }}></span>{" "}
            <span>- group Traits</span>
          </p>
        </div>
      </div>

      <OffcanvasBody>
        {!!selectedSchemas.length && (
          <div className="schema__items">
            {selectedSchemas.map((item, i) => (
              <SchemaItem
                key={i}
                item={item}
                schemas={schemas}
                setSchemas={setSchemas}
                setSelectedSchemas={setSelectedSchemas}
                selectedSchemas={selectedSchemas}
              />
            ))}
          </div>
        )}
        <div className="schema__item ">
          <span
            className="round__color"
            style={{
              background: "gray",
            }}
          ></span>
          <Select
            value={selectedElement}
            onChange={(e) => {
              setSelectedElement(e);
            }}
            name="type"
            className="react__select"
            options={schemas}
            placeholder="Add schema to segment"
            components={{
              IndicatorSeparator: () => null,
            }}
            styles={{
              ...formSelectDefault,
            }}
          />

          <MinimizeIcon className="minimizer" />
        </div>
        <button className="addnew__schema" onClick={addschemaHandler}>
          +Add new schema
        </button>
      </OffcanvasBody>
      <div className="footer__buttons">
        {loader ? (
          <p>...loading</p>
        ) : (
          <button onClick={saveHandler}>Save Segment</button>
        )}

        <button
          onClick={() => {
            onClose();
            setSelectedSchemas([]);
            setSchemas(data);
          }}
        >
          Cancel
        </button>
      </div>
    </Offcanvas>
  );
};
