
let mecanicos = []
let motosMalas = []
mantenimientos = []

let mecanicoTemp = ""
let motoTemp = ""



function verificarRol() {



    let rol = localStorage.getItem("rol")
    console.log(rol)

    if (rol == 1) {
        document.getElementById("linkAdminExclusivo1").style.display = "none"
        document.getElementById("linkAdminExclusivo2").style.display = "none"
        document.getElementById("linkmecanicoExclusivo").style.display = "inline"

    } else {

        document.getElementById("linkAdminExclusivo1").style.display = "inline"
        document.getElementById("linkAdminExclusivo2").style.display = "inline"
        document.getElementById("linkmecanicoExclusivo").style.display = "none"


    }

}



/**
* metodo para traer todos los mecanicos
*/
function obtenerMecanicos() {


    let token = localStorage.getItem("token")



    axios.get("http://localhost:3002/apiFinal/v1/usuariosRoles/1", { headers: { "token": token } }).then((response) => {




        let lista = document.getElementById("listaMecanicos")
        mecanicos = response.data;
        console.log(response)
        let data = ""

        for (let i = 0; i < mecanicos.length; i++) {
            let miMecanico = mecanicos[i];
            data += "<tr>"
            data += `<td>${miMecanico.documento}</td>`
            data += `<td>${miMecanico.nombre + " "} ${miMecanico.apellidos}</td>`
            data += `<td>${"Mecanico"}</td>`
            data += `<td><button type="button" onclick="cargarInformacionMecanico('${miMecanico.documento}')" class="btn btn-primary btn-sm">Seleccionar</button> </td>`
            data += "</tr>"
        }

        lista.innerHTML = data;

    })
        .catch((error) => {
            console.log(error);
            alert("ERROR es posible que no estes autorizado para realizar esta accion")
        });



}


/**
* metodo para traer todos los mecanicos
*/
function obtenerMotosMalas() {


    let token = localStorage.getItem("token")



    axios.get("http://localhost:3002/apiFinal/v1/motosE/MALO", { headers: { "token": token } }).then((response) => {




        let lista = document.getElementById("listaMotosMalas")
        motosMalas = response.data;
        console.log(response)
        let data = ""

        for (let i = 0; i < motosMalas.length; i++) {
            let miMoto = motosMalas[i];
            data += "<tr>"
            data += `<td>${miMoto.placa}</td>`
            data += `<td>${miMoto.estado}</td>`
            data += `<td>${miMoto.marca}</td>`
            data += `<td><button type="button" onclick="cargarInformacionMoto('${miMoto.placa}')" class="btn btn-primary btn-sm">Seleccionar</button> </td>`
            data += "</tr>"
        }

        lista.innerHTML = data;

    })
        .catch((error) => {
            console.log(error);
            alert("ERROR es posible que no estes autorizado para realizar esta accion")
        });



}


function cargarInformacionMecanico(documento) {

    mecanicoTemp = documento
    document.getElementById('labelDocumento').innerHTML = mecanicoTemp;


}

function cargarInformacionMoto(placa) {
    motoTemp = placa
    document.getElementById('labelPlaca').innerHTML = motoTemp;
}

function verificarMantenimiento() {

    if (!motoTemp || !mecanicoTemp) {
        alert("Debes seleccionar una moto y un mecanico")
    } else {

        crearMantenimiento()
    }


}

function limpiarCampos() {
    motoTemp = ""
    mecanicoTemp = ""
    cargarInformacionMecanico(mecanicoTemp)
    cargarInformacionMoto(motoTemp)
}

function crearMantenimiento() {

    let mantenimento = {

        id_mecanico: mecanicoTemp,
        placa: motoTemp

    }
    let token = localStorage.getItem("token")

    axios
        .post("http://localhost:3002/apiFinal/v1/mantenimientos", mantenimento, { headers: { "token": token } })
        .then((response) => {


            actualizarEstadoMoto()
            obtenerMantenimientos()
            obtenerMecanicos()
            obtenerMotosMalas()

        })
        .catch((error) => {
            console.log(error);
            alert("ERROR es posible que no estes autorizado para realizar esta accion")
        });




}

function actualizarEstadoMoto() {


    let token = localStorage.getItem("token")

    axios
        .put(`http://localhost:3002/apiFinal/v1/motosEstado/${motoTemp}/Mantenimiento`, null, { headers: { "token": token } })
        .then((response) => {
            obtenerMotosMalas()
            alert("El mantenimiento se registro con exito " + response.data);
        })
        .catch((error) => {
            console.log(error);
            alert("ERROR es posible que no estes autorizado para realizar esta accion")
        });

    limpiarCampos()

}



function obtenerMantenimientos() {


    let token = localStorage.getItem("token")



    axios.get("http://localhost:3002/apiFinal/v1/mantenimientosN", { headers: { "token": token } }).then((response) => {




        let lista = document.getElementById("listaMantenimientos")
        mantenimientos = response.data;
        console.log(response)
        let data = ""

        for (let i = 0; i < mantenimientos.length; i++) {
            let miM = mantenimientos[i];
            data += "<tr>"
            data += `<td>${miM.placa}</td>`
            data += `<td>${miM.id_mecanico}</td>`
            data += `<td><button type="button" onclick="eliminarMantenimiento('${miM.placa}','${miM.id_mecanico}')" class="btn btn-primary btn-sm">Eliminar</button> </td>`
            data += "</tr>"
        }

        lista.innerHTML = data;

    })
        .catch((error) => {
            console.log(error);
            alert("ERROR es posible que no estes autorizado para realizar esta accion")
        });



}

function eliminarMantenimiento(placa, documento) {



    let token = localStorage.getItem("token")

    axios.delete(`http://localhost:3002/apiFinal/v1/mantenimientos/${documento}/${placa}`, { headers: { "token": token } })
        .then((response) => {
            obtenerMantenimientos()
            alert(response.data);
        })
        .catch((error) => {
            console.log(error);
            alert("ERROR es posible que no estes autorizado para realizar esta accion")
        });

}


obtenerMantenimientos()
obtenerMecanicos()
obtenerMotosMalas()
verificarRol()