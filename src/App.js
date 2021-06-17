import { useCallback, useEffect, useState } from 'react';

import './App.css';
import CurveFields from './components/CurveFields';
import CurvePath from './components/CurvePath';
import MouseReticle from './components/MouseReticle';

// const testCurve = [
//   [ "M", 100, 100 ],
//   [ "C", 100, 100, 350, 350, 500, 300 ]
// ];

function App() {
  
  const [ mouseDown, setMouseDown ] = useState( null );
  
  const [ curve, setCurve ] = useState( [ 100, 100, 400, 200, 350, 350, 500, 300 ] );
  
  const handleMouseDown = useCallback( mouseDownEvent => {
    if ( mouseDownEvent.target.nodeName !== "INPUT" )
      setMouseDown( { x: mouseDownEvent.clientX, y: mouseDownEvent.clientY } );
  }, [] );
  
  const handleMouseUp = useCallback( () => setMouseDown( null ), [] );

  const handleMouseMove = useCallback( mouseMoveEvent => {
    if ( mouseDown ) {
      setMouseDown( { x: mouseMoveEvent.clientX, y: mouseMoveEvent.clientY } );
    }
  }, [ mouseDown ] );
    
  useEffect( () => {
    window.addEventListener( "mousedown", handleMouseDown );
    window.addEventListener( "mouseup", handleMouseUp );
    window.addEventListener( "mousemove", handleMouseMove );
    return () => {
      window.removeEventListener( "mousedown", handleMouseDown );
      window.removeEventListener( "mouseup", handleMouseUp );
      window.removeEventListener( "mousemove", handleMouseMove );
    };
  }, [ handleMouseDown, handleMouseUp, handleMouseMove ] );

  return <div className="app">
    <CurveFields curve={ curve } setCurve={ setCurve } />
    <svg
      className="viewbox"
      viewBox={ `0 0 ${ document.documentElement.clientWidth } ${ document.documentElement.clientHeight }` }
    >
      <CurvePath curve={ curve } mouseDown={ mouseDown } />
      { mouseDown && <MouseReticle mouseDown={ mouseDown } /> }
    </svg>
    { mouseDown && Object.values( mouseDown ).join() }
    {/* { mouseDown && computeIntersections(
      curve,
      [ 0, mouseDown.y ],
      [ document.documentElement.clientWidth, mouseDown.y ]
    ) } */}
  </div>;

}

export default App;
