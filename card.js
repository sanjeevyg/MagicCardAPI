const baseURL ="http://localhost:3000/magic_cards/"

// Add new card 

const addCard = document.querySelector("#addCard")

function newCard() {
    const cardForm = document.createElement("form")
    cardForm.classList.add("newCard")

    const nameInput = document.createElement("input")
    nameInput.name = "name"
    nameInput.placeholder = "Name"

    const imageInput = document.createElement("input")
    imageInput.name = "image_url"
    imageInput.placeholder = "Image URL"

    const userId = document.createElement("input")
    userId.name = "user_id"
    userId.placeholder = "User Id"

    const cardSubmit = document.createElement("input")
    cardSubmit.type = "submit"
    cardSubmit.value = "Add Card"

    cardForm.append(nameInput, imageInput, userId, cardSubmit)
    addCard.appendChild(cardForm)
}

newCard()

// Update Card 

const cardContainer = document.querySelector("#card")

function getExistingCard() {
    fetch(baseURL)
        .then(response => response.json())
        .then(cards => create(cards))

    function create(cards) {
        cards.forEach(card => render(card))
    }

    function render(card) {
        const cardWrapper = document.createElement("div")

        const div = document.createElement("div")
        div.innerText = card.name
        div.classList.add("cartoon")

        const image = document.createElement("img")
        image.src = card.image_url
        image.classList.add("cartoon-image")

        const editButton = document.createElement("button")
        editButton.innerText = "Edit Info"

        const deleteButton = document.createElement("button")
        deleteButton.innerText = "Delete Card"

        cardWrapper.append(div, image, editButton, deleteButton)
        cardContainer.appendChild(cardWrapper)

        // Edit Info 
        editButton.addEventListener("click", (event) => updateCardInfo(event, card, div))
        
        // Delete Card 
        // deleteButton.addEventListener("click" => deleteCard(event, card))
    }
}

getExistingCard()

// Edit Info 
function updateCardInfo(event, card, nameElement) {
    event.preventDefault()

    // Add new form 
    const newUserForm = document.createElement("form")

    const newCardName = document.createElement("input")
    newCardName.name = "name"
    newCardName.value = card.name

    const newCardImageURL = document.createElement("input")
    newCardImageURL.name = "image_url"
    newCardImageURL.value = card.image_url

    const cardSubmitButton = document.createElement("input")
    cardSubmitButton.type = "submit"
    cardSubmitButton.value = "Submit"

    newUserForm.append(newCardName, newCardImageURL, cardSubmitButton)
    cardContainer.appendChild(newUserForm)


    newUserForm.addEventListener("submit", () => updateCard(newUserForm, card, nameElement))
}
    // Send Info to backend
function updateCard(newUserForm, card, nameElement) {
    event.preventDefault()

    const newFormData = new FormData(newUserForm)
    const name = newFormData.get("name")
    nameElement.innerText = name

    const image_url = newFormData.get("image_url")   

    const newCardInfo = {
        name: name, 
        image_url: image_url
    }
    
    fetch(`${baseURL}${card.id}`, {
        method: "PATCH", 
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify({magic_card: newCardInfo})
    }).then(response => response.json())
    .then(card => console.log(card))
}



