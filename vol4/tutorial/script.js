//Tutorial: https://www.youtube.com/watch?v=jfYWwQrtzzY
const containers = document.querySelectorAll('.container');

let divNumber = 5;

function initialize() {
    let draggables = document.querySelectorAll('.draggable');


    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        })

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        })
    })

    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
            let afterElement = getDragAfterElement(container, e.clientY);
            let draggable = document.querySelector('.dragging');
            if (afterElement == null) {
                container.appendChild(draggable);
            } else {
                container.insertBefore(draggable, afterElement);
            }
        })
    })
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        let box = child.getBoundingClientRect();
        let offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

function newChild() {
    let newElement = document.createElement('div');
    newElement.classList.add('draggable');
    newElement.setAttribute("draggable", "true");
    document.getElementById("firstContainer").appendChild(newElement);
    //one div added
    divNumber++;
    initialize();
}

/*locks a div*/
function lock(e) {
    let lockButton = e.target;
    if (lockButton.parentElement.getAttribute("draggable") === "true") {
        lockButton.style.backgroundColor = "red";
        lockButton.parentElement.setAttribute("draggable", "false");
    } else if (lockButton.parentElement.getAttribute("draggable") === "false") {
        lockButton.style.backgroundColor = "gray";
        lockButton.parentElement.setAttribute("draggable", "true");
    }
}

/*evenListener on "trashcan" calls removeDiv()*/
document.getElementById("trashcan").addEventListener("drop", removeDiv);

/*deletes div*/
function removeDiv(e) {
    e.preventDefault();
    /*variable stores the currently dragged div*/
    let draggedDiv = document.querySelector('.dragging');
    draggedDiv.remove();
}

/*starts initialize function*/
initialize();