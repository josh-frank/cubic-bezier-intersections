const bezierCoefficients = ( p0, p1, p2, p3 ) => {
    return [
            -p0 + 3 * p1 + -3 * p2 + p3,
            3 * p0 - 6 * p1 + 3 * p2,
            -3 * p0 + 3 * p1,
            p0
    ];
}

const cubicRoots = P => {
    let [ a, b, c, d ] = P;

    var A = b / a,
        B = c / a,
        C = d / a,
        Q = ( 3 * B - Math.pow( A, 2 ) ) / 9,
        R = ( 9 * A * B - 27 * C - 2 * Math.pow( A, 3 ) ) / 54,
        D = Math.pow( Q, 3 ) + Math.pow( R, 2 ),            // polynomial discriminant
        Im;

    let t = [];

    if ( D >= 0 ) {                                         // complex or duplicate roots
        const S = Math.sign( R + Math.sqrt( D ) ) * Math.pow( Math.abs( R + Math.sqrt( D ) ), ( 1 / 3 ) );
        const T = Math.sign( R - Math.sqrt( D ) ) * Math.pow( Math.abs( R - Math.sqrt( D ) ), ( 1 / 3 ) );
        t = [
            -A / 3 + ( S + T ),                             // real root
            -A / 3 - ( S + T ) / 2,                         // real part of complex root
            -A / 3 - ( S + T ) / 2                          // real part of complex root
        ];
        // complex part of root pair   
        Im = Math.abs( Math.sqrt( 3 ) * ( S - T ) / 2 );
        // discard complex roots
        if ( Im !== 0 ) {
            t[ 1 ] = -1;
            t[ 2 ] = -1;
        }
    } else {                                                // distinct real roots
        let th = Math.acos( R / Math.sqrt( -Math.pow( Q, 3 ) ) );
        t = [
            2 * Math.sqrt( -Q ) * Math.cos( th / 3 ) - A / 3,
            2 * Math.sqrt( -Q ) * Math.cos( ( th + 2 * Math.PI ) / 3 ) - A / 3,
            2 * Math.sqrt( -Q ) * Math.cos( ( th + 4 * Math.PI ) / 3 ) - A / 3
        ];
        Im = 0.0;
    }

    // discard out of spec roots
    for ( let i = 0; i < 3; i ++ ) if ( t[ i ] < 0 || t[ i ] > 1.0 ) t[ i ] = -1;
                
    // sort placing -1 at the back
    // t.sort( t );

    // console.log(t[0]+" "+t[1]+" "+t[2]);
    return t;
}

module.exports.computeIntersections = ( curveDefinition, lineStart, lineEnd ) => {
    const A = lineEnd[ 1 ] - lineStart[ 1 ];
    const B = lineStart[ 0 ] - lineEnd[ 0 ];
    const C = lineStart[ 0 ] * ( lineStart[ 1 ] - lineEnd[ 1 ] ) + lineStart[ 1 ] * ( lineEnd[ 0 ] - lineStart[ 0 ] );
    const xBezierCoefficients = bezierCoefficients( curveDefinition[ 0 ], curveDefinition[ 2 ], curveDefinition[ 4 ], curveDefinition[ 6 ] );
    const yBezierCoefficients = bezierCoefficients( curveDefinition[ 1 ], curveDefinition[ 3 ], curveDefinition[ 5 ], curveDefinition[ 7 ] );
    const P = [
            A * xBezierCoefficients[ 0 ] + B * yBezierCoefficients[ 0 ],		/*t^3*/
            A * xBezierCoefficients[ 1 ] + B * yBezierCoefficients[ 1 ],		/*t^2*/
            A * xBezierCoefficients[ 2 ] + B * yBezierCoefficients[ 2 ],		/*t*/
            A * xBezierCoefficients[ 3 ] + B * yBezierCoefficients[ 3 ] + C	    /*1*/
    ];
    return cubicRoots( P ).reduce( ( result, root ) => {
            return [ ...result, [
                    xBezierCoefficients[ 0 ] * root * root * root + xBezierCoefficients[ 1 ] * root * root + xBezierCoefficients[ 2 ] * root + xBezierCoefficients[ 3 ],
                    yBezierCoefficients[ 0 ] * root * root * root + yBezierCoefficients[ 1 ] * root * root + yBezierCoefficients[ 2 ] * root + yBezierCoefficients[ 3 ]
            ] ];

    }, [] );
}

module.exports.computeCurveLength = curveDefinition => {
    const v = [ 2 * ( curveDefinition[ 2 ] - curveDefinition[ 0 ] ), 2 * ( curveDefinition[ 3 ] - curveDefinition[ 1 ] ) ];
    const w = [ curveDefinition[ 4 ] - 2 * curveDefinition[ 2 ] + curveDefinition[ 0 ], curveDefinition[ 5 ] - 2 * curveDefinition[ 3 ] + curveDefinition[ 1 ] ];
    const uu = 4 * ( w[ 0 ] * w[ 0 ] + w[ 1 ] * w[ 1 ] );
    if ( uu < 0.00001 ) return Math.sqrt( ( curveDefinition[ 4 ] - curveDefinition[ 0 ] ) * ( curveDefinition[ 4 ] - curveDefinition[ 0 ] ) + ( curveDefinition[ 5 ] - curveDefinition[ 1 ] ) * ( curveDefinition[ 5 ] - curveDefinition[ 1 ] ) );
    const vv = 4 * ( v[ 0 ] * w[ 0 ] + v[ 1 ] * w[ 1 ] );
    const ww = v[ 0 ] * v[ 0 ] + v[ 1 ] * v[ 1 ];
    const t1 = ( 2 * Math.sqrt( uu * ( uu + vv + ww ) ) );
    const t2 = 2 * uu+vv;
    const t3 = vv * vv - 4 * uu * ww;
    const t4 = ( 2 * Math.sqrt( uu * ww ) );
    return ( ( t1 * t2 - t3 * Math.log( t2 + t1 ) - ( vv * t4 - t3 * Math.log( vv + t4 ) ) ) / ( 8 * Math.pow( uu, 1.5 ) ) );
};

// export default { computeIntersections, computeCurveLength };
