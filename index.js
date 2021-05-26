const backlogListEl = document.getElementById('backlog-list')
const progressListEl = document.getElementById('progress-list')
const completeListEl = document.getElementById('complete-list')
const onHoldListEl = document.getElementById('on-hold-list')

let backlogListArray = []
let completeListArray = []
let progressListArray = []
let onHoldListArray = []
let listArray = []

let updateOnLoad = false

function getSavedLocalStorage() {
    if (localStorage.getItem('backlogItems')) {
        backlogListArray = JSON.parse(localStorage.backlogItems)
        completeListArray = JSON.parse(localStorage.completeItems)
        progressListArray = JSON.parse(localStorage.progressItems)
        onHoldListArray = JSON.parse(localStorage.onHoldItems)
    } else {
        backlogListArray = ['Release course', 'Relax']
        progressListArray = ['Listen music', 'Work on tasks']
        completeListArray = ['Being cool', 'Finished one project']
        onHoldListArray = ['Being uncool']
    }
}

function updateDateLocalStorage() {
    listArray = [backlogListArray, progressListArray, completeListArray, onHoldListArray]
    const arrayNames = ['backlog', 'progress', 'complete', 'onHold']
    arrayNames.forEach((itemArray, index) => {
        localStorage.setItem(`${itemArray}Items`, JSON.stringify(listArray[index]))
    })
}

function updateDom() {
    if (!updateOnLoad) {
        getSavedLocalStorage()
    }
    backlogListEl.textContent = ''
    backlogListArray.forEach((backlogItem, index) => {
        createEl(backlogListEl, 0, backlogItem, index)
    })
    progressListEl.textContent = ''
    progressListArray.forEach((progressItem, index) => {
        createEl(progressListEl, 1, progressItem, index)
    })
    completeListEl.textContent = ''
    completeListArray.forEach((completeItem, index) => {
        createEl(completeListEl, 2, completeItem, index)
    })
    onHoldListEl.textContent = ''
    onHoldListArray.forEach((onHoldItem, index) => {
        createEl(onHoldListEl, 3, onHoldItem, index)
    })
    updateOnLoad = true
    updateDateLocalStorage()
}

function createEl(columnEl, column, item, index) {
    const listEl = document.createElement('li')
    listEl.classList.add('drag-item')
    listEl.textContent = item
    columnEl.appendChild(listEl)
}

updateDom()