const searchButton = document.querySelector('.searchButton')
const searchValue = document.querySelector('.search')
const container = document.querySelector('.container')

searchButton.addEventListener('click', async (e) => {
    const result = await fetch(`https://api.github.com/users/${searchValue.value}`)
    if(result.ok) {
        
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
        
    } else {
        
        const errorMsg = document.createElement('p')
        errorMsg.innerHTML = 'Ops, parece que o dev que você procurou não existe'
        errorMsg.classList.add('notFound');
        
        container.innerHTML = ""
        container.appendChild(errorMsg)
        
    }
})