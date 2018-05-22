let res = 100 //how many points plotted
let xmin = -10
let xmax = 10
let ymin = -10
let ymax = 10

let dydx, pinitial, p, dx


function setup() {
    createCanvas(400, 400);
    stroke(255)
    strokeWeight(1)
    noFill()
    $('document').ready(updateVars)
    $('input').change(updateVars)
    frameRate(5)
    background(51);
}

function draw() {
    strokeWeight(5)
    // if(pinitial){
    //     p = pinitial.copy()
    // }
    if(p){
        if (isInBounds(p)){
            pp = toPixel(p)
            point(pp.x, pp.y)
            p.y += dx * dydxfunc(p.x, p.y)
            p.x += dx
        } else {
            dx = -dx
            p = pinitial.copy()
        }
    }
    strokeWeight(1)
    graphAxes()
}

function updateVars(){
    background(51)
    dydxstr = $('#dydx-in').val()
    dydxfunc = function(x, y){
        return math.eval(replaceXY(dydxstr, x, y))
    }
    x = parseFloat($('#x-in').val())
    y = parseFloat($('#y-in').val())
    pinitial = createVector(x, y)
    p = pinitial.copy()
    dx = parseFloat($('#dx-in').val())
    frameRate(2/dx)
}

function isInBounds(v){
    return v.x >= xmin && v.x <= xmax && v.y >= ymin && v.y <= ymax
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

function replaceXY(expression, x, y) {
    ans = expression.replace(/x/g, `(${x})`)
    ans = ans.replace(/y/g, `(${y})`)
    return ans
}

function graphAxes() {
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
}
