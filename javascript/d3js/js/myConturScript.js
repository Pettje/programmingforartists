// Populate a grid of (n+2)×(m+2) values where -9.6 ≤ x ≤ 9.6 and -5 ≤ y ≤ 5.
var n = 240, m = 125, values = new Array((n + 2) * (m + 2));
for (var j = -0.5, k = 0; j < m + 1; ++j) {
  for (var i = -0.5; i < n + 1; ++i, ++k) {
    values[k] = value(i / n * 19.2 - 9.6, 5 - j / m * 10);
  }
}

var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    color = d3.scaleSequential(d3.interpolateRdBu).domain([-1, 1]),
    path = d3.geoPath(null, context),
    thresholds = d3.range(-1.2, 1, 0.2),
    contours = d3.contours().size([n + 2, m + 2]);

context.scale(canvas.width / (n + 1), canvas.width / (n + 1));
context.translate(-0.5, -0.5);

d3.timer(function(t) {
  var dv = (t % 1000) / 1000 * 0.2;
  contours
      .thresholds(thresholds.map(function(v) { return v + dv; }))
    (values)
      .forEach(fill);
});

function fill(geometry) {
  context.beginPath();
  path(geometry);
  context.fillStyle = color(geometry.value);
  context.fill();
}

function value(x, y) {
  return Math.sin(x + y) * Math.sin(x - y);
}

