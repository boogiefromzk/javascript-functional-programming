import {
    leftValueInputMsg,
    rightValueInputMsg,
    leftValueChangedMsg,
    rightValueChangedMsg,
} from './controller';

const UNITS = ['Fahrenheit', 'Celsius', 'Kelvin'];

function unitOptions(selectedUnit) {
    return UNITS.map(unit => $('<option/>').val(unit).prop('selected', selectedUnit === unit).append(unit));
}

function unitSection(dispatch, unit, value, inputMsg, unitMsg) {
    return $('<div/>').addClass('w-50 ma1')
        .append($('<input/>').attr('type', 'text').addClass('db w-100 mv2 pa2 input-reset ba').val(value).on('input', e => dispatch(inputMsg(e.target.value))))
        .append($('<select/>').addClass('db w-100 pa2 ba input-reset br1 bg-white ba b--black').on('change', e => dispatch(unitMsg(e.target.value))).append(unitOptions(unit)))
    ;
}

function view(dispatch, model) {
    return $('<div/>').addClass('mw6 center')
        .append($('<h1/>').addClass('f2 pv2 bb').append('Temperature Unit Converter'))
        .append($('<div/>').addClass('flex')
            .append(unitSection(
                dispatch,
                model.leftUnit,
                model.leftValue,
                leftValueInputMsg,
                leftValueChangedMsg,
            ))
            .append(unitSection(
                dispatch,
                model.rightUnit,
                model.rightValue,
                rightValueInputMsg,
                rightValueChangedMsg,
            ))
        )
        .append($('<pre/>').append(JSON.stringify(model, null, 2)))
    ;
}

export default view;
