//make divs draggable
let draggableElement = document.getElementsByClassName("movable")
for (let divCount = 0; divCount < draggableElement.length ; divCount++) {
    // dragDiv(document.getElementById("div" + divCount));
    dragDiv(draggableElement[divCount]);
}

function dragDiv(element){
    let divX = 0, divY = 0, mouseX = 0, mouseY = 0;

    if (document.getElementById(element.id + "header")) {
        document.getElementById(element.id + "header").onmousedown = dragMouseDown;
    } else{
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        //e.preventDefault()
        //mouse Cursor position at start
        mouseX = parseInt(e.clientX);
        mouseY = parseInt(e.clientY);
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        return false;
    }

    function elementDrag(e) {
        e = e || window.event;
        //e.preventDefault();
        //calculate new cursor position
        divX = mouseX - parseInt(e.clientX);
        divY = mouseY - parseInt(e.clientY);
        mouseX = parseInt(e.clientX);
        mouseY = parseInt(e.clientY);
        //set new div position
        element.style.top = (element.offsetTop - divY) + "px";
        console.log(element.offsetTop);
        element.style.left = (element.offsetLeft - divX) + "px";
    }

    function closeDragElement() {
        //stops moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }
}