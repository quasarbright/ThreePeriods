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
    graph('x*x')
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
}
function graphMaclaurin(expression, term){
  function f(x) {
      return math.eval(replaceX(fstr, x));
  }
  function factorialize(n){
    let stepfactorial=n
    let ans = 1
    if (stepfactorial>0){
      ans=ans*stepfactorial
      stepfactorial--
    } else {
      let nfact=ans
    }

  }
  let nDerive
  a1 = (f(x+0.001)-f(x))/0.001
  a2 = (f(x+0.002)-f(x+0.001))/0.001
  a3 = (f(x+0.003)-f(x+0.002))/0.001
  a4 = (f(x+0.004)-f(x+0.003))/0.001
  a5 = (f(x+0.005)-f(x+0.004))/0.001
  a6 = (f(x+0.006)-f(x+0.005))/0.001
  a7 = (f(x+0.007)-f(x+0.006))/0.001
  a8 = (f(x+0.008)-f(x+0.007))/0.001
  a9 = (f(x+0.009)-f(x+0.008))/0.001
  a10 = (f(x+0.01)-f(x+0.009))/0.001
  b1 = (a2-a1)/0.001
  b2 = (a3-a2)/0.001
  b3 = (a4-a3)/0.001
  b4 = (a5-a4)/0.001
  b5 = (a6-a5)/0.001
  b6 = (a7-a6)/0.001
  b7 = (a8-a7)/0.001
  b8 = (a9-a8)/0.001
  b9 = (a10-a9)/0.001
  c1 = (b2-b1)/0.001
  c2 = (b3-b2)/0.001
  c3 = (b4-b3)/0.001
  c4 = (b5-b4)/0.001
  c5 = (b6-b5)/0.001
  c6 = (b7-b6)/0.001
  c7 = (b8-b7)/0.001
  c8 = (b9-b8)/0.001
  d1 = (c2-c1)/0.001
  d2 = (c3-c2)/0.001
  d3 = (c4-c3)/0.001
  d4 = (c5-c4)/0.001
  d5 = (c6-c5)/0.001
  d6 = (c7-c6)/0.001
  d7 = (c8-c7)/0.001
  e1 = (d2-d1)/0.001
  e2 = (d3-d2)/0.001
  e3 = (d4-d3)/0.001
  e4 = (d5-d4)/0.001
  e5 = (d6-d5)/0.001
  e6 = (d7-d6)/0.001
  f1 = (e2-e1)/0.001
  f2 = (e3-e2)/0.001
  f3 = (e4-e3)/0.001
  f4 = (e5-e4)/0.001
  f5 = (e6-e5)/0.001
  g1 = (f2-f1)/0.001
  g2 = (f3-f2)/0.001
  g3 = (f4-f3)/0.001
  g4 = (f5-f4)/0.001
  h1 = (g2-g1)/0.001
  h2 = (g3-g2)/0.001
  h3 = (g4-g3)/0.001
  i1 = (h2-h1)/0.001
  i2 = (h3-h2)/0.001
  j1 = (i2-i1)/0.001
  function nthDerive(n){
      switch (n) {
        case n==1:
          nDerive = a1
          break;
        case n==2:
          nDerive = b1
          break;
        case n==3:
          nDerive = c1
          break;
        case n==4:
          nDerive = d1
          break;
        case n==5:
          nDerive = e1
          break;
        case n==6:
          nDerive = f1
          break;
        case n==7:
          nDerive = g1
          break;
        case n==8:
          nDerive = h1
          break;
        case n==9:
          nDerive = i1
          break;
        case n==10:
          nDerive = j1
          break;
        default: console.log(`Invalid`)


      }
    }
  }
  let step=1
  let fMaclaurin = `${f(x)}`
  if (step<=term){
    fMaclaurin+= `(+${nthDerive(step)}*x^${step})/${factorialize(step)}`
    step++
} else{

}

}
