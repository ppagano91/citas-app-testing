import React from "react";
import App from "../App";
import { render, screen, clean, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

test("<App/ >La aplicación funciona correctamente", () => {
    // const wrapper = render(<App />);
    // wrapper.debug();

    render(<App />)
    expect(screen.getByText("Administrador de Pacientes")).toBeInTheDocument();
    expect(screen.getByTestId("nombre-app").textContent).toBe("Administrador de Pacientes");
    expect(screen.getByTestId("nombre-app").tagName).toBe("H1");
});
