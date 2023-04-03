import { render, screen, fireEvent } from "@testing-library/react";
import SelectLocation from "./select-location";
describe("select-location component tests", () => {
  it("should render component", () => {
    render(<SelectLocation />);
  });

  it("should render component in non expanded and expanded versions", () => {
    render(<SelectLocation />);
    const text = screen.getByText("Add interview location");
    expect(text).toBeInTheDocument();

    fireEvent.click(text);

    const inputElement = screen.getByPlaceholderText("Add new address");
    expect(inputElement).toBeInTheDocument();
  });

  describe("select-location component expanded tests", () => {
    it("should handle changing combobox input value and clearing input by button click", () => {
      render(<SelectLocation />);
      const newValue = "new location";
      const text = screen.getByText("Add interview location");
      fireEvent.click(text);

      const comboboxInput = screen.getByPlaceholderText("Select address");

      expect(comboboxInput).toBeInTheDocument();

      fireEvent.change(comboboxInput, { target: { value: newValue } });

      expect(comboboxInput).toHaveValue(newValue);
      const clearInputButton = screen.getByRole("button", {
        name: "Delete value in combobox input field",
      });
      fireEvent.click(clearInputButton);
      expect(comboboxInput).toHaveValue("");
    });

    it("should handle changing addNewLocation input value and clearing input by button click", () => {
      render(<SelectLocation />);
      const newValue = "new location";
      const text = screen.getByText("Add interview location");
      fireEvent.click(text);

      const addNewLocationInput =
        screen.getByPlaceholderText("Add new address");

      expect(addNewLocationInput).toBeInTheDocument();
      fireEvent.change(addNewLocationInput, { target: { value: newValue } });
      expect(addNewLocationInput).toHaveValue(newValue);

      const clearInputButton = screen.getByRole("button", {
        name: "Delete location input value",
      });
      fireEvent.click(clearInputButton);
      expect(addNewLocationInput).toHaveValue("");
    });

    it("should alert form values when save button is clicked", () => {
      render(<SelectLocation />);
      const text = screen.getByText("Add interview location");
      fireEvent.click(text);

      const mockAlert = jest.fn();
      jest.spyOn(window, "alert").mockImplementation(mockAlert);
      const saveButton = screen.getByRole("button", {
        name: "Save",
      });

      fireEvent.click(saveButton);

      expect(mockAlert).toHaveBeenCalledTimes(1);
      expect(mockAlert).toHaveBeenCalledWith(
        '{"selectedComboboxValue":"","comboboxOptions":["Sporta iela 11, Rīga","Maldugunu iela 2, Rīga","Lindhagengatan 94, Stockholm"],"addNewLocationInput":""}'
      );
    });
  });
});
