import React from "react";
import Formulario from "../components/Formulario";
import { render, screen, clean, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

const crearCita = jest.fn();

// cleanup: https://testing-library.com/docs/react-testing-library/api#cleanup
// Ya no es necesario limpiar el DOM después de cada prueba, ya que se hace automáticamente.
// afterEach(clean());

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
    render(<Formulario crearCita={crearCita}/>);
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
    
    
    // // verificar por clase de elemento
    // expect(wrapper.getByTestId("btn-submit").className).toBe(
    //     "btn btn-block btn-primary"
    // );
});

test("<Formulario/> Validación de formulario", () => {
    render(<Formulario crearCita={crearCita}/>);

    // Click en el botón de submit
    const btnSubmit = screen.getByTestId("btn-submit");
    fireEvent.click(btnSubmit);

    // Revisar por la alerta
    const alerta = screen.getByTestId("alerta");
    expect(alerta).toBeInTheDocument();
    expect(alerta.textContent).toBe("Todos los campos son obligatorios");
    expect(alerta.tagName).toBe("P");
    expect(alerta.tagName).not.toBe("BUTTON");
    // expect(btnSubmit.tagName).toBe("BUTTON");
    // expect(btnSubmit.textContent).toBe("Agregar Cita");
    // expect(btnSubmit.textContent).not.toBe("Agregar Nueva Cita");    
    // expect(crearCita).toHaveBeenCalledTimes(1);
    // expect(crearCita).toHaveBeenCalled();
    // expect(crearCita).toHaveBeenCalledWith("Hola");
});

test("<Formulario/> Validación de formulario con FireEvent", () => {
    render(<Formulario crearCita={crearCita}/>);

    fireEvent.change(screen.getByTestId("mascota"), {
        target: { value: "Hook" }
    })

    fireEvent.change(screen.getByTestId("propietario"), {
        target: { value: "Juan" }
    })

    const btnSubmit = screen.getByTestId("btn-submit");
    fireEvent.click(btnSubmit);

})

test("<Formulario/> Validación de formulario con userEvent", () => {
    render(<Formulario crearCita={crearCita}/>);

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

    // Crear cita y revisar por la función
    
    // expect(crearCita).toHaveBeenCalled();
    expect(crearCita).toHaveBeenCalledTimes(1);
})