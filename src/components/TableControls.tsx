import React, { ChangeEventHandler, MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import "../styles/TableControls.css";

/**
 * Interface representing the props for the TableControls component.
 */
interface TableAdjuster {
  /** The number of rows that the input table can never be less than at any point during the application. */
  minRowSize: number,
  /** The number of rows that the input table can never be greater than at any point during the application. */
  maxRowSize: number,
  /** The current number of rows in the input table. */
  currentRowCount: number,
  /** The callback function to execute when the row count adjuster has been interacted with by the user. */
  onAdjustRow: ChangeEventHandler<HTMLInputElement>,
  /** The callback function to execute when the button to compute the total duration has been clicked. */
  onCompute: MouseEventHandler
}

/**
 * Renders a slider that allows a user to adjust the size of the input table
 * and a button for the user to click to calculate the total duration based
 * on the values in the table.
 * 
 * @param props - the props for the TableControls component. 
 * @returns a small set of controls so that the user can further interact with the input table.
 */
const TableControls: React.FC<TableAdjuster> = ({ minRowSize, maxRowSize, currentRowCount, onAdjustRow: onRowAdjustment, onCompute }) => {
  const { t } = useTranslation();

  return (
    <div id="table-controls">
      <div className="slider-container" title={t("tooltips.adjust", { minRowSize: minRowSize, maxRowSize: maxRowSize })}>
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