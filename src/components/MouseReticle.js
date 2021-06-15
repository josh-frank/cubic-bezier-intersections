export default function MouseReticle( { mouseDown } ) {

    return <g>
        <path d={ `M 0 ${ mouseDown.y } L ${ document.documentElement.clientWidth } ${ mouseDown.y }` } stroke="red" fill="none" />
        <path d={ `M ${ mouseDown.x } 0 L ${ mouseDown.x } ${ document.documentElement.clientHeight }` } stroke="red" fill="none" />
        <circle cx={ mouseDown.x } cy={ mouseDown.y } r="3" fill="red" />
    </g>;

}