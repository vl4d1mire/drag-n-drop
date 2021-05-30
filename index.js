const backlogListEl = document.getElementById('backlog-list')
const progressListEl = document.getElementById('progress-list')
const completeListEl = document.getElementById('complete-list')
const onHoldListEl = document.getElementById('on-hold-list')
const listColumns = document.querySelectorAll('.drag-item-list')

let backlogListArray = []
let completeListArray = []
let progressListArray = []
let onHoldListArray = []
let listArray = []

let updateOnLoad = false

// Drag functionality
let draggedItem
let currentColumn
let dragging = false

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

function filterArray(arr) {
    return arr.filter(i => i !== null)
}

function updateDom() {
    if (!updateOnLoad) {
        getSavedLocalStorage()
    }
    backlogListEl.textContent = ''
    backlogListArray.forEach((backlogItem, index) => {
        createEl(backlogListEl, 0, backlogItem, index)
    })
    backlogListArray = filterArray(backlogListArray)
    progressListEl.textContent = ''
    progressListArray.forEach((progressItem, index) => {
        createEl(progressListEl, 1, progressItem, index)
    })
    progressListArray = filterArray(progressListArray)
    completeListEl.textContent = ''
    completeListArray.forEach((completeItem, index) => {
        createEl(completeListEl, 2, completeItem, index)
    })
    completeListArray = filterArray(completeListArray)
    onHoldListEl.textContent = ''
    onHoldListArray.forEach((onHoldItem, index) => {
        createEl(onHoldListEl, 3, onHoldItem, index)
    })
    onHoldListArray = filterArray(onHoldListArray)
    updateOnLoad = true
    updateDateLocalStorage()
}

function createEl(columnEl, column, item, index) {
    const listEl = document.createElement('li')
    listEl.classList.add('drag-item')
    listEl.id = index
    listEl.textContent = item
    listEl.draggable = true
    listEl.setAttribute('ondragstart', 'drag(event)')
    columnEl.appendChild(listEl)
}

// When Item starts Dragging
function drag(e) {
    draggedItem = e.target
    dragging = true
}

// Column allows Item to drop
function allowDrop(e) {
    e.preventDefault()
}

// Dropping Item to Column
function drop(e) {
    e.preventDefault()
    listColumns.forEach(column => column.classList.remove('over'))
    const parent = listColumns[currentColumn]
    parent.appendChild(draggedItem)
    dragging = false
}

// When Item enter Column area
function dragEnter(column) {
    listColumns[column].classList.add('over')
    currentColumn = column
}

updateDom()