let fstr, x

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
    $(document).ready(function(){
        updateVars()
      $("input").change(function(){
        updateVars()
      })
    })
}

function updateVars(){
    fstr=$('#f-in').val()
    x=$('#x-in').val()
    x=parseFloat(x)
    $('#x-out').html(''+x)
    loop()
}

function draw() {

    background(51);
    if (fstr !== undefined && x !== undefined){
      graphTanLine(fstr, x)
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

function graphTanLine(fstr, x_){
  function f(x) {
      return math.eval(replaceX(fstr, x));
  }
  graph(fstr)
  let a = (f(x_+.001)-f(x_))/0.001
  let c = f(x_)
  // let fx = `${a}*(x-${x})+${c}`
  if(a !== undefined){
      function f(x){
          return a*(x-x_)+c
      }
      graph(f)
      $('#out').html(`dy/dx = ${a}`)
  }

}
