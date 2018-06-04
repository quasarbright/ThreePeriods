let res = 100 //how many points plotted
let xmin = -10
let xmax = 10
let ymin = -10
let ymax = 10

let checks = {
    sin:false,
    cos:false,
    tan:false,
    cot:false,
    sec:false,
    csc:false
}
let theta = 1.05
let radius = 5

function setup() {
    createCanvas(400, 400);
    stroke(255)
    strokeWeight(1)
    noFill()
    $('document').ready(function(){
        updateVars()
    })
}

function draw() {
    background(128);
    stroke(255)
    graph('0')
    origin = createVector(0,0)
    originp = toPixel(origin)
    p = p5.Vector.fromAngle(theta).mult(radius)
    pp = toPixel(p)
    xShadow = createVector(p.x, 0)
    xShadowp = toPixel(xShadow)
    yShadow = createVector(0, p.y)
    yShadowp = toPixel(yShadow)
    tanPoint = createVector(p.x + p.y*p.y/p.x, 0)
    tanPointp = toPixel(tanPoint)
    cotPoint = createVector(0, p.y + p.x*p.x/p.y)
    cotPointp = toPixel(cotPoint)

    secPoint = createVector(tanPoint.x, 0)
    cscPoint = createVector(0, cotPoint.y)

    secPointp = toPixel(secPoint)
    cscPointp = toPixel(cscPoint)

    if(checks.sin){
        stroke('#ff0000')
        line(xShadowp.x, xShadowp.y, pp.x, pp.y)
    }
    if(checks.cos){
        stroke('orange')
        line(yShadowp.x, yShadowp.y, pp.x, pp.y)
    }
    if(checks.tan){
        stroke('purple')
        line(pp.x, pp.y, tanPointp.x, tanPointp.y)
    }
    if(checks.cot){
        stroke('DeepPink')
        line(pp.x, pp.y, cotPointp.x, cotPointp.y)
    }
    if(checks.sec){
        stroke('blue')
        line(originp.x, originp.y, secPointp.x, secPointp.y)
    }
    if(checks.csc){
        stroke('#00ff00')
        line(originp.x, originp.y, cscPointp.x, cscPointp.y)
    }
    //draw circle
    drawArc(radius, 0, 7)
    //draw point
    push()
    fill(255)
    stroke(255)
    line(originp.x, originp.y, pp.x, pp.y)
    ellipse(pp.x, pp.y, 5)
    pop()

    noLoop()
}

function updateVars(){
    checks.sin = $('#sin-check').prop('checked')
    checks.cos = $('#cos-check').prop('checked')
    checks.tan = $('#tan-check').prop('checked')
    checks.cot = $('#cot-check').prop('checked')
    checks.sec = $('#sec-check').prop('checked')
    checks.csc = $('#csc-check').prop('checked')
    theta = $('#theta-in').val()
    $('#theta-out').html(`${theta}`)
    loop()
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

//in radians
function drawArc(rad, startAngle, endAngle){
    let minAngle = min(startAngle, endAngle)
    let maxAngle = max(startAngle, endAngle)
    push()
    strokeWeight(1)
    stroke(255)
    let dtheta = .05
    for(let theta = minAngle; theta < maxAngle; theta += dtheta){
        let vec1 = p5.Vector.fromAngle(theta).mult(rad)
        let vec1p = toPixel(vec1)
        let vec2 = p5.Vector.fromAngle(theta+dtheta).mult(rad)
        let vec2p = toPixel(vec2)
        line(vec1p.x, vec1p.y, vec2p.x, vec2p.y)
    }
    pop()
}
