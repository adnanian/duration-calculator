export type ArithmeticSymbol = '+' | '-' | '×' | '÷';

export default class Duration {
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
    private static readonly MILLIS_PER_SECOND: number = 1000;
    private static readonly SECONDS_PER_MINUTE: number = 60;
    private static readonly MINUTES_PER_HOUR: number = 60;

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
        const millisPlace: number = millisSum % Duration.MILLIS_PER_SECOND;
        // Add the seconds place, carry the 1 to minutes if sum >= 60.
        const secondsSum: number = Math.floor(millisSum / Duration.MILLIS_PER_SECOND) + this.seconds + durationToAdd.seconds;
        const secondsPlace: number = secondsSum % Duration.SECONDS_PER_MINUTE;
        // Add the minutes place, carry the 1 to hours if sum >= 60.
        const minutesSum: number = Math.floor(secondsSum / Duration.SECONDS_PER_MINUTE) + this.minutes + durationToAdd.minutes;
        const minutesPlace: number = minutesSum % Duration.MINUTES_PER_HOUR;
        // Add the hours place.
        const hoursPlace: number = Math.floor(minutesSum / Duration.MINUTES_PER_HOUR) + this.hours + durationToAdd.hours;
        return new Duration(hoursPlace, minutesPlace, secondsPlace, millisPlace);
    }
    
    /**
     * 
     * @param durationToSubtract 
     * @returns 
     */
    minus(durationToSubtract: Duration): Duration {
        // Subtract the milliseconds place, borrow a full second if difference < 0.
        const millisDiff: number = this.milliseconds - durationToSubtract.milliseconds;
        const millisPlace: number = millisDiff >= 0 ? millisDiff : millisDiff + Duration.MILLIS_PER_SECOND;
        // Subtract the seconds place, borrow a full minute, if difference < 0.
        const secondsDiff: number = Math.floor(millisDiff / Duration.MILLIS_PER_SECOND) + this.seconds - durationToSubtract.seconds;
        const secondsPlace: number = secondsDiff >= 0 ? secondsDiff : secondsDiff + Duration.SECONDS_PER_MINUTE;
        // Subtract the minutes place, borrow a full hour, if difference < 0.
        const minutesDiff: number = Math.floor(secondsDiff / Duration.SECONDS_PER_MINUTE) + this.minutes - durationToSubtract.minutes;
        const minutesPlace: number = minutesDiff >= 0 ? minutesDiff : minutesDiff + Duration.MINUTES_PER_HOUR;
        // Subtract the hours place.
        const hoursPlace: number = Math.floor(minutesDiff / Duration.MINUTES_PER_HOUR) + this.hours - durationToSubtract.hours;
        return new Duration(hoursPlace, minutesPlace, secondsPlace, millisPlace);
    }

    /**
     * 
     * @param scale 
     * @returns 
     */
    times(scale: number): Duration {
        // Multiple the milliseconds place by the scale, then carry the full seconds to the seconds place.
        const millisProduct: number = this.milliseconds * scale;
        const millisPlace: number = millisProduct % Duration.MILLIS_PER_SECOND;
        // Multiply the seconds place by the scale, then carry the full minutes to the minutes place.
        const secondsProduct: number = Math.floor(millisProduct / Duration.MILLIS_PER_SECOND) + (this.seconds * scale);
        const secondsPlace: number = secondsProduct % Duration.SECONDS_PER_MINUTE;
        // Multiply the minutes place by the scale, then carry the full minutes to the hours place.
        const minutesProduct: number = Math.floor(secondsProduct / Duration.SECONDS_PER_MINUTE) + (this.minutes * scale);
        const minutesPlace: number = minutesProduct % Duration.MINUTES_PER_HOUR;
        // Multiply the hours place by the scale.
        const hoursPlace: number = Math.floor(minutesProduct / Duration.MINUTES_PER_HOUR) + (this.hours * scale);
        return new Duration(hoursPlace, minutesPlace, secondsPlace, millisPlace);
    }

    /**
     * 
     * @param scale 
     * @returns 
     */
    dividedBy(scale: number): Duration {
        // Divide the hours place by the scale...
        const hoursQuotient: number = this.hours / scale;
        const hoursPlace: number = Math.floor(hoursQuotient);
        const hoursRemainder: number = hoursQuotient - hoursPlace;
        //
        const minutesQuotient: number = (Duration.MINUTES_PER_HOUR * hoursRemainder) + (this.minutes / scale);
        const minutesPlace: number = Math.floor(minutesQuotient);
        const minutesRemainder: number = minutesQuotient - minutesPlace;
        //
        const secondsQuotient: number = (Duration.SECONDS_PER_MINUTE * minutesRemainder) + (this.seconds / scale);
        const secondsPlace: number = Math.floor(secondsQuotient);
        const secondsRemainder: number = secondsQuotient - secondsPlace;
        //
        const millisPlace: number = Math.floor((Duration.MILLIS_PER_SECOND * secondsRemainder) + (this.milliseconds / scale));
        return new Duration(hoursPlace, minutesPlace, secondsPlace, millisPlace);

    }

    // Mapping arithmetic symbols to their respective methods
    // Source: https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
    private readonly operationMap: Record<ArithmeticSymbol, (d: Duration) => Duration> = {
        '+': this.plus.bind(this),
        '-': this.minus.bind(this),
        '×': (d: Duration) => { throw new Error("Multiplication not implemented yet."); },
        '÷': (d: Duration) => { throw new Error("Division not implemented yet."); }
    };

    // Perform the calculation based on the symbol
    performCalculation(argument: Duration, opSymbol: ArithmeticSymbol): Duration {
        const operation = this.operationMap[opSymbol];
        if (!operation) {
            throw new Error(`Operation '${opSymbol}' not supported.`);
        }
        return operation(argument);
    }

    // Cloning method for deep copy
    clone() {
        const cloned = new Duration(this.hours, this.minutes, this.seconds, this.milliseconds);
        cloned.id = this.id; // Retain the same ID
        return cloned;
    }

    toReadable() {
        return `${this.hours} hours, ${this.minutes} minutes, ${this.seconds} seconds, ${this.milliseconds} millisecoinds`;
    }
}