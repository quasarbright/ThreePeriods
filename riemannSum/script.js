let fstr, start, end, size, option
$(document).ready(function(){
    fstr = $('#function-in').val()
    start = parseFloat($('#start-in').val())
    end = parseFloat($('#end-in').val())
    size = parseFloat($('#size-in').val())
    option = $('#type-select').val()

    $('input').change(function(){
        updateGraph()
    })
})
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
    rectMode(CORNERS)
}

function draw() {
    background(51);
    graph(fstr, start, end, size, option)
    noLoop()
}

function updateGraph() {
    fstr = $('#function-in').val()
    start = parseFloat($('#start-in').val())
    end = parseFloat($('#end-in').val())
    size = parseFloat($('#size-in').val())
    option = $('#type-select').val()
    // console.log(fstr, start, end, size, option);
    loop()
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
    return expression.replace(/x/g, x)
}

function graph(fstr, start, end, size, option) {
    //func
    function f(x) {
        return math.eval(replaceX(fstr, x));
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

    //sum stuff
    if(option == 'left'){j = 9
        for(let x = start; x < end; x += size){
            v1Coord = createVector(x, f(x))
            v2Coord = createVector(x + size, 0)
            v1Pixel = toPixel(v1Coord)
            v2Pixel = toPixel(v2Coord)
            rect(v1Pixel.x, v1Pixel.y, v2Pixel.x, v2Pixel.y)
        }
    } else if(option == 'right'){
        for(let x = start + size; x <= end; x += size){
            v1Coord = createVector(x-size, 0)
            v2Coord = createVector(x, f(x))
            v1Pixel = toPixel(v1Coord)
            v2Pixel = toPixel(v2Coord)
            rect(v1Pixel.x, v1Pixel.y, v2Pixel.x, v2Pixel.y)
        }
    }
    //print sum value
}
