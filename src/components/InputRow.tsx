import React, { ChangeEventHandler } from "react";
import * as dt from "../durationTools";
import { useTranslation } from "react-i18next";

/**
 * Interface representing the props for the InputRow component.
 */
interface CalculableInputRow {
    /** The row index. */
    index: number
    /** The calculation wrapper, consisting of a duration/scale and an operand. */
    calcWrapper: dt.CalcWrapper,
    /** The callback for input change. */
    onInputChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
}

/**
 * Renders a single row for the input table, consisting of a duration or scale, which
 * the user can adjust according to their needs.
 * 
 * @param props - the props for the InputRow component.
 * @returns the rendered InputRow component.
 */
const InputRow: React.FC<CalculableInputRow> = ({ index, calcWrapper, onInputChange }) => {
    const { t } = useTranslation();
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

    return (
        <tr>
            <td>{index + 1}</td>
            <td title={t("tooltips.hoursField")}>
                <input
                    id={`hours-${index}`}
                    type="number"
                    min="0"
                    max="875999"
                    step="1"
                    value={hours}
                    readOnly={durationInputReadOnly}
                    disabled={durationInputReadOnly}
                    onChange={onInputChange}
                />
            </td>
            <td title={t("tooltips.minutesField")}>
                <input
                    id={`minutes-${index}`}
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    value={minutes}
                    readOnly={durationInputReadOnly}
                    disabled={durationInputReadOnly}
                    onChange={onInputChange}
                />
            </td>
            <td title={t("tooltips.secondsField")}>
                <input
                    id={`seconds-${index}`}
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    value={seconds}
                    readOnly={durationInputReadOnly}
                    disabled={durationInputReadOnly}
                    onChange={onInputChange}
                />
            </td>
            <td title={t("tooltips.millisField")}>
                <input
                    id={`milliseconds-${index}`}
                    type="number"
                    min="0"
                    max="999"
                    step="1"
                    value={milliseconds}
                    readOnly={durationInputReadOnly}
                    disabled={durationInputReadOnly}
                    onChange={onInputChange}
                />
            </td>
            <td title={t("tooltips.operandDropDown")}>
                {
                    index === 0 ? null : (
                        <select id={`operand-${index}`} onChange={onInputChange}>
                            <option value='+'>+</option>
                            <option value='-'>-</option>
                            <option value='×'>×</option>
                            <option value='÷'>÷</option>
                        </select>
                    )
                }
            </td>
            <td title={t("tooltips.scaleField")}>
                <input
                    id={`value-${index}`}
                    type="number"
                    min="0"
                    max="9999"
                    step="0.001"
                    value={scaleValue}
                    readOnly={scaleInputReadOnly}
                    disabled={scaleInputReadOnly}
                    onChange={onInputChange}
                />
            </td>
        </tr>
    );
};

export default InputRow;