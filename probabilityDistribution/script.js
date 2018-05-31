let res = 100 //how many points plotted
let xmin = -3
let xmax = 3
let ymin = -1
let ymax = 1

let statmul = 100

let coef
let arr = []//will contain discrete normal simulated data values with
//mean = 0, stdev = 1
let newArr = []

function setup() {
    createCanvas(400, 400);
    stroke(255)
    strokeWeight(1)
    coef = 1/sqrt(TWO_PI)
    for(let x = xmin; x <= xmax; x += .1){
        for(let i = 0; i < statmul; i++){
            if(random() < normpdf(x)){
                arr.push(x)
            }
        }
    }
    // console.log(arr)
    noFill()
}

function draw() {
    background(51);
    stroke(255)
    strokeWeight(1)
    graph(normpdf)
    if(arr.length){
        newArr.push(arr.splice(Math.floor(random()*arr.length), 1)[0])
    }
    stroke(0,255,0)
    strokeWeight(3)
    graphDistribution(newArr)
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

function normpdf(x){
    return coef*exp(-1*x*x/2)
}

function graphDistribution(arr){
    let freqs = new Map()
    // console.log(arr)
    for(let x of arr){
        if(!freqs.has(x)){
            // console.log(x);
            freqs.set(x, 1)
        } else {
            // console.log(freqs.get(x));
            freqs.set(x, freqs.get(x)+1)//freqs[x]++
            // console.log(freqs.get(x));
        }
    }
    // console.log(freqs)
    for(let keyValPair of freqs){
        let x = keyValPair[0]
        let height = keyValPair[1]/statmul//renormalize
        let p = createVector(x, height)
        let pp = toPixel(p)
        point(pp.x, pp.y)
    }
}
