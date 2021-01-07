/*tutorials used:
"https://www.kirupa.com/html5/drag.htm" + comment section
"https://www.kirupa.com/html5/handling_events_for_many_elements.htm"
TODO: look at magnet.js & interact.js snapping grids
TODO also look into: https://stackoverflow.com/questions/2973407/javascript-jquery-how-to-do-snapping-drag-and-drop
*/

//stores the div containing the draggable item
let container = document.getElementById("dragDiv");
//current div is saved here
let activeItem = null;

//false when unused; set to true while in use
let active = false;

// event listeners
//event listeners are attached to container, not dragItem!! if it would be attached to dragItem we would stop dragging the item when the mouse leaves it
container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mousemove", drag, false);
container.addEventListener("mouseup", dragEnd, false);
//event listeners for touch
container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchmove", drag, false);
container.addEventListener("touchend", dragEnd, false);


//3 functions for dragging:
//sets initial coordinates
function dragStart(e) {

    if (e.target !== e.currentTarget) {
        active = true;

        //item we interact with
        activeItem = e.target;

        //checks if activeItem actually exists
        if (activeItem !== null) {
            //if activeItem.xOffset doesnt exist set to 0
            if(!activeItem.xOffset) {
                activeItem.xOffset = 0;
            }
            //if activeItem.yOffset doesnt exist set to 0
            if(!activeItem.yOffset) {
                activeItem.yOffset = 0;
            }
            //sets initial Position; needs different parameters for touch/mouse use
            if (e.type === "touchstart") {
                //for touch use only
                activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
                activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
            } else {
                //for mouse use only
                activeItem.initialX = e.clientX - activeItem.xOffset;
                activeItem.initialY = e.clientY - activeItem.yOffset;
            }
        }
    }
}

//sets current coordinates
function drag(e) {
    //checks for letiable set in startDrag function
    if (active) {

        e.preventDefault();

        //sets current position; again, different parameters for touch/mouse use
        if (e.type === "touchmove") {
            //for touch use only
            activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
            activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
        } else {
            //for mouse use only
            activeItem.currentX = e.clientX - activeItem.initialX;
            activeItem.currentY = e.clientY - activeItem.initialY;
        }

        //sets xOffset & yOffset to current Position; this makes sure the next time we start dragging we start were we left off
        activeItem.xOffset = activeItem.currentX;
        activeItem.yOffset = activeItem.currentY;

        //calls function setTranslate
        setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
    }
}

//sets the new position for our dragged item; this function actually moves the item (changes position in CSS)
function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

//sets "finished position" as new initial position
function dragEnd(e) {
    //checks if activeItem actually exists
    if (activeItem !== null) {
        // roundNumbers();
        activeItem.initialX = activeItem.currentX;
        activeItem.initialY = activeItem.currentY;
    }

    //sets dragging to no longer be active
    active = false;
    activeItem = null;
}

/*functionality:
* 1. get mainDiv width and height
* 2. magnetic spots will be at x = n/divWidth and y = n/divHeight for  n from 1 to 4
* */
function roundNumbers() {
    //store dragDivs height and width
    let dragDivHeight = document.getElementById("dragDiv").clientHeight;
    let dragDivWidth = document.getElementById("dragDiv").clientWidth;

    //new letiables to not overwrite currentX & currentY
    let tempX = activeItem.currentX;
    let tempY = activeItem.currentY;

    //console.log("currentX: " + activeItem.currentX + " & currentY: " + activeItem.currentY);

    //for loops to navigate through magnet spot pattern
    /*for (let row = 1; row <= 4; row++) {
        for (let column = 1; column <= 4; column ++) {

            if(/!*tempX > row/4 * dragDivWidth - (row/4 * dragDivWidth)/2
                && tempX < row/4 * dragDivWidth + (row/4 * dragDivWidth)/2
                && tempY > column/4 * dragDivHeight - (column/4 * dragDivHeight)/2
                && tempY < column/4 * dragDivHeight + (column/4 * dragDivHeight)/2*!/
                activeItem.currentX > dragDivWidth/2
            ) {
                tempX = row/4 * dragDivWidth;
                tempY = column/4 * dragDivHeight;
            }
        }
    }*/

    if(tempX > dragDivWidth/2) {
        tempX = dragDivWidth * 3/4;
        tempY = dragDivHeight * 3/4;
    }

    console.log("divWidth: " + dragDivWidth + " & " + "divHeight: " + dragDivHeight);
    //console.log("tempX: " + tempX + " & " + "tempY: " + tempY);
    //console.log(activeItem);
    /*activeItem.currentX = tempX;
    activeItem.currentY = tempY;*/
    activeItem.initialX = tempX;
    activeItem.initialY = tempY;
    setTranslate(tempX, tempY, activeItem);
}