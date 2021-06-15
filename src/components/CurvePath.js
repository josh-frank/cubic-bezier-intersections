export default function CurvePath( { curve } ) {

    return <g>
        <path d={ `M ${ curve.slice( 0, 2 ).join( " " ) } C ${ curve.slice( 2 ).join( " " ) }` } stroke="black" fill="none" />
        <path d={ `M ${ curve.slice( 0, 2 ).join() } L ${ curve.slice( 2, 4 ).join()  }` } stroke="black" strokeDasharray="5,5" fill="none" />
        <path d={ `M ${ curve.slice( 4, 6 ).join() } L ${ curve.slice( 6 ).join()  }` } stroke="black" strokeDasharray="5,5" fill="none" />
        <circle cx={ curve[ 0 ] } cy={ curve[ 1 ] } r="3" fill="black" />
        <circle cx={ curve[ 2 ] } cy={ curve[ 3 ] } r="3" fill="black" />
        <circle cx={ curve[ 4 ] } cy={ curve[ 5 ] } r="3" fill="black" />
        <circle cx={ curve[ 6 ] } cy={ curve[ 7 ] } r="3" fill="black" />
    </g>;

}