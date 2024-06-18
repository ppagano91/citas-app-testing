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

test("<App/> Agregar una cita correctamente y verificar el Heading", () => {

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

test("<App/> Verificar las citas en el DOM", async () => {
    render(<App />);

    const citas = await screen.findAllByTestId("cita");
    // console.log(citas.toString());
    
    // Snapshot crea un archivo que se llama __snapshots__ y se guarda el html
    // expect(citas).toMatchSnapshot();
    expect(citas).toHaveLength(1);

    expect(screen.getByTestId("btn-eliminar")).toBeInTheDocument();
    expect(screen.getByTestId("btn-eliminar").tagName).toBe("BUTTON");
    expect(screen.getByTestId("btn-eliminar")).toHaveTextContent("Eliminar");

    // Verificar alguna cita
    expect(screen.getByText("Hook")).toBeInTheDocument();

    
})

test("<App/> Eliminar la cita", () => {
    render(<App />);

    const btnEliminar = screen.getByTestId("btn-eliminar");
    expect(btnEliminar).toBeInTheDocument();
    expect(screen.getByTestId("btn-eliminar").tagName).toBe("BUTTON");
    expect(btnEliminar).toHaveTextContent("Eliminar");

    // Simular el click
    userEvent.click(btnEliminar);

    // El boton ya no debe estar
    expect(btnEliminar).not.toBeInTheDocument();

    // La cita ya no debe estar
    expect(screen.queryByText("Hook")).not.toBeInTheDocument();
    expect(screen.queryByTestId("cita")).not.toBeInTheDocument();

    // El titulo debe de cambiar a "No hay citas"
    expect(screen.getByTestId("titulo-dinamico").textContent).toBe("No hay citas");
    expect(screen.getByTestId("titulo-dinamico").textContent).not.toBe("Administra tus Citas");

})