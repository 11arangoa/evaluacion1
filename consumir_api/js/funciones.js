
const url = 'http://localhost:8082/api/usuario';

const listarDatos = async () => {
  let respuesta = '';
  let body = document.getElementById('contenido');

  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listaUsuarios = data.usuarios;
      datos =
        listaUsuarios.map(function (usuario) {
          respuesta += `<tr><td>${usuario.documento}</td>` +
            `<td>${usuario.nombre}</td>` +
            `<td>${usuario.nota1}</td>` +
            `<td>${usuario.nota2}</td>` +
            `<td>${usuario.nota3}</td>` +
            `<td>${usuario.observaciones}</td>` +
            `<td>${calcularPromedio(usuario.nota1, usuario.nota2, usuario.nota3)}</td>` +
            `<td><a class="waves-effect waves-light btn modal-trigger yellow" href="#modal1" onclick='editar(${JSON.stringify(usuario)})'>Editar</a> 
            <a class="waves-effect waves-light btn modal-danger red"  onclick='eliminar(${JSON.stringify(usuario)})'>Eliminar</a></td>` +
            `</tr>`;
          body.innerHTML = respuesta;
        });
    });
};

const calcularPromedio = (nota1, nota2, nota3) => {
  const sum = (nota1) + (nota2) + (nota3);
  return (sum / 3).toFixed(2); // Redondear el promedio a 2 decimales
};





const registrar = async () => {
    let _documento = document.getElementById('documento').value;
    let _nombre = document.getElementById('nombre').value;
    let _nota1 = document.getElementById('nota1').value;
    let _nota2 = document.getElementById('nota2').value; 
    let _nota3 = document.getElementById('nota3').value;
    let _observaciones = document.getElementById('observaciones').value;

      let usuario = {
        documento: _documento,
        nombre: _nombre,
        nota1: _nota1,
        nota2: _nota2,
        nota3: _nota3,
        observaciones: _observaciones
      };

      console.log(usuario)
  
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(usuario), //Convertir el objeto usuario a un JSON
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a JSON
        .then(json => {
          console.log(json);
          if (json.msg) {
            Swal.fire(
              json.msg,
              '',
              'success'
            );
          }
        });
        listarDatos();
    } 
      
    
  
const editar= (usuario)=>{
    document.getElementById('documento').value = ''
    document.getElementById('nombre').value = ''
    document.getElementById('nota1').value = ''
    document.getElementById('nota2').value = ''
    document.getElementById('nota3').value = ''
    document.getElementById('observaciones').value = ''

    document.getElementById('documento').value = usuario.documento
    document.getElementById('nombre').value = usuario.nombre
    document.getElementById('nota1').value = usuario.nota1
    document.getElementById('nota2').value = usuario.nota2
    document.getElementById('nota3').value = usuario.nota3
    document.getElementById('observaciones').value = usuario.observaciones
}


const eliminar= (id)=>{
    if(confirm('¿Está seguro que desea realizar la eliminación ')== true){
    
        let usuario = {
            _id : id        }

        fetch(url,  {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            alert(json.msg)//Mensaje que retorna la API
        })
    }
    listarDatos();
}

const actualizar = async()=>{
    let _documento = document.getElementById('documento').value
    let _nombre= document.getElementById('nombre').value
    let _nota1 = document.getElementById('nota1').value
    let _nota2 = document.getElementById('nota2').value
    let _nota3 = document.getElementById('nota3').value
    let _observaciones = document.getElementById('observaciones').value
    if(_documento.trim() !== '' && _nombre.trim() !== '' && _nota1.trim() !== '' && _nota2.trim() !== '' && _nota3.trim() !== '' && _observaciones.trim() !== ''){
        let usuario = {
            documento:_documento,
            nombre:_nombre,
            nota1:_nota1,
            nota2:_nota2,
            nota3: _nota3,
            observaciones: _observaciones
        }

        fetch(url,  {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            alert(json.msg)//Mensaje que retorna la API
        })
    }
    else{
        alert('Los campos están vacíos.')
    }
    listarDatos();
    
    
      
   
}
//window.location = window.location

if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar')
    .addEventListener('click',registrar)
}

if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar')
.addEventListener('click',actualizar)
}


if(document.querySelector('#btnAEliminar')){
    document.querySelector('#btnAEliminar')
.addEventListener('click',eliminar)
}
