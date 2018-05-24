let res = 100 //how many points plotted
let xmin = -10
let xmax = 10
let ymin = -10
let ymax = 10

focusRadius = 7

let fx, fy, dy, circx

//test
fx = 0
fy = 1
dy = -1
circx = 2

function setup() {
    createCanvas(400, 400);
    stroke(255)
    strokeWeight(1)
    fill(255)
    $('document').ready(function(){
        updateVars()
    })
}

function draw() {
    background(51);
    display(fx, fy, dy, circx)
    fp = toPixel(createVector(fx, fy))
    mouse = createVector(mouseX, mouseY)
    if (mouseIsPressed && mouseIsInWindow()){
        fp = mouse.copy()
        fc = toCoord(fp)
        fx = fc.x
        fy = fc.y
    }
    if (mouseIsIn()){
        fill(0,255,0)
    } else {
        fill(255)
    }
}

function mouseDragged(){
    fp = toPixel(createVector(fx, fy))
    mouse = createVector(mouseX, mouseY)
    if (mouseIsIn() && mouseIsInWindow() ){
        fp = mouse.copy()
        fc = toCoord(fp)
        fx = fc.x
        fy = fc.y
    }
}

function mouseIsInWindow(){
    return mouseX <= width && mouseX >=0 && mouseY <= height && mouseY >= 0
}

function mouseIsIn(){
    fp = toPixel(createVector(fx, fy))
    mouse = createVector(mouseX, mouseY)
    return p5.Vector.dist(fp, mouse) <= focusRadius
}

function updateVars(){
    dy = parseFloat($('#dy-in').val())
    $('#dy-out').html(dy)
    circx = parseFloat($('#circx-in').val())
    $('#circx-out').html(circx)
}

function toCoord(v) {
    x = map(v.x, 0, width, xmin, xmax)
    y = map(v.y, height, 0, ymin, ymax)
    return createVector(x, y)
}

function toPixel(v) {
    x = map(v.x, xmin, xmax, 0, width)
    y = map(v.y, ymin, ymax, height, 0)
    return createVector(x, y)
}

function replaceX(expression, x) {
    return expression.replace(/x/g, `(${x})`)
}

function graph(fstr) {
    let f
    if (typeof(fstr) == 'function'){
        f = fstr//fstr is a function in this case
    } else{
        f = function(x) {
            return math.eval(replaceX(fstr, x));
        }
    }

    //axes
    a = createVector(xmin, 0)
    b = createVector(xmax, 0)
    c = createVector(0, ymin)
    d = createVector(0, ymax)
    ap = toPixel(a)
    bp = toPixel(b)
    cp = toPixel(c)
    dp = toPixel(d)
    line(ap.x, ap.y, bp.x, bp.y)
    line(cp.x, cp.y, dp.x, dp.y)

    //plot
    let dx = (xmax - xmin) / res
    for (let x = xmin; x < xmax; x += dx) {
        v1Coord = createVector(x, f(x))
        v2Coord = createVector(x + dx, f(x + dx))
        v1Pixel = toPixel(v1Coord)
        v2Pixel = toPixel(v2Coord)
        line(v1Pixel.x, v1Pixel.y, v2Pixel.x, v2Pixel.y)
    }
}

function display(fx, fy, dy, circx){
    //vertex
    let vx = fx
    let vy = (fy+dy) / 2
    let a = 1 / (4 * (fy-vy))
    //func
    function f(x){
        return a*(x-vx)**2+vy
    }
    stroke(0, 255, 0)
    graph((x)=>dy)
    stroke(255)
    graph(f)
    fVec = createVector(fx, fy)
    fVecp = toPixel(fVec)
    push()
    noFill()
    circVec = createVector(circx, f(circx))
    circVecp = toPixel(circVec)
    circleRadius = p5.Vector.dist(circVecp, fVecp)
    stroke(255)
    ellipse(circVecp.x, circVecp.y, 2*circleRadius)
    pop()
    stroke(0, 255, 0)

    directrixIntersectVecp = toPixel(createVector(circx, dy))
    line(circVecp.x, circVecp.y, fVecp.x, fVecp.y)
    line(circVecp.x, circVecp.y, directrixIntersectVecp.x, directrixIntersectVecp.y)

    stroke(255)
    ellipse(fVecp.x, fVecp.y, 2*focusRadius)

}
