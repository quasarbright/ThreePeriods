let res = 100 //how many points plotted
let xmin = -10
let xmax = 10
let ymin = -10
let ymax = 10

let fstr, degree, center, t//t is the taylor polynomail function

function setup() {
    createCanvas(400, 400);
    stroke(255)
    strokeWeight(1)
    noFill()
    $(document).ready(function(){
        updateVars()
    })
}

function draw() {
    background(51);
    if (t !== undefined && fstr !== undefined) {
        graph(fstr)
        graph(t)
    }
    noLoop()
}

function updateVars(){
    fstr = $('#function-in').val()
    function f(x){
        return math.eval(replaceX(fstr, x))
    }
    degree = parseInt($('#degree-slider').val())
    $('#degree-out').html(''+degree)
    center = parseFloat($('#center-slider').val())
    $('#center-out').html(''+center)
    t = taylorPolynomial(f, degree, center)
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
    return expression.replace(/x/g, `(${x})`)
}

function graph(f_) {
    //func
    let f
    if(typeof(f_) === "string"){
        f = function(x) {
            return math.eval(replaceX(fstr, x));
        }
    } else if(typeof(f_) === "function") {
        f = f_
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

function graphTaylor(fstr, degree, center){
    graph(fstr)
    function f(x) {
        return math.eval(replaceX(fstr, x))
    }
    // now you know f(x). Now just build a generalized taylor series in terms of f, degree, and center
    // you'll need to do the nth derivative and loop a summation of functions. that's hard

}

/*
return the df/dx as a function
*/
function derivative(f){
    return function(x){
        return (f(x+.01)-f(x)) / .01
    }
}

function nthDerivative(f, n){
    fclone = f.clone()
    for(let i = 0; i < n;i++){
        fclone = derivative(fclone.clone())
    }
    return fclone
}

function firstNDerivatives(f, n){
    derivatives = [f.clone()]
    fclone = f.clone()
    for(let i = 0; i < n;i++){
        fclone = derivative(fclone.clone())
        derivatives.push(fclone)
    }
    return derivatives
}

/*
returns taylor polynomial as a function
*/
function taylorPolynomial(f, degree, center){
    derivatives = firstNDerivatives(f, degree)
    coefficients = []
    for(let i = 0; i <= degree;i++){
        coefficients.push(derivatives[i](center)/math.factorial(i))
    }

    function g(x){
        let ans = 0
        for(let i = 0; i <= degree; i++){
            ans += coefficients[i] * (x - center)**i
        }
        return ans
    }

    return g
}
