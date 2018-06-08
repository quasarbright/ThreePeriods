let xmin = -10
let xmax = 10
let ymin = -10
let ymax = 10

let a, b, c, d, e, f

function updateVars(){
    a = parseFloat($('#a-in').val())
    $('#a-out').html(`${a.toFixed(2)}`)
    b = parseFloat($('#b-in').val())
    $('#b-out').html(`${b.toFixed(2)}`)
    $('#z1-out').html(`${a.toFixed(2)} + ${b.toFixed(2)}i`)
    c = parseFloat($('#c-in').val())
    $('#c-out').html(`${c.toFixed(2)}`)
    d = parseFloat($('#d-in').val())
    $('#d-out').html(`${d.toFixed(2)}`)
    $('#z2-out').html(`${c.toFixed(2)} + ${d.toFixed(2)}i`)
    product = complexProduct(a, b, c, d)
    e = product[0].toFixed(2)
    f = product[1].toFixed(2)
    $('#product-out').html(`product: ${e} + ${f}i`)
    loop()
}

function setup() {
    createCanvas(400, 400);
    stroke(255)
    strokeWeight(10)
    noFill()
    $('document').ready(function(){
        updateVars()
    })
    noLoop()
}

function draw() {
    background(51);
    if (a !== undefined){
        graph()

        z1Vec = createVector(a, b)
        z1Vecp = toPixel(z1Vec)
        stroke(255, 0, 0)
        strokeWeight(1)
        drawVec(createVector(0,0), z1Vec)

        z2Vec = createVector(c, d)
        z2Vecp = toPixel(z2Vec)
        stroke(0, 255, 0)
        strokeWeight(1)
        drawVec(createVector(0,0), z2Vec)
        drawVec(z1Vec, z2Vec)
        strokeWeight(10)
        point(z2Vecp.x, z2Vecp.y)

        //need to draw red dot after the lines
        stroke(255, 0, 0)
        strokeWeight(10)
        point(z1Vecp.x, z1Vecp.y)

        productVec = createVector(e, f)
        productVecp = toPixel(productVec)
        strokeWeight(10)
        stroke(128, 0, 128)
        point(productVecp.x, productVecp.y)

    }
    noLoop()
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

function drawVec(start, vec){
    sum = p5.Vector.add(start, vec)
    startp = toPixel(start)
    sump = toPixel(sum)
    line(startp.x, startp.y, sump.x, sump.y)
}

function graph() {

    strokeWeight(1)
    stroke(255)

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
}

function complexProduct(a, b, c, d){
    return [a+c, b+d]
}
