
//array de motos
let motos = [];
let motoTemp = null;




function verificarRol(){



    let rol = localStorage.getItem("rol")
    console.log(rol)

    if(rol== 1){
        document.getElementById("linkAdminExclusivo1").style.display = "none"
        document.getElementById("linkAdminExclusivo2").style.display = "none"
        document.getElementById("linkmecanicoExclusivo").style.display = "inline"
        

    }else{

        document.getElementById("linkAdminExclusivo1").style.display = "inline"
        document.getElementById("linkAdminExclusivo2").style.display = "inline"
        document.getElementById("linkmecanicoExclusivo").style.display = "none"

    }
 
}




/**
* metodo para traer todas las motos y enlistarlas
*/
function obtenerMotos() {

   
       let token= localStorage.getItem("token")
    


    axios.get("http://localhost:3002/apiFinal/v1/motos",{headers:{"token":token}}).then((response) => {




        let lista = document.getElementById("listaMotos")
        motos = response.data;
        console.log(response)
        console.log(motos)
        let data = ""

        for (let i = 0; i < motos.length; i++) {
            let miMoto = motos[i];
            data += "<tr>"
            data += `<td>${miMoto.placa}</td>`
            data += `<td>${miMoto.marca}</td>`
            data += `<td>${miMoto.estado}</td>`
            data += `<td>${miMoto.id_propietario}</td>`
            data += `<td><button type="button" onclick="cargarInformacion('${miMoto.placa}')" class="btn btn-primary btn-sm">Editar</button> </td>`
            data += `<td><button type="button" onclick="eliminarMoto('${miMoto.placa}')" class="btn btn-primary btn-sm">Eliminar</button> </td>`
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
* metodo para crear una moto y agregarla a la base de datos
*/
function crearMoto() {

    let moto = obtenerValores()
    let token = localStorage.getItem("token")

    axios
        .post("http://localhost:3002/apiFinal/v1/motos", moto,{headers:{"token":token}})
        .then((response) => {
            obtenerMotos()
            limpiarForm()
            alert(response.data.mensaje);

        })
        .catch((error) => {
            console.log(error);
            alert("ERROR es posible que no estes autorizado para realizar esta accion")
        });



}


function obtenerValores() {

    let placa = document.getElementById("placa").value
    let estado = "MALO"
    let clase = document.getElementById("clase").value
    let marca = document.getElementById("marca").value
    let modelo = document.getElementById("modelo").value
    let color = document.getElementById("color").value
    let cilindraje = document.getElementById("cilindraje").value
    let id_propietario = document.getElementById("id_propietario").value
    let nro_soat = document.getElementById("nro_soat").value
    let vencimiento_soat = document.getElementById("vencimiento_soat").value
    let nro_tecnomecanica = document.getElementById("nro_tecnomecanica").value
    let vencimiento_tecnomecanica = document.getElementById("vencimiento_tecnomecanica").value

    let miMoto = { placa, estado, clase, marca, modelo, color, cilindraje, id_propietario, nro_soat, vencimiento_soat, nro_tecnomecanica, vencimiento_tecnomecanica }
    return miMoto




}

function limpiarForm() {



    document.getElementById("placa").value = ""
    document.getElementById("clase").value = ""
    document.getElementById("marca").value = ""
    document.getElementById("modelo").value = ""
    document.getElementById("color").value = ""
    document.getElementById("cilindraje").value = ""
    document.getElementById("id_propietario").value = ""
    document.getElementById("nro_soat").value = ""
    document.getElementById("vencimiento_soat").value = ""
    document.getElementById("nro_tecnomecanica").value = ""
    document.getElementById("vencimiento_tecnomecanica").value = ""
    document.getElementById("btnCrearMoto").style.display = "inline"
    document.getElementById("btnEditarMoto").style.display = "none"
    document.getElementById("labelPlaca").style.display = "inline"
    document.getElementById("placa").style.display = "inline"
    document.getElementById("titulo1").style.display = "inline"
    document.getElementById("titulo2").style.display = "none"





}





/**
 * metodo para eliminar una moto
 * @param {*} placa de la moto en la base de datos
 */
function eliminarMoto(placa) {

    let token = localStorage.getItem("token")

    axios.delete(`http://localhost:3002/apiFinal/v1/motos/${placa}`,{headers:{"token":token}})
        .then((response) => {
            obtenerMotos()
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
            alert("ERROR es posible que no estes autorizado para realizar esta accion")
        });

}


/**
 * metodo para llenar los campos de texto con los datos de una mtoo seleccionada para editar
 * @param {*} placa placa de la moto en la base de datos
 */
function cargarInformacion(placa) {



    for (let i = 0; i < motos.length; i++) {


        let moto = motos[i];
        if (moto.placa === placa) {

            motoTemp = moto.placa
            document.getElementById("placa").value = moto.placa
            document.getElementById("clase").value = moto.clase
            document.getElementById("marca").value = moto.marca
            document.getElementById("modelo").value = moto.modelo
            document.getElementById("color").value = moto.color
            document.getElementById("cilindraje").value = moto.cilindraje
            document.getElementById("id_propietario").value = moto.id_propietario
            document.getElementById("nro_soat").value = moto.nro_soat
            document.getElementById("vencimiento_soat").value = moto.vencimiento_soat.slice(0,10)
            document.getElementById("nro_tecnomecanica").value = moto.nro_tecnomecanica
            document.getElementById("vencimiento_tecnomecanica").value = moto.vencimiento_tecnomecanica.slice(0,10)


            document.getElementById("labelPlaca").style.display = "none"
            document.getElementById("placa").style.display = "none"
            document.getElementById("btnCrearMoto").style.display = "none"
            document.getElementById("btnEditarMoto").style.display = "inline"
            document.getElementById("titulo2").style.display = "inline"
            document.getElementById("titulo1").style.display = "none"

            return
        }

    }

}


/**
 * metodo para actualizar la moto
 */
function actualizarMoto() {

    let moto = obtenerValores();

    console.log(motoTemp)
    let token = localStorage.getItem("token")

    axios
        .put(`http://localhost:3002/apiFinal/v1/motos/${motoTemp}`, moto,{headers:{"token":token}})
        .then((response) => {
            obtenerMotos()
            limpiarForm()
            alert("La moto se actualizo correctamente");
        })
        .catch((error) => {
            console.log(error);
            alert("ERROR es posible que no estes autorizado para realizar esta accion")
        });

}

verificarRol();
obtenerMotos();
