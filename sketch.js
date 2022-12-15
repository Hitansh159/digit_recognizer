
function setup() {
    let c = createCanvas(500,500);
    c.parent("drawboard")
    background(0);

    document.getElementById("clear").onclick = () => background(0);
}

function draw(){
    stroke(255);
    if (mouseIsPressed === true) {
        strokeWeight(25);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}