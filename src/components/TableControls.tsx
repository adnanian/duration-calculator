import React, { ChangeEventHandler, MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import "../styles/TableControls.css";

interface TableAdjuster {
  minRowSize: number,
  maxRowSize: number,
  currentRowCount: number,
  onAdjustRow: ChangeEventHandler<HTMLInputElement>,
  onCompute: MouseEventHandler
}

const TableControls: React.FC<TableAdjuster> = ({ minRowSize, maxRowSize, currentRowCount, onAdjustRow: onRowAdjustment, onCompute }) => {
  const { t } = useTranslation();

  return (
    <div id="table-controls">
      <div className="slider-container">
        <h3>{t("rows", { rowCount: currentRowCount })}</h3>
        <span>
          <span className="slider-end">{minRowSize}</span>
          <input
            name="rowSlider"
            type="range"
            min={minRowSize.toString()}
            max={maxRowSize.toString()}
            step="1"
            value={currentRowCount}
            onChange={onRowAdjustment}
          />
          <span className="slider-end">{maxRowSize}</span>
        </span>
      </div>
      <button
        onClick={onCompute}
        title={t("tooltips.compute")}
      >
        {t("compute")}
      </button>
    </div>
  );
}

export default TableControls;