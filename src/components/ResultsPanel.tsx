import { Duration } from "../durationTools";
import { useTranslation } from "react-i18next";
import "../styles/ResultsPanel.css";

/**
 * Renders a panel of the computed total duration.
 * Displays the total in hours, minutes, seconds, and milliseconds, then converts
 * the total in each of the four units.
 * 
 * @param props - the props of the ResultsPanel component; in this case, the only prop is the Duration object.
 * @returns the total duration in all its units.
 */
const ResultsPanel: React.FC<{ duration: Duration }> = ({ duration }) => {
    const { t } = useTranslation();

    return (
        <div id="results-panel">
            <h4>{t("result")}</h4>
            <p>{t("durationResult", {
                hours: duration.hours,
                minutes: duration.minutes,
                seconds: duration.seconds,
                milliseconds: duration.milliseconds
            })}</p>
            <p>{t("toHours", { hours: duration.toHours() })}</p>
            <p>{t("toMinutes", { minutes: duration.toMinutes() })}</p>
            <p>{t("toSeconds", { seconds: duration.toSeconds() })}</p>
            <p>{t("toMillis", { milliseconds: duration.toMilliseconds() })}</p>
        </div>
    );
}

export default ResultsPanel;