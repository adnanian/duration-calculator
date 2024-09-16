import React, { ChangeEventHandler } from "react";
import * as dt from "../durationTools";

/** */
interface CalculableInputRow {
    calcWrapper: dt.CalcWrapper,
    onInputChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
}

/**
 * 
 * @param param0 
 * @returns 
 */
const InputRow: React.FC<CalculableInputRow> = ({ calcWrapper, onInputChange }) => {
    // const isDuration: boolean = calcWrapper.durationCalculable instanceof dt.Duration;
    // Duration Defaults
    let hours: number = 0, minutes: number = 0, seconds: number = 0, milliseconds: number = 0;
    let durationInputReadOnly: boolean;
    // Scale defaults
    let scaleValue: number = 0.000;
    let scaleInputReadOnly: boolean;
    if (calcWrapper.durationCalculable instanceof dt.Duration) {
        const duration: dt.Duration = calcWrapper.durationCalculable as dt.Duration;
        hours = duration.hours;
        minutes = duration.minutes;
        seconds = duration.seconds;
        milliseconds = duration.milliseconds;
        durationInputReadOnly = false;
        scaleInputReadOnly = true;
    } else {
        const scale: dt.Scale = calcWrapper.durationCalculable as dt.Scale;
        scaleValue = scale.value;
        durationInputReadOnly = true;
        scaleInputReadOnly = false;
    }

    // console.log(calcWrapper.durationCalculable instanceof dt.Duration);

    return (
        <tr>
            <td>
                <input
                    id={`hours-${calcWrapper.id}`}
                    type="number"
                    min="0"
                    max="876000"
                    step="1"
                    value={hours}
                    readOnly={durationInputReadOnly}
                    onChange={onInputChange}
                />
            </td>
            <td>
                <input
                    id={`minutes-${calcWrapper.id}`}
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    value={minutes}
                    readOnly={durationInputReadOnly}
                    onChange={onInputChange}
                />
            </td>
            <td>
                <input
                    id={`seconds-${calcWrapper.id}`}
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    value={seconds}
                    readOnly={durationInputReadOnly}
                    onChange={onInputChange}
                />
            </td>
            <td>
                <input
                    id={`milliseconds-${calcWrapper.id}`}
                    type="number"
                    min="0"
                    max="999"
                    step="1"
                    value={milliseconds}
                    readOnly={durationInputReadOnly}
                    onChange={onInputChange}
                />
            </td>
            <td>
                {
                    calcWrapper.id === 0 ? null : (
                        <select id={`operand-${calcWrapper.id}`} onChange={onInputChange}>
                            <option value='+'>+</option>
                            <option value='-'>-</option>
                            <option value='×'>×</option>
                            <option value='÷'>÷</option>
                        </select>
                    )
                }
            </td>
            <td>
                <input
                    id={`value-${calcWrapper.id}`}
                    type="number"
                    min="0"
                    step="0.001"
                    value={scaleValue}
                    readOnly={scaleInputReadOnly}
                    onChange={onInputChange}
                />
            </td>
        </tr>
    );
};

export default InputRow;