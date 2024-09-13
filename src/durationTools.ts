interface ArithmeticOperation {
    symbol: '+' | '-' | '×' | '÷';
    function: Function;
}

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

    private readonly operationMap = Object.freeze({
        '+': this.plus.bind(this),
        '-': this.minus.bind(this)
    });

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
        this.id = Duration.idIncrement++;
    }

    /**
     * TODO
     * 
     * @param durationToAdd 
     * @returns 
     */
    plus(durationToAdd: Duration): Duration {
        // Add the milliseconds place, carry the 1 to minutes if sum >= 1000.
        const millisSum: number = this.milliseconds + durationToAdd.milliseconds;
        const millisPlace: number = millisSum % Duration.MILLIS_TO_SECONDS;
        // Add the seconds place, carry the 1 to minutes if sum >= 60.
        const secondsSum: number = Math.floor(millisSum / Duration.MILLIS_TO_SECONDS) + this.seconds + durationToAdd.seconds;
        const secondsPlace: number = secondsSum % Duration.SECONDS_TO_MINUTES;
        // Add the minutes place, carry the 1 to hours if sum >= 60.
        const minutesSum: number = Math.floor(secondsSum / Duration.SECONDS_TO_MINUTES) + this.minutes + durationToAdd.minutes;
        const minutesPlace: number = minutesSum % Duration.MINUTES_TO_HOURS;
        // Add the hours place.
        const hoursPlace: number = Math.floor(minutesSum / Duration.MINUTES_TO_HOURS) + this.hours + durationToAdd.hours;
        return new Duration(hoursPlace, minutesPlace, secondsPlace, millisPlace);
    }
    
    /**
     * 
     * @param durationToSubtract 
     * @returns 
     */
    minus(durationToSubtract: Duration): Duration {
        // Subtract the milliseconds place, borrow a full second if difference < 0.
        const millisDiff = this.milliseconds - durationToSubtract.milliseconds;
        const millisPlace = millisDiff >= 0 ? millisDiff : millisDiff + Duration.MILLIS_TO_SECONDS;
        // Subtract the seconds place, borrow a full minute, if difference < 0.
        const secondsDiff = this.seconds - Math.floor(millisDiff / Duration.MILLIS_TO_SECONDS) - durationToSubtract.seconds;
        const secondsPlace = secondsDiff >= 0 ? secondsDiff : secondsDiff + Duration.SECONDS_TO_MINUTES;
        // Subtract the minutes place, borrow a full hour, if difference < 0.
        const minutesDiff = this.minutes - Math.floor(secondsDiff / Duration.SECONDS_TO_MINUTES) - durationToSubtract.minutes;
        const minutesPlace = minutesDiff >= 0 ? minutesDiff : minutesDiff + Duration.MINUTES_TO_HOURS;
        // Subtract the hours place.
        const hoursPlace = this.hours - Math.floor(minutesDiff / Duration.MINUTES_TO_HOURS) - durationToSubtract.hours;
        return new Duration(hoursPlace, minutesPlace, secondsPlace, millisPlace);
    }

    // Cloning method for deep copy
    clone() {
        const cloned = new Duration(this.hours, this.minutes, this.seconds, this.milliseconds);
        cloned.id = this.id; // Retain the same ID
        return cloned;
    }
}

export default Duration;