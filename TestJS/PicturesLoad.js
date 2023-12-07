const container = document.querySelector('.container')

const loadPictures = document.querySelector('.load_pictures')

const modal = document.querySelector('.modal')
const modalImg = document.querySelector('.modal--img')
const modalImgImg = modalImg.querySelector('img')
const modalButton = document.querySelectorAll('.modal--button')
const modalButtonRight = document.querySelector('.modal--button.right')
const modalButtonLeft = document.querySelector('.modal--button.left')



let current = 0

async function blockImageCreate() {
    const data = await fetch('https://jsonplaceholder.typicode.com/photos').then(response => response.json())

    for (let i = current; i < current + 24; i++) {

        container.insertAdjacentHTML('beforeend', `
            <div class="image_block" id=${data[i].id}>
                <img src=${data[i].url}   alt="img">
            </div>
        `)
    }
    current = container.children.length

    addClickListeners()

}
blockImageCreate().catch(r => console.error(r))

function addClickListeners() {
    const imageBlockAll = document.querySelectorAll('.image_block')

    imageBlockAll.forEach(el => el.addEventListener('click', (event) => {
        modal.style.display = 'block'
        modalImgImg.src = event.target.src
        modalImgImg.id = el.id
    }))
}

function switchImageRight() {
    const imageBlockImgAll = document.querySelectorAll('.image_block img')
    const arrayImageBlocks = [...imageBlockImgAll]

    for (let i = 0; i < arrayImageBlocks.length; i++) {
        const nextElement = arrayImageBlocks[i + 1]

        if(modalImgImg.src === arrayImageBlocks[i].src) {
            if (nextElement) {
                modalImgImg.src = nextElement.src
                break
            } else {
                return blockImageCreate()
            }
        }
    }
}

function switchImageLeft() {
    const imageBlockImgAll = document.querySelectorAll('.image_block img')
    const arrayImageBlocks = [...imageBlockImgAll]

    for (let i = 0; i < arrayImageBlocks.length; i++) {
        const prevElement = arrayImageBlocks[i - 1]

        if(modalImgImg.src === arrayImageBlocks[i].src) {
            if (prevElement) {
                modalImgImg.src = prevElement.src
                break
            } else {
                break
            }
        }
    }
}


loadPictures.addEventListener('click', blockImageCreate)

modalImg.addEventListener('click', event => event.stopPropagation())
// stopPropagation - Это очень полезная штука которая не даёт распространяться ивенту дальше по-дереву
modal.addEventListener('click', () => modal.style.display = 'none')
modalButton.forEach(el => el.addEventListener('click', event => event.stopPropagation()))
modalButtonRight.addEventListener('click', switchImageRight)
modalButtonLeft.addEventListener('click', switchImageLeft)




