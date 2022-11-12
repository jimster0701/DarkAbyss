/**
 * Editors:
 *      James Palmer-Moore
 *      Joe Baker
 * Created: 
 *      11/11/2022
 */


/* Gloabals */
const mainCanvas = document.getElementById("mainCanvas");
const ctx = mainCanvas.getContext("2d");
const canvasContainer = document.getElementsByClassName("Canvas-Container");
const roomSize = 5760; // def: 1920


/* Setup */
ctx.lineWidth = 2;
ctx.strokeRect(0, 0, roomSize, 1080);


/* Room Functions */
function shape(coordinates, fill) {
    ctx.beginPath();
    ctx.moveTo(coordinates[0][0], coordinates[0][1]);
    for (let i = 1; i < coordinates.length; i++) {
        ctx.lineTo(coordinates[i][0], coordinates[i][1]);
    }
    ctx.stroke();
    ctx.fillStyle = fill;
    ctx.fill();
}
shape([[200, 0], [(roomSize - 200), 0], [(roomSize - 200), 800], [200, 800]], "rgba(25, 25, 25, 0.5)"); // Back wall
shape([[0, 0], [200, 0], [200, 800], [0, 1080]], "rgba(50, 50, 50, 0.5)"); // Left wall
shape([[roomSize, 0], [(roomSize - 200), 0], [(roomSize - 200), 800], [roomSize, 1080]], "rgba(50, 50, 50, 0.5)"); // Right wall
shape([[200, 800], [(roomSize - 200), 800], [roomSize, 1080], [0, 1080]], "rgba(20, 20, 20, 0.5)"); // Floor


function table(offset=0) {
    shape([[offset+500, 600], [offset+1420, 600], [offset+1570, 850], [offset+350, 850]], "rgba(100, 100, 100, 1)"); // Table Top
    shape([[offset+360, 875], [offset+410, 875], [offset+410, 1080], [offset+360, 1080]], "rgba(100, 100, 100, 1)"); // Table Leg 1
    shape([[offset+1510, 875], [offset+1560, 875], [offset+1560, 1080], [offset+1510, 1080]], "rgba(100, 100, 100, 1)"); // Table Leg 2
    shape([[offset+350, 850], [offset+1570, 850], [offset+1570, 875], [offset+350, 875]], "rgba(10, 10, 10, 1)"); // Table 3d/bottom
}

let noTables = roomSize / 1920;
for (let i = 0; i < noTables; i++) table(1920*i);


function scroll(event) {
    let left = parseInt(canvasContainer[0].style.left.slice(0,-2));

    if(left == 0 && event.deltaY > 0)
        return;
    if(left == -3800 && event.deltaY < 0)
        return;

    if(left>0) // Extra checks due to bug
        canvasContainer[0].style.left = "0px";
    else if (left<(1000-(roomSize-(1920)/2)))
        canvasContainer[0].style.left = "-3700px";

    else 
        canvasContainer[0].style.left = (left+event.deltaY)+"px";
}

var mousewheelEvent=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";

if(document.attachEvent)
    document.attachEvent("on"+mousewheelEvent, function(e){scroll(e)});
else if (document.addEventListener)
    document.addEventListener(mousewheelEvent,  function(e){scroll(e)}, false);
