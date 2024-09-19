import React, { ChangeEventHandler, MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";

interface TableAdjuster {
    minRowSize: number,
    maxRowSize: number,
    currentRowCount: number,
    onAdjustRow: ChangeEventHandler<HTMLInputElement>,
    onCompute: MouseEventHandler
}

const TableControls: React.FC<TableAdjuster> = ({minRowSize, maxRowSize, currentRowCount, onAdjustRow: onRowAdjustment, onCompute}) => {
    const { t } = useTranslation();

    return (
        <div id="table-controls">
            <div className="sliderContainer">
              <h3>{t("rows", { rowCount: currentRowCount })}</h3>
              <span>
                {minRowSize}
                <input
                  name="rowSlider"
                  type="range"
                  min={minRowSize.toString()}
                  max={maxRowSize.toString()}
                  step="1"
                  value={currentRowCount}
                  onChange={onRowAdjustment}
                />
                {maxRowSize}
              </span>
            </div>
            <button onClick={onCompute}>{t("compute")}</button>
        </div>
    );
}

export default TableControls;