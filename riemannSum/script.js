let fstr, start, end, size, option
$(document).ready(function() {
    updateGraph()
    $('input').change(updateGraph)
})
let res = 50 //how many points plotted
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
    $('#start-out').html(start)
    end = parseFloat($('#end-in').val())
    $('#end-out').html(end)
    size = parseFloat($('#size-in').val())
    option = $('#type-select').val()
    // console.log(fstr, start, end, size, option);
    if (size > 0 && start < end) {
        loop()
    }
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
    let xstep = (xmax - xmin) / res
    for (let x = xmin; x < xmax; x += xstep) {
        v1Coord = createVector(x, f(x))
        v2Coord = createVector(x + xstep, f(x + xstep))
        v1Pixel = toPixel(v1Coord)
        v2Pixel = toPixel(v2Coord)
        line(v1Pixel.x, v1Pixel.y, v2Pixel.x, v2Pixel.y)
    }

    //sum stuff
    let rsum = 0
    if (option == 'left') {
        for (let x = start; x < end; x += size) {
            v1Coord = createVector(x, f(x))
            v2Coord = createVector(x + size, 0)
            v1Pixel = toPixel(v1Coord)
            v2Pixel = toPixel(v2Coord)
            rect(v1Pixel.x, v1Pixel.y, v2Pixel.x, v2Pixel.y)
            rsum += f(x) * size
        }
    } else if (option == 'right') {
        for (let x = start + size; x <= end; x += size) {
            v1Coord = createVector(x - size, 0)
            v2Coord = createVector(x, f(x))
            v1Pixel = toPixel(v1Coord)
            v2Pixel = toPixel(v2Coord)
            rect(v1Pixel.x, v1Pixel.y, v2Pixel.x, v2Pixel.y)
            rsum += f(x) * size
        }
    } else if (option == 'midpoint') {
        for (let x = start + size / 2; x < end; x += size) {
            v1Coord = createVector(x - size / 2, f(x))
            v2Coord = createVector(x + size / 2, 0)
            v1Pixel = toPixel(v1Coord)
            v2Pixel = toPixel(v2Coord)
            rect(v1Pixel.x, v1Pixel.y, v2Pixel.x, v2Pixel.y)
            rsum += f(x) * size
        }
    } else if (option == 'trapezoid') {
        for (let x = start; x < end; x += size) {
            vertexCoords = [
                createVector(x, f(x)),
                createVector(x + size, f(x + size)),
                createVector(x + size, 0),
                createVector(x, 0)
            ]
            vertexPixels = vertexCoords.map(toPixel)
            beginShape()
            for (let vertexPixel of vertexPixels) {
                vertex(vertexPixel.x, vertexPixel.y)
            }
            endShape(CLOSE)
            rsum += 0.5 * (f(x) + f(x + size)) * size
        }
    }

    // //calculate integral
    // let isum = 0
    // let dx = .001
    // for (let x = start; x < end; x += dx) {
    //     isum += 0.5 * (f(x) + f(x+dx)) * dx
    // }

    //print sum and integral value
    $('#out').html(`<p>Riemann sum: ${rsum}</p>`)//<br>Integral: ${isum}</p>`)
}
