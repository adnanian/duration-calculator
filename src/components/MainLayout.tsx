import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import * as dt from '../durationTools';
import { HelmetProvider, Helmet } from "react-helmet-async";
import TableControls from "./TableControls";
import ResultsPanel from "./ResultsPanel";
import InputTable from "./InputTable";


const MainLayout: React.FC = () => {
    const MIN_ROW_SIZE: number = 2, MAX_ROW_SIZE: number = 100;
    const { t } = useTranslation();
    // Array of durations, scales, and the operands.
    // Must first initialize to null so that id can increment.
    const [calculableArgs, setCalculableArgs] = useState<dt.CalcWrapper[]>((): dt.CalcWrapper[] => {
        const cwArray: dt.CalcWrapper[] = Array(MIN_ROW_SIZE).fill(null);
        cwArray[0] = new dt.CalcWrapper("N/A", new dt.Duration(0, 0, 0, 0));
        cwArray[1] = new dt.CalcWrapper('+', new dt.Duration(0, 0, 0, 0));
        return cwArray;
    });
    // Computed duration.
    const [durationResult, setDurationResult] = useState<dt.Duration>(new dt.Duration(0, 0, 0, 0));
    const helmetContext = {};

    /**
   * Updates a CalcWrapper state value.
   * 
   * @param e the event.
   */
    function handleCalculableChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        type DurationField = 'hours' | 'minutes' | 'seconds' | 'milliseconds';
        const targetIndex: number = Number.parseInt(e.target.id.substring(e.target.id.lastIndexOf('-') + 1));
        const newWrappers = calculableArgs.map((cw, index) => {
            if (index === targetIndex) {
                const fieldName: string = e.target.id.substring(0, e.target.id.indexOf('-'))
                let newCW: dt.CalcWrapper = cw.clone();
                if (fieldName === 'operand') {
                    const oldOperand = newCW.operand;
                    newCW.operand = e.target.value as dt.Operand;
                    if ((newCW.operand === '+' || newCW.operand === '-') && (oldOperand === '×' || oldOperand === '÷')) {
                        newCW.durationCalculable = new dt.Duration(0, 0, 0, 0) as dt.Duration;
                    } else if ((newCW.operand === '×' || newCW.operand === '÷') && (oldOperand === '+' || oldOperand === '-')) {
                        newCW.durationCalculable = new dt.Scale(0) as dt.Scale;
                    }
                } else {
                    if (newCW.durationCalculable instanceof dt.Duration) {
                        newCW.durationCalculable[fieldName as DurationField] = Number.parseInt(e.target.value as string);

                    } else {
                        const scale = newCW.durationCalculable as dt.Scale;
                        scale.value = Number.parseFloat(e.target.value as string);
                        newCW.durationCalculable = scale;
                    }
                }
                return newCW;
            } else {
                return cw;
            }
        });
        setCalculableArgs(newWrappers);
    }

    /**
     * Calculates the total duration from the array of durations, scales and their corresponding
     * operands. 
     */
    function compute(): void {
        try {
            let totalDuration: dt.Duration = new dt.Duration(0, 0, 0, 0);
            calculableArgs.forEach((row, index) => {
                // console.log(row.operand);
                if (index === 0) {
                    totalDuration = row.durationCalculable as dt.Duration;
                } else {
                    if (dt.isDuration(row.durationCalculable)) {
                        totalDuration = totalDuration.performCalculation(row.durationCalculable as dt.Duration, row.operand);
                    } else if (dt.isScale(row.durationCalculable)) {
                        totalDuration = totalDuration.performCalculation(row.durationCalculable as dt.Scale, row.operand);
                    }
                }
            });
            setDurationResult(totalDuration);
        } catch (error) {
            alert(error);
        }

    }

    /**
     * Adjusts the number of rows in the input table.
     * 
     * @param e the event.
     */
    function handleRowAdjustment(e: ChangeEvent<HTMLInputElement>): void {
        const newRowCount: number = Number.parseInt(e.target.value);
        if (newRowCount < MIN_ROW_SIZE || newRowCount > MAX_ROW_SIZE) {
            throw new Error(`Row count must be between ${MIN_ROW_SIZE} and ${MAX_ROW_SIZE}.`);
        }
        if (newRowCount > calculableArgs.length) {
            const newRows: dt.CalcWrapper[] = Array(newRowCount - calculableArgs.length).fill(null).map(() => {
                return new dt.CalcWrapper('+', new dt.Duration(0, 0, 0, 0));
            });
            setCalculableArgs([...calculableArgs, ...newRows]);
        } else if (newRowCount < calculableArgs.length) {
            setCalculableArgs(calculableArgs.slice(0, newRowCount));
        }
    }

    return (
        <HelmetProvider context={helmetContext}>
            <Helmet>
                <title>{t("title")}</title>
            </Helmet>
            <TableControls
                minRowSize={MIN_ROW_SIZE}
                maxRowSize={MAX_ROW_SIZE}
                currentRowCount={calculableArgs.length}
                onAdjustRow={handleRowAdjustment}
                onCompute={compute}
            />
            <div className="input-output">
                <ResultsPanel duration={durationResult} />
                <InputTable calcWrappers={calculableArgs} onInputChange={handleCalculableChange} />
            </div>
        </HelmetProvider>
    );
}

export default MainLayout;