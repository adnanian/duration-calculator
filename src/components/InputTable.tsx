import React, { ChangeEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { CalcWrapper } from "../durationTools";
import InputRow from "./InputRow";
import "../styles/InputTable.css";

/**
 * lalala
 * TODO
 */
interface CalcWrapperManager {
    calcWrappers: CalcWrapper[],
    onInputChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
}

/**
 * TODO
 * 
 * @param param0 
 * @returns 
 */
const InputTable: React.FC<CalcWrapperManager> = ({calcWrappers, onInputChange}) => {
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