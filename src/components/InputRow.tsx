import React, { ChangeEventHandler } from "react";
import Duration from "../durationTools";

/** */
interface DurationInputRow {
    duration: Duration,
    onChange: ChangeEventHandler<HTMLInputElement>
}

/**
 * 
 * @param param0 
 * @returns 
 */
const InputRow: React.FC<DurationInputRow> = ({ duration, onChange }) => {

    console.log("Current duration id: ", duration.id);

    return (
        <tr>
            <td>
                <input
                    id={`hours-${duration.id}`}
                    type="number"
                    min="0"
                    step="1"
                    value={duration.hours}
                    onChange={onChange}
                />
            </td>
            <td>
                <input
                    id={`minutes-${duration.id}`}
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    value={duration.minutes}
                    onChange={onChange}
                />
            </td>
            <td>
                <input
                    id={`seconds-${duration.id}`}
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    value={duration.seconds}
                    onChange={onChange}
                />
            </td>
            <td>
                <input
                    id={`milliseconds-${duration.id}`}
                    type="number"
                    min="0"
                    max="999"
                    step="1"
                    value={duration.milliseconds}
                    onChange={onChange}
                />
            </td>
            <td>
                {
                    duration.id === 0 ? null : (
                        <select>
                            <option value='+'>+</option>
                            <option value='-'>-</option>
                        </select>
                    )
                }
            </td>
            <td>
                <input
                    type="number"
                    step="0.001"
                    readOnly
                />
            </td>
        </tr>
    );
};

export default InputRow;