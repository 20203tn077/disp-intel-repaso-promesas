// ELEMENTOS

const userModal = new bootstrap.Modal('#userModal')
const listContainer = document.getElementById('listContainer')
const itemContainer = document.getElementById('itemContainer')

// VARIABLES 

// Obteniendo mis templates desde el HTML
const listItemTemplate = listContainer.innerHTML
const itemTemplate = itemContainer.innerHTML

// FUNCIONES PÚBLICAS

// Función que será llamada desde la vista
// También se puede con Event listeners, pero es un poco más complejo
function showUser(id) {
    fetch(`https://reqres.in/api/users/${id}`)                              // 1.- Consultar
        .then(res => res.json())
        .then((res) => {
            itemContainer.innerHTML = `
            <div class="row g-3 align-items-center mb-3">
                <div class="col-auto">
                    <img class="avatar" src="${res.data.avatar}" alt="avatar">
                </div>
                <div class="col">
                    <div class="row gap-3">
                        <div class="col-md-6 col-lg-4">
                            <label class="text-muted">Nombre</label>
                            <h6>${res.data.first_name}</h6>
                        </div>
                        <div class="col-md-6 col-lg-4">
                            <label class="text-muted">Apellido</label>
                            <h6>${res.data.last_name}</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row gap-3">
                <div class="col-md-6 col-lg-4">
                    <label class="text-muted">Id</label>
                    <h6>${res.data.id}</h6>
                </div>
                <div class="col-md-6 col-lg-4">
                    <label class="text-muted">Correo electrónico</label>
                    <h6>${res.data.email}</h6>
                </div>
            </div>`                                                         // 2.- Pintar los datos
            userModal.show()                                                // 3.- Abrir modal
        })
}

// Eso solo lo escribo como función para mejor estructura
function showList() {
    fetch('https://reqres.in/api/users')
        .then(res => res.json())
        .then((res) => {
            let content = ''                                // Declarar contenido
            for (const user of res.data) {
                content += `
                <div class="col-md-6 col-xl-4">
                    <div class="card shadow w-100">
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col">
                                    <div class="vstack gap-2">
                                        <h6>${user.first_name} ${user.last_name}</h6>
                                        <span class="text-muted">${user.email}</span>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <button class="btn btn-primary" onclick="showUser(${user.id})">
                                        <i class="fas fa-eye"></i>&nbsp;Detalles
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`                                     // Para cada usuario, agregar sus datos al contenido  
            }
            listContainer.innerHTML = content               // Pintar contenido del listado completo
        })
}

// INICIALIZACIÓN

showList()