
//CLASES

class Empleados {

    constructor(nombre, apellido, dni, sexo, fecha_nac, fecha_ing) {
        //PROPIEDADES
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.sexo = sexo;
        this.fecha_nac = fecha_nac;
        this.fecha_ing = fecha_ing;


    }

    //METODOS


    get_datos() {
        console.log("<---------DATOS DEL EMPLEADO/A-------->");
        console.log("Nombre: ", this.nombre);
        console.log("Apellido: ", this.apellido);
        console.log("DNI: ", this.dni);
        console.log("Sexo del Empleado: ", this.sexo);
        console.log("Año de Nacimiento: ", this.fecha_nac);
        console.log("Año de Ingreso a la Empresa: ", this.fecha_ing);
        console.log("");
        console.log("--------------------------------------");
    }




}
//

//CALCULO EN QUE AÑO RECIBIRIA UN PREMIO POR ANTIGUEDAD EN LA EMPRESA
function premio(anio_ingreso, sexo) {

    if (sexo == "F") {
        console.log("Primer premio especial por antiguedad en el año: ", (anio_ingreso + 17));
        console.log("Segundo premio en el año: ", (anio_ingreso + 22));
        console.log("Tercer premio en el año: ", (anio_ingreso + 27));

    } else {
        console.log("Primer premio especial  por antiguedad en el año: ", (anio_ingreso + 20));
        console.log("Segundo premio por antiguedad en el año: ", (anio_ingreso + 25));
        console.log("Tercer premio en el año: ", (anio_ingreso + 30));
    }
}


// CALCULO LOS DIAS DE VACACIONES QUE LE CORRESPONDE POR SU ANTIGUEDAD
function dias_vacaciones(anio_actual, anio_ingreso) {
    anio_actual = parseInt(anio_actual);
    anio_ingreso = parseInt(anio_ingreso);
    let trabajados = anio_actual - anio_ingreso;


    if (trabajados >= 0 && trabajados <= 5) {
        return "10";

    } else if (trabajados > 5 && trabajados <= 10) {
        return "15";

    } else if (trabajados >= 0 && trabajados <= 15) {
        return "20";

    } else if (trabajados >= 0 && trabajados <= 20) {
        return "25";
    } else if (trabajados > 20) {
        return "30";

    }
}
const lista_empleados = [];



function agregarFormulario1() {
    // crear el formulario
    const formulario = document.createElement('form');
    const inputs = `
      <label>Nombre:  </label>
      <input type="text" name="nombre" required><br>
      <label>Apellido:</label>
      <input type="text" name="apellido" required><br>
      <label>**DNI***:       </label>
      <input type="text" name="dni" required><br>
      <label>Sexo:    </label>
      <select name="sexo" required>
        <option value="">Seleccionar...</option>
        <option value="M">Masculino</option>
        <option value="F">Femenino</option>
        <option value="O">Otro</option>
      </select><br>
      <label>**Fecha de ingreso**:</label>
      <input type="date" name="fecha_ing" required><br>
      <label>Fecha de nacimiento:</label>
      <input type="date" name="fecha_nac" required><br>
      <button type="submit">Guardar</button>
    `;
    formulario.innerHTML = inputs;

    // agregar el formulario al body
    document.body.appendChild(formulario);

    // manejar el envío del formulario
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        // crear el objeto empleado con los datos del formulario
        const form = event.target;
        const empleado = {
            nombre: form.nombre.value,
            apellido: form.apellido.value,
            dni: form.dni.value,
            sexo: form.sexo.value,
            fecha_ing: form.fecha_ing.value,
            fecha_nac: form.fecha_nac.value,
        };

        // agregar el objeto empleado al arreglo lista_empleados
        lista_empleados.push(empleado);

        // guardar la lista de empleados en el almacenamiento local
        const listaJSON = JSON.stringify(lista_empleados);
        localStorage.setItem('lista_empleados', listaJSON);

        // agregar fila a la tabla
        const tabla = document.querySelector('#tabla-empleados');
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${empleado.nombre}</td>
        <td>${empleado.apellido}</td>
        <td>${empleado.dni}</td>
        <td>${empleado.sexo}</td>
        <td>${empleado.fecha_ing}</td>
        <td>${empleado.fecha_nac}</td>
      `;
        tabla.appendChild(fila);
        
        // Verificar si el botón con ID "terminar" existe
        var botonExistente = document.getElementById("terminar-btn");

        // Si el botón no existe, crear uno nuevo
        if (!botonExistente) {

            const terminarBtn = document.createElement("button");
            terminarBtn.innerText = "terminar";
            terminarBtn.id = "terminar-btn";

            // Agregar botón al final del div formulario-container
            formulario.appendChild(terminarBtn);
            terminarBtn.addEventListener("click", terminar);
        }


        // Crear botón "Terminar"
        /////////////////////////////////////////////////////////////////////

        // limpiar el formulario
        form.reset();
        form.nombre.focus();

    });
}

function modificarEmpleado() {
    const listaJSON = localStorage.getItem('lista_empleados');
    if (listaJSON) {
        const lista_empleados = JSON.parse(listaJSON);
        const tabla = document.createElement('table');
        tabla.id = 'tabla-empleados';
        for (let i = 0; i < lista_empleados.length; i++) {
            const empleado = lista_empleados[i];
            const fila = document.createElement('tr');
            fila.innerHTML = `
          <td><input type="text" value="${empleado.nombre}" id="nombre-${i}"></td>
          <td><input type="text" value="${empleado.apellido}" id="apellido-${i}"></td>
          <td><input type="text" value="${empleado.dni}" id="dni-${i}"></td>
          <td><input type="text" value="${empleado.sexo}" id="sexo-${i}"></td>
          <td><input type="text" value="${empleado.fechaIngreso}" id="fecha-ingreso-${i}"></td>
          <td><input type="text" value="${empleado.fechaNacimiento}" id="fecha-nacimiento-${i}"></td>
          <td><button onclick="guardarEmpleado(${i})"><i class="fas fa-save"></i></button></td>
          <td><button onclick="eliminarEmpleado(${i})"><i class="fas fa-trash-alt"></i></button></td>
        `;
            tabla.appendChild(fila);
        }
        document.body.appendChild(tabla);
    }
}

function guardarEmpleado(index) {
    const nuevoNombre = document.getElementById(`nombre-${index}`).value;
    const nuevoApellido = document.getElementById(`apellido-${index}`).value;
    const nuevoDNI = document.getElementById(`dni-${index}`).value;
    const nuevoSexo = document.getElementById(`sexo-${index}`).value;
    const nuevaFechaIngreso = document.getElementById(`fecha-ingreso-${index}`).value;
    const nuevaFechaNacimiento = document.getElementById(`fecha-nacimiento-${index}`).value;

    if (nuevoNombre && nuevoApellido && nuevoDNI && nuevoSexo && nuevaFechaIngreso && nuevaFechaNacimiento) {
        const listaJSON = localStorage.getItem('lista_empleados');
        if (listaJSON) {
            const lista_empleados = JSON.parse(listaJSON);
            lista_empleados[index] = {
                nombre: nuevoNombre,
                apellido: nuevoApellido,
                dni: nuevoDNI,
                sexo: nuevoSexo,
                fechaIngreso: nuevaFechaIngreso,
                fechaNacimiento: nuevaFechaNacimiento
            };


            localStorage.setItem('lista_empleados', JSON.stringify(lista_empleados));

            
            
            location.reload(); // Recargar la página para reflejar los cambios
        }
        
        
    }
    
}

function eliminarEmpleado(index) {
    const confirmacion = confirm('¿Está seguro de que desea eliminar este empleado?');
    if (confirmacion) {
        const listaJSON = localStorage.getItem('lista_empleados');
        if (listaJSON) {
            const lista_empleados = JSON.parse(listaJSON);
            lista_empleados.splice(index, 1); // Eliminar el empleado del array
            localStorage.setItem('lista_empleados', JSON.stringify(lista_empleados));
            location.reload(); // Recargar la página para reflejar los cambios
        }
    }
}




function terminar1() {
    // borrar el contenido del div
    const div = document.getElementById('formulario');
    div.innerHTML = '';

    // mostrar mensaje de confirmación
    const mensaje = document.createElement('h2');
    mensaje.textContent = '¡Empleados agregados con éxito!';
    div.appendChild(mensaje);

    // agregar botón "Volver al menú"
    const boton = document.createElement('button');
    boton.textContent = 'Volver al menú';
    boton.addEventListener('click', function () {
        // redirigir a la página inicial de botones
        window.location.href = 'index2.html';
    });
    div.appendChild(boton);
}
// Función para borrar todos los elementos del cuerpo del documento
function borrarContenido() {
    const encabezado = document.querySelector("header");
    const elementos = document.body.children;
    for (let i = elementos.length - 1; i >= 0; i--) {
        const elemento = elementos[i];
        if (elemento !== encabezado) {
            elemento.parentNode.removeChild(elemento);
        }
    }
}
function terminar() {
    const formulario = document.getElementById("formulario");
    const tabla = document.getElementById("tabla");
    if (formulario && formulario.parentElement) {
        formulario.parentElement.removeChild(formulario);
    }

    if (tabla && tabla.parentElement) {
        tabla.parentElement.removeChild(tabla);
    }
    // Verifica si el formulario y la tabla existen antes de intentar eliminarlos
    if (formulario) {
        formulario.parentNode.removeChild(formulario);
    }

    if (tabla) {
        //tabla.parentNode.removeChild(tabla);
    }
    borrarContenido();
    // Mostrar mensaje de despedida
    const mensaje = document.createElement("p");
    mensaje.textContent = '¡Empleados agregados con éxito!';
    document.body.appendChild(mensaje);
    window.location.href = 'index2.html';
}




function salir() {
    // borrar el contenido del body
    document.body.innerHTML = '';

    // agregar mensaje de despedida
    const mensaje = document.createElement('h2');
    mensaje.textContent = '¡Hasta pronto!';
    document.body.appendChild(mensaje);
}




function alta() {
    document.body.innerText = `<h2> Agregar Empleado></h2> <a href="main.js.alta()">   
    <form id="formEmpleado">
    <label for="nombre">Nombre:</label><input type="text" id="nombre" name="nombre"><br>
    < label for= "ape" > Apellido:</label ><input type="text" id="apellido" name="apellido"><br>
    <label for="dni">DNI:</label><input type="number" id="dni" name="dni"><br>
    <label for="sexo">Sexo:</label><input type="text" id="sexo" name="sexo"><br>
    < label for = "fecha_ing" > Fecha de Ingreso:</label >
    <input type="text" id="" name="fecha_ing"><br>
    <button type="submit">Guardar</button></form></a>`
    var lista_empleados = [];
    const formEmpleado = document.querySelector('#formEmpleado');
    const nombre = document.querySelector('#nombre');
    const ape = document.querySelector('#apellido');
    const dni = document.querySelector('#dni');
    const sexo = document.querySelector('#sexo');
    const fecha_ing = document.querySelector('#fecha_ing');
    const fecha_nac = document.querySelector('#fecha_nac');
    formEmpleado.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita que se recargue la página
        // Código para guardar los datos del empleado
    });



  
    let emple = new Empleados(nombre, ape, dni, sexo, fecha_nac, fecha_ing, fecha_nac);
    lista_empleados.push(emple);
    emple.get_datos();
   
}

for (let empleado of lista_empleados) {
    empleado.get_datos()
}



