const movementBlock = document.querySelector('.move_block')
const movementBlockText = document.querySelector('.move_block__text')
const movementBlockRight = document.querySelector('.move_block--button.right')
const movementBlockLeft = document.querySelector('.move_block--button.left')
const movementBlockUp = document.querySelector('.move_block--button.up')
const movementBlockDown = document.querySelector('.move_block--button.down')

movementBlockText.addEventListener('click', () => {
    movementBlock.style.left = '39vw'
    movementBlock.style.top = '38vh'
})

movementBlockRight.addEventListener('click', () => {movementBlock.style.left = '78vw'})
movementBlockLeft.addEventListener('click', () => {movementBlock.style.left = '0vw'})
movementBlockUp.addEventListener('click', () => movementBlock.style.top = '0vh')
movementBlockDown.addEventListener('click', () => movementBlock.style.top = '64.5vh')








