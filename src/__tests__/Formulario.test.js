import React from "react";
import Formulario from "../components/Formulario";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("<Formulario/> Componente funciona correctamente", () => {
    // renderizar el componente
    // const wrapper = render(<Formulario />);
    // wrapper.debug();
    
    // verificar por label
    // OPCION 1
    // const { getByText } = render(<Formulario />);    
    // expect(getByText("Crear Cita")).toBeInTheDocument();

    // OPCION 2
    // expect(wrapper.getByText("Crear Cita")).toBeInTheDocument();

    // OPCION 3
    render(<Formulario />);
    const titulo = screen.getByTestId("titulo");
    expect(screen.getByText("Crear Cita")).toBeInTheDocument();
    expect(titulo.tagName).toBe("H2");
    expect(titulo.tagName).not.toBe("H1");
    expect(titulo.textContent).toBe("Crear Cita");

    
    // // verificar por texto en el botón
    const btnSubmit = screen.getByTestId("btn-submit");
    // expect(wrapper.getByTestId("btn-submit").textContent).toBe("Agregar Cita");
    expect(btnSubmit.tagName).toBe("BUTTON");
    expect(btnSubmit.textContent).toBe("Agregar Cita");
    expect(btnSubmit.textContent).not.toBe("Agregar Nueva Cita");

    
    // // verificar por tipo de elemento
    // expect(wrapper.getByTestId("btn-submit").tagName).toBe("BUTTON");
    
    // // verificar por clase de elemento
    // expect(wrapper.getByTestId("btn-submit").className).toBe(
    //     "btn btn-block btn-primary"
    // );
});