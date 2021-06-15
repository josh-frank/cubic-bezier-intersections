import styled from "styled-components";

const StyledInput = styled.input.attrs( ( { characterLength } ) => ( {
    style: { width: `${ characterLength }ch` },
} ) )``;

export default function CurveFields( { curve, setCurve } ) {

    function updateCurve( index, newParameter ) {
        const newCurve = [ ...curve ];
        newCurve[ index ] = newParameter;
        setCurve( newCurve )
    }

    return <form className="curve-fields">
        M
        <StyledInput
            type="number"
            value={ curve[ 0 ] }
            characterLength={ curve[ 0 ].toString().length }
            onChange={ changeEvent => updateCurve( 0, changeEvent.target.value ) }
        />
        <StyledInput
            type="number"
            value={ curve[ 1 ] }
            characterLength={ curve[ 1 ].toString().length }
            onChange={ changeEvent => updateCurve( 1, changeEvent.target.value ) }
        />
        &nbsp;C
        <StyledInput
            type="number"
            value={ curve[ 2 ] }
            characterLength={ curve[ 2 ].toString().length }
            onChange={ changeEvent => updateCurve( 2, changeEvent.target.value ) }
        />
        <StyledInput
            type="number"
            value={ curve[ 3 ] }
            characterLength={ curve[ 3 ].toString().length }
            onChange={ changeEvent => updateCurve( 3, changeEvent.target.value ) }
        />
        <StyledInput
            type="number"
            value={ curve[ 4 ] }
            characterLength={ curve[ 4 ].toString().length }
            onChange={ changeEvent => updateCurve( 4, changeEvent.target.value ) }
        />
        <StyledInput
            type="number"
            value={ curve[ 5 ] }
            characterLength={ curve[ 5 ].toString().length }
            onChange={ changeEvent => updateCurve( 5, changeEvent.target.value ) }
        />
        <StyledInput
            type="number"
            value={ curve[ 6 ] }
            characterLength={ curve[ 6 ].toString().length }
            onChange={ changeEvent => updateCurve( 6, changeEvent.target.value ) }
        />
        <StyledInput
            type="number"
            value={ curve[ 7 ] }
            characterLength={ curve[ 7 ].toString().length }
            onChange={ changeEvent => updateCurve( 7, changeEvent.target.value ) }
        />
    </form>;

}