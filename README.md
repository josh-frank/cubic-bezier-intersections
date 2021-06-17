# curve-intersection

A demo visualizing the intersection of a cubic bézier curve with a horizontal axis, made to accompany [this blog post](https://joshgoestoflatiron.medium.com/june-17-calculating-svg-b%C3%A9zier-curve-intersections-without-snap-adff3fc6aae7). An adaptation of some [older code](https://www.particleincell.com/2013/cubic-line-intersection/) for ES6 JavaScript.

The `<svg>` is sized such that `clientX` and `clientY` are equal to their viewbox coordinates. Enter values in the fields at the top left to change the curve. Click anywhere on the document to see where the `mouseDownEvent`'s `x` and `y` intersect with that curve.