import { useMemo, useState } from "react";
import defaultComboboxOptions from "./defaultComboboxOptions";
import { ReactComponent as AddIcon } from "../assets/24_add_blue.svg";
import { ReactComponent as DeleteIcon } from "../assets/24_cancel.svg";
import "./select-location.css";

const SelectLocation = () => {
  const [showExpanded, setShowExpanded] = useState(false);
  const [comboboxInputValue, setComboboxInputValue] = useState("");
  const [showComboboxOptions, setShowComboBoxOptions] = useState(false);
  const [comboboxOptions, setComboboxOptions] = useState(
    defaultComboboxOptions
  );
  const [addNewLocationInput, setAddNewLocationInput] = useState("");

  const handleComboboxInput: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setComboboxInputValue(e.target.value);
    setShowComboBoxOptions(true);
  };

  const handleComboboxOptionClick = (comboboOption: string) => {
    setComboboxInputValue(comboboOption);
    setShowComboBoxOptions(false);
  };

  const handleSaveNewLocation = () => {
    const isValidAndNotDuplicate =
      addNewLocationInput && !comboboxOptions.includes(addNewLocationInput);
    if (isValidAndNotDuplicate) {
      setComboboxOptions([...comboboxOptions, addNewLocationInput]);
    }
    alert(
      JSON.stringify({
        selectedComboboxValue: comboboxInputValue,
        comboboxOptions: isValidAndNotDuplicate
          ? [...comboboxOptions, addNewLocationInput]
          : comboboxOptions,
        addNewLocationInput,
      })
    );
  };

  const onClickToggleExpandHandler = () => {
    setShowExpanded(!showExpanded);
    setComboboxInputValue("");
    setShowComboBoxOptions(false);
    setComboboxOptions(defaultComboboxOptions);
    setAddNewLocationInput("");
  };

  const filteredComboboxOptions = useMemo(() => {
    const lowerCaseComboboxInput = comboboxInputValue.toLowerCase();
    return comboboxOptions.filter((comboboxOption) =>
      comboboxOption.toLowerCase().includes(lowerCaseComboboxInput)
    );
  }, [comboboxInputValue, comboboxOptions]);

  return (
    <div className="select-location">
      {showExpanded ? (
        <>
          <div
            onClick={onClickToggleExpandHandler}
            className="expand-shrink-form"
          >
            <DeleteIcon />
            Add interview location
          </div>
          <div className="combobox-wrapper">
            <div
              role="combobox"
              id="combobox"
              className="combobox"
              aria-expanded="true"
              aria-owns="comboboxList"
              aria-haspopup="listbox"
              aria-controls="combobox"
            >
              <div className="combobox-input">
                <input
                  type="text"
                  id="comboboxInput"
                  placeholder="Select address"
                  onChange={handleComboboxInput}
                  value={comboboxInputValue}
                  spellCheck="false"
                  aria-controls="comboboxList"
                  aria-autocomplete="list"
                  aria-activedescendant=""
                  onBlur={() => setShowComboBoxOptions(false)}
                />
              </div>
            </div>

            <button
              type="button"
              className={`clear-btn ${comboboxInputValue ? "show" : "hide"}`}
              aria-label="Delete value in combobox input field"
              onClick={() => setComboboxInputValue("")}
            >
              <span className="close"></span>
            </button>
            <button
              type="button"
              className="combobox-btn"
              aria-label="Open location list"
              onBlur={() => setShowComboBoxOptions(false)}
            >
              <span
                className={`vismaicon vismaicon-dynamic vismaicon-sm vismaicon-arrow-${
                  showComboboxOptions ? "up" : "down"
                }-circle`}
                onClick={() => setShowComboBoxOptions((prev) => !prev)}
              ></span>
            </button>
            <div
              className={`combobox-dropdown ${
                showComboboxOptions ? "show" : "hide"
              }`}
            >
              <ul
                role="listbox"
                id="comboboxList"
                className="combobox-list"
                aria-labelledby="comboboxLabel"
                aria-multiselectable="false"
              >
                {filteredComboboxOptions.map((comboboOption) => {
                  return (
                    <li
                      role="option"
                      id={comboboOption}
                      className="combobox-list-item"
                      aria-selected="false"
                      onMouseDown={() =>
                        //onmousedown not onclick because onBlur on input above is executed before onClick on this
                        handleComboboxOptionClick(comboboOption)
                      }
                      key={comboboOption}
                    >
                      {comboboOption}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="location-input">
            <input
              type="text"
              className="form-control"
              placeholder="Add new address"
              onChange={(e) => setAddNewLocationInput(e.target.value)}
              value={addNewLocationInput}
              name="Add new address"
            />
            <button
              type="button"
              className={`clear-btn clear-input-button ${
                addNewLocationInput ? "" : "hide"
              } `}
              aria-label="Delete location input value"
              onClick={() => setAddNewLocationInput("")}
            >
              <span className="close"></span>
            </button>
            <button
              className="btn btn-primary save-new-address-btn"
              onClick={handleSaveNewLocation}
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <div
          onClick={onClickToggleExpandHandler}
          className="expand-shrink-form expand-shrink-form--blue"
        >
          <AddIcon />
          Add interview location
        </div>
      )}
    </div>
  );
};

export default SelectLocation;
