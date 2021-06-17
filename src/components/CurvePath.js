import computeIntersections from "../utilities/bezierIntersections";

export default function CurvePath( { curve, mouseDown } ) {

    const intersectionCoordinates = mouseDown && [
        ...computeIntersections(
            curve,
            [ 0, mouseDown.y ],
            [ document.documentElement.clientWidth, mouseDown.y ]
        ), ...computeIntersections(
            curve,
            [ mouseDown.x, 0 ],
            [ mouseDown.x, document.documentElement.clientHeight ]
        )
    ].map( point => [ Math.round( point[ 0 ] ), Math.round( point[ 1 ] ) ] );
    
    const intersectionPoints = mouseDown && intersectionCoordinates.map( ( intersectionPoint, index ) => <g key={ index }>
        <circle
            cx={ intersectionPoint[ 0 ] }
            cy={ intersectionPoint[ 1 ] }
            r="3"
            fill="red"
        />
        <text
            x={ intersectionPoint[ 0 ] + 10 }
            y={ intersectionPoint[ 1 ] + 10 }
            fontSize="small"
            fontFamily="Arial, Helvetica, sans-serif"
        >
            { intersectionPoint.join( ", " )}
        </text>
    </g> );

    return <g>
        <path d={ `M ${ curve.slice( 0, 2 ).join( " " ) } C ${ curve.slice( 2 ).join( " " ) }` } stroke="black" fill="none" />
        <path d={ `M ${ curve.slice( 0, 2 ).join() } L ${ curve.slice( 2, 4 ).join()  }` } stroke="black" strokeDasharray="5,5" fill="none" />
        <path d={ `M ${ curve.slice( 4, 6 ).join() } L ${ curve.slice( 6 ).join()  }` } stroke="black" strokeDasharray="5,5" fill="none" />
        <circle cx={ curve[ 0 ] } cy={ curve[ 1 ] } r="3" fill="black" />
        <circle cx={ curve[ 2 ] } cy={ curve[ 3 ] } r="3" fill="black" />
        <circle cx={ curve[ 4 ] } cy={ curve[ 5 ] } r="3" fill="black" />
        <circle cx={ curve[ 6 ] } cy={ curve[ 7 ] } r="3" fill="black" />
        { mouseDown && intersectionPoints }
    </g>;

}