let mantenimientos=[]

let placaTemp=""
let documentoTemp=""

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
* metodo para traer todos los mecanicos
*/
function obtenerMantenimientos() {

   
    let documento= localStorage.getItem("documento")
    let token = localStorage.getItem("token")

    console.log("aqui",documento);
    
 


 axios.get(`http://localhost:3002/apiFinal/v1/mantenimientos/${documento}`,{headers:{"token":token}}).then((response) => {


     let lista = document.getElementById("listaMantenimientos")
     mantenimientos = response.data;
     console.log(response)
     let data = ""
     

     for (let i = 0; i < mantenimientos.length; i++) {
         let miMantenimiento = mantenimientos[i];
         let fecha=miMantenimiento.fecha.slice(0,10)
         data += "<tr>"
         data += `<td>${miMantenimiento.placa}</td>`
         data += `<td>${fecha}</td>`
         data += `<td>${miMantenimiento.trabajos_realizados}</td>`
         data += `<td><button type="button" onclick="cargarMantenimiento('${miMantenimiento.placa}','${miMantenimiento.id_mecanico}')" class="btn btn-primary btn-sm">Actualizar</button> </td>`
         data += "</tr>"
     }

     lista.innerHTML = data;

 })
     .catch((error) => {
         console.log(error);
         alert("ERROR es posible que no estes autorizado para realizar esta accion")
     });



}


function cargarMantenimiento(placa,documento){

    document.getElementById('labelDocumento').innerHTML = documento
    document.getElementById('labelPlaca').innerHTML = placa
    
    documentoTemp=documento
    placaTemp=placa

    

    limpiarCampos()

}


function actualizarMantenimiento(){



    let date = new Date();
    let dia = date.getDate();
    let mes= date.getMonth()+1;
    let anio = date.getFullYear();
    let fecha= anio+"-"+mes+"-"+dia;

    let trabajos_realizados = document.getElementById('trabajos').value
    let horas_invertidas= document.getElementById('horas').value


    let miMantenimiento={
        id_mecanico:documentoTemp,
        placa:placaTemp,
        trabajos_realizados:trabajos_realizados,
        fecha:fecha,
        horas_invertidas:horas_invertidas

    }


    let token = localStorage.getItem("token")

    axios
        .put(`http://localhost:3002/apiFinal/v1/mantenimientos/${documentoTemp}/${placaTemp}`, miMantenimiento,{headers:{"token":token}})
        .then((response) => {
            obtenerMantenimientos()
            actualizarEstadoMoto()
            limpiarCampos()
            alert("el mantenimiento fue realizado La moto se actualizo correctamente");
        })
        .catch((error) => {
            console.log(error);
            alert("ERROR es posible que no estes autorizado para realizar esta accion")
        });

}

function limpiarCampos(){

    document.getElementById('trabajos').value = ""
    document.getElementById('horas').value = ""
}


function actualizarEstadoMoto() {


    let token = localStorage.getItem("token")

    axios
        .put(`http://localhost:3002/apiFinal/v1/motosEstado/${placaTemp}/Reparada`, null, { headers: { "token": token } })
        .then((response) => {

            
        })
        .catch((error) => {
            console.log(error);
            alert("ERROR es posible que no estes autorizado para realizar esta accion")
        });

    limpiarCampos()

}

obtenerMantenimientos()
verificarRol()