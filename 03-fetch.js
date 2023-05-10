// ELEMENTOS

const userModal = new bootstrap.Modal('#userModal')
const listContainer = document.getElementById('listContainer')
const itemContainer = document.getElementById('itemContainer')

// VARIABLES 

// Obteniendo mis templates desde el HTML
const listItemTemplate = listContainer.innerHTML
const itemTemplate = itemContainer.innerHTML

// FUNCIONES INTERNAS

// Función para llenar mis templates con los datos de los usuarios
function render(template, user) {
    return template
        .replaceAll('$id', user.id)
        .replaceAll('$first_name', user.first_name)
        .replaceAll('$last_name', user.last_name)
        .replaceAll('$email', user.email)
        .replaceAll('$avatar', user.avatar)
}

// FUNCIONES PÚBLICAS

// Función que será llamada desde la vista
// También se puede con Event listeners, pero es un poco más complejo
function showUser(id) {
    fetch(`https://reqres.in/api/users/${id}`)                              // 1.- Consultar
        .then(res => res.json())
        .then((res) => {
            itemContainer.innerHTML = render(itemTemplate, res.data)        // 2.- Pintar los datos
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
                content += render(listItemTemplate, user)   // Para cada usuario, agregar sus datos al contenido
            }
            listContainer.innerHTML = content               // Pintar contenido del listado completo
        })
}

// INICIALIZACIÓN

showList()