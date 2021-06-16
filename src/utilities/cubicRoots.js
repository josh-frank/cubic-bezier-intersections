const bezierCoefficients = ( p0, p1, p2, p3 ) => {
        return [
                -p0 + 3 * p1 + -3 * p2 + p3,
                3 * p0 - 6 * p1 + 3 * p2,
                -3 * p0 + 3 * p1,
                p0
        ];
}

const computeIntersections = ( curveDefinition, lineStart, lineEnd ) => {
        const A = lineEnd[ 1 ] - lineStart[ 1 ];
        const B = lineStart[ 0 ] - lineEnd[ 0 ];
        const C = lineStart[ 0 ] * ( lineStart[ 1 ] - lineEnd[ 1 ] ) + lineStart[ 1 ] * ( lineEnd[ 0 ] - lineStart[ 0 ] );
        const xBezierCoefficients = bezierCoefficients( curveDefinition[ 0 ], curveDefinition[ 2 ], curveDefinition[ 4 ], curveDefinition[ 6 ] );
        const yBezierCoefficients = bezierCoefficients( curveDefinition[ 1 ], curveDefinition[ 3 ], curveDefinition[ 5 ], curveDefinition[ 7 ] );
        const P = [
                A * xBezierCoefficients[ 0 ] + B * yBezierCoefficients[ 0 ],		/*t^3*/
                A * xBezierCoefficients[ 1 ] + B * yBezierCoefficients[ 1 ],		/*t^2*/
                A * xBezierCoefficients[ 2 ] + B * yBezierCoefficients[ 2 ],		/*t*/
                A * xBezierCoefficients[ 3 ] + B * yBezierCoefficients[ 3 ] + C	        /*1*/
        ];
        return cubicRoots( P );
}

const cubicRoots = ( P ) => {
    let [ a, b, c, d ] = P;
	
    var A = b / a;
    var B = c / a;
    var C = d / a;

    var Q, R, D, S, T, Im;

    var Q = ( 3 * B - Math.pow( A, 2 ) ) / 9;
    var R = ( 9 * A * B - 27 * C - 2 * Math.pow( A, 3 ) ) / 54;
    var D = Math.pow( Q, 3 ) + Math.pow( R, 2 );    // polynomial discriminant

    var t = [];
	
    if (D >= 0)                                 // complex or duplicate roots
    {
        var S = Math.sign(R + Math.sqrt(D))*Math.pow(Math.abs(R + Math.sqrt(D)),(1/3));
        var T = Math.sign(R - Math.sqrt(D))*Math.pow(Math.abs(R - Math.sqrt(D)),(1/3));

        t[0] = -A/3 + (S + T);                    // real root
        t[1] = -A/3 - (S + T)/2;                  // real part of complex root
        t[2] = -A/3 - (S + T)/2;                  // real part of complex root
        Im = Math.abs(Math.sqrt(3)*(S - T)/2);    // complex part of root pair   
        
        /*discard complex roots*/
        if (Im!=0)
        {
            t[1]=-1;
            t[2]=-1;
        }
    
    }
    else                                          // distinct real roots
    {
        var th = Math.acos(R/Math.sqrt(-Math.pow(Q, 3)));
        
        t[0] = 2*Math.sqrt(-Q)*Math.cos(th/3) - A/3;
        t[1] = 2*Math.sqrt(-Q)*Math.cos((th + 2*Math.PI)/3) - A/3;
        t[2] = 2*Math.sqrt(-Q)*Math.cos((th + 4*Math.PI)/3) - A/3;
        Im = 0.0;
    }
    
    /*discard out of spec roots*/
	for (var i=0;i<3;i++) 
        if (t[i]<0 || t[i]>1.0) t[i]=-1;
                
	/*sort but place -1 at the end*/
//     t=sortSpecial(t);
    
	console.log(t[0]+" "+t[1]+" "+t[2]);
    return t;
}

module.exports = { computeIntersections }