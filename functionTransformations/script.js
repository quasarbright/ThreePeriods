let res = 100 //how many points plotted
let xmin = -10
let xmax = 10
let ymin = -10
let ymax = 10

let f, fstr, transformationType, arg

function setup() {
    createCanvas(400, 400);
    stroke(255)
    strokeWeight(1)
    noFill()
    $('document').ready(function(){
        updateVars()
    })
}

function updateVars(){
    $('document').ready(function(){
        fstr = $('#function-in').val()
        f = function(x){
            return math.eval(replaceX(fstr, x))
        }
        transformationType = $('#type-select').val()
        arg = parseFloat($('#arg-in').val())
        $('#f-out').html(fstr)
        loop()
    })
}

function updateSelect(){
    transformationType = $('#type-select').val()
    console.log(transformationType)
    if(transformationType === 'reflect along y axis' || transformationType === 'reflect along x axis'){
        $('#arg-in').prop('disabled', true)
    } else {
        $('#arg-in').prop('disabled', false)
    }
}

function apply(){
    transformationType = $('#type-select').val()
    arg = parseFloat($('#arg-in').val())
    fstr = stringTransform(fstr, transformationType, arg)
    // f = transform(f, transformationType, arg)
    f = function(x){
        return math.eval(replaceX(fstr, x))
    }
    $('#f-out').html(fstr)
    loop()
}

function draw() {
    background(51);
    if(f !== undefined){
        graph(f)
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

Function.prototype.clone = function() {
    var that = this;
    var temp = function temporary() {
        return that.apply(this, arguments);
    };
    for (var key in this) {
        if (this.hasOwnProperty(key)) {
            temp[key] = this[key];
        }
    }
    return temp;
};

function stringTransform(fstr, transformationType, arg) {
    let newfstr = ''
    if (transformationType === 'vertical stretch') {
        newfstr = `${arg}*(${fstr})`
    } else if (transformationType === 'horizontal stretch') {
        newfstr = replaceX(fstr, `x/${arg}`)
    } else if (transformationType === 'horizontal translation') {
        newfstr = replaceX(fstr, `x-${arg}`)
    } else if (transformationType === 'vertical translation') {
        newfstr = `${fstr}+${arg}`
    } else if (transformationType === 'reflect along y axis') {
        newfstr = replaceX(fstr, `-1*x`)
    } else if (transformationType === 'reflect along x axis') {
        newfstr = `-1*(${fstr})`
    }
    return newfstr
}

function transform(f, transformationType, arg) {
    let g
    let fclone = f.clone()
    if (transformationType === 'vertical stretch') {
        g = (x) => arg * fclone(x)
    } else if (transformationType === 'horizontal stretch') {
        g = (x) => fclone(x/arg)
    } else if (transformationType === 'horizontal translation') {
        g = (x) => fclone(x-arg)
    } else if (transformationType === 'vertical translation') {
        g = (x) => fclone(x) + arg
    } else if (transformationType === 'reflect along y axis') {
        g = (x) => fclone(-1*x)
    } else if (transformationType === 'reflect along x axis') {
        g = (x) => -1*fclone(x)
    }
    return g
}


function graph(fstr) {
    let f
    if (typeof(fstr) == 'function') {
        f = fstr //fstr is a function in this case
    } else {
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
