
function iniciarSesion() {

    let usuario = obtenerDatos()

    axios
        .post("http://localhost:3002/apiFinal/v1/login", usuario)
        .then((response) => {

            if (response.data.ok === false) {
                alert("Usuario y/o contraseña Incorrectos")
            }
            else {


                
                let documento = response.data.usuario.documento
                let token = response.data.info;
                let rol = response.data.usuario.rol
                localStorage.setItem('documento', documento)
                localStorage.setItem('rol', rol);
                localStorage.setItem('token', token);


                if (rol == 1) {
                    alert("Bienvenido Mecanico")
                } else {
                    alert("Bienvenido Administrador")
                }

                location.href = "../pages/motos.html";

            }


        })
        .catch((error) => {
            console.log(error);
        });

}

function obtenerDatos() {

    let correo = document.getElementById("correo").value.toLowerCase()
    let clave = document.getElementById("clave").value

    let usuario = {
        correo: correo,
        clave: clave
    }

    return usuario;

}
