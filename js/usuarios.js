//array de usuarios
let usuarios = [];
let usuarioTemp = null;



/**
* metodo para traer todos los usuarios y enlistarlos
*/
function obtenerUsuarios() {



    axios.get("http://localhost:3002/apiFinal/v1/usuarios").then((response) => {

        let lista = document.getElementById("listaUsuarios")
        usuarios = response.data;
        console.log(usuarios)
        let data = ""
        let rol = ""

        for (let i = 0; i < usuarios.length; i++) {


            let miUsuario = usuarios[i];


            if (miUsuario.rol === 1) {
                rol = "Mecanico"
            } else {
                rol = "Administrador"
            }


            data += "<tr>"
            data += `<td>${miUsuario.documento}</td>`
            data += `<td>${miUsuario.nombre + " "} ${miUsuario.apellidos}  </td>`
            data += `<td>${rol}</td>`
            data += `<td><button type="button" onclick="cargarInformacion('${miUsuario.documento}')" class="btn btn-primary btn-sm">Editar</button> </td>`
            data += `<td><button type="button" onclick="eliminarUsuario('${miUsuario.documento}')" class="btn btn-primary btn-sm">Eliminar</button> </td>`
            data += "</tr>"
        }

        lista.innerHTML = data;

    })
        .catch((error) => {
            console.log(error);
        });


}

/**
* metodo para crear un usuario y agregarlo a la base de datos
*/
function crearUsuario() {

    let usuario = obtenerValores()

    axios
        .post("http://localhost:3002/apiFinal/v1/usuarios", usuario)
        .then((response) => {
            obtenerUsuarios()
            limpiarForm()
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });



}


function obtenerValores() {

    let tipo_documento = document.getElementById("tipo_documento").value
    let documento = document.getElementById("documento").value
    let nombre = document.getElementById("nombre").value
    let apellidos = document.getElementById("apellidos").value
    let celular = document.getElementById("celular").value
    let correo = document.getElementById("correo").value
    let rol = document.getElementById("rol").value
    let clave = document.getElementById("clave").value


    let miUsuario = { tipo_documento, documento, nombre, apellidos, celular, correo, rol, clave }
    return miUsuario

}

function limpiarForm() {



    document.getElementById("tipo_documento").value = 0
    document.getElementById("documento").value = ""
    document.getElementById("nombre").value = ""
    document.getElementById("apellidos").value = ""
    document.getElementById("celular").value = ""
    document.getElementById("correo").value = ""
    document.getElementById("rol").value = 0
    document.getElementById("clave").value = ""



    document.getElementById("labelDocumento").style.display = "inline"
            document.getElementById("documento").style.display = "inline"
            document.getElementById("btnCrearUsuario").style.display = "inline"
            document.getElementById("titulo1").style.display = "inline"
            document.getElementById("btnEditarUsuario").style.display = "none"
            document.getElementById("titulo2").style.display = "none"


}


/**
 * metodo para eliminar un usuario
 * @param {*} documento del usuario en la base de datos
 */
function eliminarUsuario(documento) {

    axios.delete(`http://localhost:3002/apiFinal/v1/usuarios/${documento}`)
        .then((response) => {
            obtenerUsuarios()
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });

}


function cargarInformacion(documento) {

    for (let i = 0; i < usuarios.length; i++) {


        let usuario = usuarios[i];
        if (usuario.documento === documento) {

            usuarioTemp = usuario.documento
            document.getElementById("tipo_documento").value = usuario.tipo_documento
            document.getElementById("nombre").value = usuario.nombre
            document.getElementById("apellidos").value = usuario.apellidos
            document.getElementById("celular").value = usuario.celular
            document.getElementById("correo").value = usuario.correo
            document.getElementById("rol").value = usuario.rol
            document.getElementById("clave").value = usuario.clave
            document.getElementById("labelDocumento").style.display = "none"
            document.getElementById("documento").style.display = "none"
            document.getElementById("btnCrearUsuario").style.display = "none"
            document.getElementById("titulo1").style.display = "none"
            document.getElementById("btnEditarUsuario").style.display = "inline"
            document.getElementById("titulo2").style.display = "inline"
            return
        }

    }

}

/**
 * metodo para actualizar los usuarios
 */
function actualizarUsuario() {

    let usuario = obtenerValores();

    console.log(usuarioTemp)

    axios
        .put(`http://localhost:3002/apiFinal/v1/usuarios/${usuarioTemp}`, usuario)
        .then((response) => {
            obtenerUsuarios()
            limpiarForm()
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });

}






obtenerUsuarios();