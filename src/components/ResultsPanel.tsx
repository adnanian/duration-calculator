import { Duration } from "../durationTools";
import { useTranslation } from "react-i18next";
import "../styles/ResultsPanel.css";

interface DurationResult {
    duration: Duration
}

const ResultsPanel: React.FC<DurationResult> = ({ duration }) => {
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
            <p>{t("toHours", {hours: duration.toHours()})}</p>
            <p>{t("toMinutes", {minutes: duration.toMinutes()})}</p>
            <p>{t("toSeconds", {seconds: duration.toSeconds()})}</p>
            <p>{t("toMillis", {milliseconds: duration.toMilliseconds()})}</p>
        </div>
    );
}

export default ResultsPanel;