let res = 100 //how many points plotted
let xmin = -10
let xmax = 10
let ymin = -10
let ymax = 10

function setup() {
    createCanvas(400, 400);
    stroke(255)
    strokeWeight(1)
    noFill()
}

function draw() {
    background(51);
    graph('x^3+2*x^2-3*x+1')
    graph('x')
}

function toCoord(v) {
    let x = map(v.x, 0, width, xmin, xmax)
    let y = map(v.y, height, 0, ymin, ymax)
    return createVector(x, y)
}

function toPixel(v) {
    let x = map(v.x, xmin, xmax, 0, width)
    let y = map(v.y, ymin, ymax, height, 0)
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
    let a = createVector(xmin, 0)
    let b = createVector(xmax, 0)
    let c = createVector(0, ymin)
    let d = createVector(0, ymax)
    let ap = toPixel(a)
    let bp = toPixel(b)
    let cp = toPixel(c)
    let dp = toPixel(d)
    line(ap.x, ap.y, bp.x, bp.y)
    line(cp.x, cp.y, dp.x, dp.y)

    //plot
    let dx = (xmax - xmin) / res
    for (let x = xmin; x < xmax; x += dx) {
        let v1Coord = createVector(x, f(x))
        let v2Coord = createVector(x + dx, f(x + dx))
        let v1Pixel = toPixel(v1Coord)
        let v2Pixel = toPixel(v2Coord)
        line(v1Pixel.x, v1Pixel.y, v2Pixel.x, v2Pixel.y)
    }
}
