const userModal = new bootstrap.Modal('#userModal')
const listContainer = document.getElementById('listContainer')
const itemContainer = document.getElementById('itemContainer')

const listItemTemplate = listContainer.innerHTML
const itemTemplate = itemContainer.innerHTML

const promise = fetch('https://reqres.in/api/users')

const render = (template, user) => template
.replaceAll('$id', user.id)
.replaceAll('$first_name', user.first_name)
.replaceAll('$last_name', user.last_name)
.replaceAll('$email', user.email)
.replaceAll('$avatar', user.avatar)

const showUser = id =>fetch(new URL(id, 'https://reqres.in/api/users/')).then(res => res.json()).then(({data: user}) => {
    itemContainer.innerHTML = render(itemTemplate, user)
    userModal.show()
})

promise.then(res => res.json()).then(({data: users}) => {
    let content = ''
    for (const user of users) content += render(listItemTemplate, user)
    listContainer.innerHTML = content
})