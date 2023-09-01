import React from "react";
import App from "../App";
import { render, screen, clean, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

const crearCita = jest.fn();

test("<App/ >La aplicación funciona correctamente la primera vez", () => {
    // const wrapper = render(<App />);
    // wrapper.debug();

    render(<App />)
    expect(screen.getByText("Administrador de Pacientes")).toBeInTheDocument();
    expect(screen.getByTestId("nombre-app").textContent).toBe("Administrador de Pacientes");
    expect(screen.getByTestId("nombre-app").tagName).toBe("H1");
    
    expect(screen.getByText("Crear Cita")).toBeInTheDocument();
    expect(screen.getByText("No hay citas")).toBeInTheDocument();

});

test("<App/> Completar Formulario funciona correctamente", () => {

    render(<App />);

    userEvent.type(screen.getByTestId("mascota"), "Hook");
    userEvent.type(screen.getByTestId("propietario"), "Juan");
    userEvent.type(screen.getByTestId("fecha"), "2023-09-01");
    userEvent.type(screen.getByTestId("hora"), "10:30");
    userEvent.type(screen.getByTestId("sintomas"), "Solo duerme");

    const btnSubmit = screen.getByTestId("btn-submit");
    userEvent.click(btnSubmit);

    // Revisar por la alerta
    const alerta = screen.queryByTestId("alerta");
    expect(alerta).not.toBeInTheDocument();    

    // Revision por el titulo dinamico
    expect(screen.getByTestId("titulo-dinamico").textContent).toBe("Administra tus Citas");
    expect(screen.getByTestId("titulo-dinamico").textContent).not.toBe("No hay citas");
})