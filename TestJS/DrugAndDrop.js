class BoardManager {
    constructor() {
        this.addBtns = document.querySelectorAll('.board-add_btn');
        this.sectionOl = document.querySelector('.section-ol');
        this.boardOl = document.querySelectorAll('.board-ol');

        this.sectionOl.addEventListener('click', this.handleSectionOlClick.bind(this));
        this.boardOl.forEach(ol => {
            ol.addEventListener('drop', this.drop.bind(this));
            ol.addEventListener('dragover', (event) => {
                event.preventDefault()
            })
        })

        // Добавление карточек
        this.addBtns.forEach(btn => btn.addEventListener('click', this.handleAddClick.bind(this)))

        // Восстановление данных из localStorage при загрузке страницы
        this.restoreDataFromLocalStorage()

        this.setupDraggable()
    }

    setupDraggable() {
        const boardLiElements = document.querySelectorAll('.board-li')
        boardLiElements.forEach((boardLi) => {
            boardLi.ondragstart = (event) => {
                event.dataTransfer.setData('id', boardLi.id)
            }
        })
    }

    // Генерация уникального ID для элемента
    generateUniqueId() {
        return `boardLi_${new Date().getTime()}`
    }

    // Сохранение элемента в localStorage
    saveElementToLocalStorage(element) {
        console.log(element)
        const elementAsString = JSON.stringify({
            tagName: element.tagName,
            innerHTML: element.outerHTML
        })


        localStorage.setItem(element.id, elementAsString)
    }

    // Восстановление данных из localStorage
    restoreDataFromLocalStorage() {
        const keys = Object.keys(localStorage)

        this.boardOl.forEach((ol) => {
            keys.forEach(key => {
                const storedData = localStorage.getItem(`${key}`)
                const parsedData = JSON.parse(storedData)

                const liId = ol.closest('.section-li').id

                if (storedData && parsedData.sectionLiId === liId) {
                    ol.innerHTML += parsedData.innerHTML
                }
            })
        })
    }

    handleAddClick(event) {
        event.stopPropagation()
        const boardOL = event.currentTarget.closest('.section-li').querySelector('.board-ol')

        const itemId = this.generateUniqueId()

        boardOL.insertAdjacentHTML('beforeend', `
            <li class="board-li" draggable="true" id="${itemId}">
                <p class="board-li_p"></p>
                <form class="form" action="">
                    <textarea class="input-area"></textarea>            
                </form>
            </li>
        `)

        const newBoardLi = boardOL.lastElementChild
        newBoardLi.ondragstart = (event) => {
            event.dataTransfer.setData('id', newBoardLi.id)
        }

        const currentAddBtn = event.currentTarget
        const switchedBlock = event.currentTarget.parentNode.querySelector('.board-add_switched')
        currentAddBtn.style.display = 'none'
        switchedBlock.style.display = 'flex'

        // Сохранение нового элемента в localStorage
        /*this.saveElementToLocalStorage(newBoardLi)*/
    }

    handleSectionOlClick(event) {
        const clickedElement = event.target
        event.stopPropagation()

        const sectionLi = clickedElement.closest('.section-li')

        if (sectionLi) {
            const addACard = sectionLi.querySelector('.board-add_btn')
            const switchBlock = sectionLi.querySelector('.board-add_switched')
            const boardOl = sectionLi.querySelector('.board-ol')

            if (clickedElement.classList.contains('board-add_switched-btn1')) {
                const p = sectionLi.querySelectorAll('.board-li_p')

                p.forEach(el => {

                    const area = el.parentNode.querySelector('.input-area')

                    if (area.value === '') {
                        addACard.style.display = 'none'
                        switchBlock.style.display = 'flex'
                    } else {
                        el.innerHTML = area.value
                        area.style.display = 'none'
                        el.style.display = 'block'

                        /*this.saveElementToLocalStorage(el)*/
                        console.log(el.closest('.section-li').id)
                        const elementAsString = JSON.stringify({
                            tagName: el.tagName,
                            innerHTML: el.parentNode.outerHTML,
                            sectionLiId: el.closest('.section-li').id
                        })

                        localStorage.setItem(`p_${el.parentNode.id}`, `${elementAsString}`)

                        addACard.style.display = 'block'
                        switchBlock.style.display = 'none'
                    }

                    const boardLI = boardOl.querySelector('.board-li')
                    if (el.style.display === 'block') boardLI.draggable = true
                })
            }

            if (clickedElement.classList.contains('board-add_switched-btn2')) {
                const boardOl = sectionLi.querySelector('.board-ol')
                boardOl.lastElementChild.remove()

                addACard.style.display = 'block'
                switchBlock.style.display = 'none'
            }
        }
    }

    drop(event) {
        let item = event.dataTransfer.getData('id')
        const boardLi = document.getElementById(item)

        if (boardLi) {
            const storedData = localStorage.getItem(`p_${boardLi.id}`)
            const parsedData = JSON.parse(storedData)
            const newData = JSON.stringify({
                ...parsedData,
                sectionLiId: event.target.closest('.section-li').id
            })

            localStorage.setItem(`p_${boardLi.id}`,`${newData}`)

            if (event.target.className !== 'board-li_p') {
                event.target.append(boardLi)
            }
        }
    }
}

const boardManager = new BoardManager()









