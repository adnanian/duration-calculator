import React, { ChangeEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { CalcWrapper } from "../durationTools";
import InputRow from "./InputRow";
import "../styles/InputTable.css";

/**
 * Interface representing the props for the InputTable component.
 */
interface CalcWrapperManager {
    /** The array of CalcWrapper objects that are linked to each other for computing the total duration. */
    calcWrappers: CalcWrapper[],
    /** 
     * The callback function to execute when a duration field or scale has been changed, or when a new
     * operand has been selected.
     */
    onInputChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
}

/**
 * Renders the input table. Each row in the input table consists of a set of
 * inputs for either the duration or the scale, which is set by the user.
 * 
 * @param props - the props for the InputTable component. 
 * @returns the rendered table of the current CalcWrapper property values.
 */
const InputTable: React.FC<CalcWrapperManager> = ({ calcWrappers, onInputChange }) => {
    const { t } = useTranslation();
    // calculable container components
    const calcContainers = calcWrappers.map((calcWrapper, index) => {
        return (
            <InputRow
                key={index}
                index={index}
                calcWrapper={calcWrapper}
                onInputChange={onInputChange}
            />
        )
    });

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>{t("rowNumLabel")}</th>
                        <th>{t("hours")}</th>
                        <th>{t("minutes")}</th>
                        <th>{t("seconds")}</th>
                        <th>{t("milliseconds")}</th>
                        <th>{t("operand")}</th>
                        <th>{t("scale")}</th>
                    </tr>
                </thead>
                <tbody>
                    {calcContainers}
                </tbody>
            </table>
        </div>
    );
}

export default InputTable