//event listener to remove divs
document.getElementById("bigDiv").addEventListener("click", removeChild, false);

//divCount to set max amount of divs
let divCount = 4;
//creates new divs when button is clicked
function newChild() {
    //max div amount is 16
    if(divCount < 16) {
        let newElement = document.createElement('div');
        newElement.classList.add('subDivs');
        document.getElementById("bigDiv").appendChild(newElement);
        //one div added
        divCount++;
    }
    else {
        alert("Too many divs already!")
    }

}

let activeItem = null;

//when a div is clicked it is deleted
function removeChild(e) {
    //checks if function is called
    //console.log("Hello!");
    if(e.target !== e.currentTarget) {
        activeItem = e.target;
        activeItem.remove();
        //one div removed
        divCount--;
    }
    console.log(divCount);
}