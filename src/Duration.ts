class Duration {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
    id: number;

    // CONSTRAINTS AND VALIDATION
    private static readonly MAX_MINUTE_VALUE: number = 59;
    private static readonly MAX_SECOND_VALUE: number = 59;
    private static readonly MILLI_VALUE_LIMIT: number = 1000;

    // CONVERSIONS
    private static readonly MILLIS_TO_SECONDS: number = 1000;
    private static readonly SECONDS_TO_MINUTES: number = 60;
    private static readonly MINUTES_TO_HOURS: number = 60;

    static idIncrement: number = 0;

    constructor(hours: number, minutes: number, seconds: number, milliseconds: number) {
        if (!Number.isInteger(hours) || hours < 0) {
            throw new Error("Hours must be a non-negative integer.");
        }
        if (!Number.isInteger(minutes) || minutes < 0 || minutes > Duration.MAX_MINUTE_VALUE) {
            throw new Error("Minutes must be an integer between 0 and 59.");
        }
        if (!Number.isInteger(seconds) || seconds < 0 || seconds > Duration.MAX_SECOND_VALUE) {
            throw new Error("Seconds must be an integer between 0 and 59.");
        }
        if (milliseconds < 0 || milliseconds >= Duration.MILLI_VALUE_LIMIT) {
            throw new Error("Milliseconds must be between 0 (inclusive) and 1000 (exclusive)");
        }

        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.milliseconds = milliseconds;
        this.id = Duration.idIncrement;
        ++Duration.idIncrement;
    }
}

export default Duration;