const searchBar = document.querySelector('.searchBar');
const searchButton = document.querySelector('.searchButton')
const searchValue = document.querySelector('.search')
const container = document.querySelector('.container')
const themeButton = document.querySelector('.themeButton')
const logo = document.querySelector('.logo')
const infoScreen = document.querySelector('.infoScreen')
const closeButton = document.querySelector('.close')
const body = document.querySelector('body')

let light = true
themeButton.addEventListener('click', () => {
    if (light) {
        document.documentElement.style.setProperty('--color-primary1', '#FFFFFF')
        document.documentElement.style.setProperty('--color-primary2', '#E2E2E9')
        document.documentElement.style.setProperty('--color-primary3', '#B9B9C6')
        document.documentElement.style.setProperty('--color-secondary1', '#08080C')
        document.documentElement.style.setProperty('--color-secondary2', '#111117')
        document.documentElement.style.setProperty('--color-secondary3', '#292932')
        document.documentElement.style.setProperty('--color-enphasis1', '#5452E0')
        document.documentElement.style.setProperty('--color-enphasis2', '#4442D7')
        document.documentElement.style.setProperty('--color-enphasis3', '#2926D8')
        document.documentElement.style.setProperty('--color-enphasis4', '#1F1DC9')
        document.documentElement.style.setProperty('--color-enphasis5', '#1714B8')
        logo.src = "./assets/img/FindADevBlack.svg"
        themeButton.src = "./assets/img/lightIcon.svg"
        light = !light
    } else {
        document.documentElement.style.setProperty('--color-primary1', '#08080C')
        document.documentElement.style.setProperty('--color-primary2', '#111117')
        document.documentElement.style.setProperty('--color-primary3', '#292932')
        document.documentElement.style.setProperty('--color-secondary1', '#FFFFFF')
        document.documentElement.style.setProperty('--color-secondary2', '#E2E2E9')
        document.documentElement.style.setProperty('--color-secondary3', '#B9B9C6')
        document.documentElement.style.setProperty('--color-enphasis1', '#5452E0')
        document.documentElement.style.setProperty('--color-enphasis2', '#4442D7')
        document.documentElement.style.setProperty('--color-enphasis3', '#2926D8')
        document.documentElement.style.setProperty('--color-enphasis4', '#1F1DC9')
        document.documentElement.style.setProperty('--color-enphasis5', '#1714B8')
        themeButton.src = "./assets/img/darkIcon.svg"
        logo.src = "./assets/img/FindADevWhite.svg"
        light = !light
    }
})

searchValue.addEventListener('focus', () => {
    searchBar.classList.add('focused')
})
searchValue.addEventListener('blur', () => {
    searchBar.classList.remove('focused')
})

searchButton.addEventListener('click', async (e) => {
    const result = await fetch(`https://api.github.com/users/${searchValue.value}`)
    if (result.ok) {

        const person = await result.json()

        const devElement = document.createElement('article')

        devElement.classList.add('dev')
        console.log(person)

        const name = document.createElement('h2')
        name.innerHTML = person.name

        const bio = document.createElement('p')
        bio.innerHTML = person.bio

        const profileImg = document.createElement('img')
        profileImg.src = person.avatar_url

        const button = document.createElement('button')
        button.innerHTML = "Ver Perfil"

        devElement.appendChild(profileImg)
        devElement.appendChild(name)
        devElement.appendChild(bio)
        devElement.appendChild(button)

        container.innerHTML = ""
        container.appendChild(devElement)
        const viewProfileButton = document.querySelector('.dev button')
        console.log(viewProfileButton);

        viewProfileButton.addEventListener('click', () => {
            infoScreen.classList.remove('hidden')
            body.classList.add('locked')
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            closeButton.addEventListener('click', () => {
                infoScreen.classList.add('hidden')
            })
        })

    } else {

        const errorMsg = document.createElement('p')
        errorMsg.innerHTML = 'Ops, parece que o dev que você procurou não existe'
        errorMsg.classList.add('notFound');

        container.innerHTML = ""
        container.appendChild(errorMsg)

    }
})
