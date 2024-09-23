import i18n from "./i18n";

/**
 * VALIDATIONS HAVE BEEN TEMPORARILY COMMENTED OUT DUE TO HTML INPUT[NUMBER]
 * ELEMENTS NOT CAPPING AT THEIR MINIMUM OR MAXIMUM VALUES, WHICH THROWS ERRORS
 * INSIDE THE DURATION AND SCALE CLASSES.
 */

/** 
 * The four mathematical operands. "N/A" is included to accomodate for the first Duration
 * in the array of CalcWrappers.
 */
export type Operand = '+' | '-' | '×' | '÷' | "N/A";

/**
 * Superclass for Duration and Scale.
 */
export class Calculable {

    /**
     * Clones an instance of Calculable.
     * 
     * @returns 
     */
    clone(): Calculable {
        return this;
    }
}

/**
 * A multiplier or a divider for Durations.
 */
export class Scale extends Calculable {
    /** The multiplier or divider for a duration. */
    public value: number;

    /**
     * Creates a new instance of Scale.
     * 
     * @param value the value to multiply/divide the duration by.
     */
    constructor(value: number) {
        // if (value < 0) {
        //     throw new Error("Scale value must be non-negative.");
        // }
        super();
        this.value = isNaN(value) ? 0 : value;

    }

    // Cloning method for deep copy
    clone(): Scale {
        const cloned = new Scale(this.value);
        // cloned.id = this.id; // Retain the same ID
        return cloned;
    }
}

/**
 * A Duration consists of hours, minutes, seconds, and milliseconds.
 * This is a container for a period of time that is not bounded by
 * any specific locale.
 * 
 * Duration arithmetic is performed through mainly long arithmetic, with
 * few instances of conversions. I figured that this would be much faster
 * than converting all the fields into one unit, perform the operation, then
 * reconvert everything back to their original units. That would have been
 * too tedious. I wanted to preserve the integrity of the units by experimenting
 * with a programmatic way to add, subtract, multiply, and divide durations,
 * as a human would.
 */
export class Duration extends Calculable {
    /** The hours place. */
    hours: number;
    /** The minutes place. */
    minutes: number;
    /** The seconds place. */
    seconds: number;
    /** The milliseconds place. */
    milliseconds: number;

    // CONSTRAINTS AND VALIDATION

    // private static readonly MAX_MINUTE_VALUE: number = 59;
    // private static readonly MAX_SECOND_VALUE: number = 59;
    // private static readonly MILLI_VALUE_LIMIT: number = 1000;

    // CONVERSIONS

    /** The number of milliseconds in a second; SHOULD BE 1,000. */
    private static readonly MILLIS_PER_SECOND: number = 1000;
    /** The number of seconds in a minute; SHOULD BE 60. */
    private static readonly SECONDS_PER_MINUTE: number = 60;
    /** The number of minutes in an hour; SHOULD BE 60. */
    private static readonly MINUTES_PER_HOUR: number = 60;
    /** The number of milliseconds in a minute; SHOULD BE 60,000. */
    private static readonly MILLIS_PER_MINUTE = this.MILLIS_PER_SECOND * this.SECONDS_PER_MINUTE;
    /** The number of milliseconds in an hour; SHOULD BE 3,600,000. */
    private static readonly MILLIS_PER_HOUR = this.MILLIS_PER_MINUTE * this.MINUTES_PER_HOUR;
    /** The number of seconds in an hour; SHOULD BE 3,600. */
    private static readonly SECONDS_PER_HOUR = this.SECONDS_PER_MINUTE * this.MINUTES_PER_HOUR;

    /**
     * Creates a new instance of Duration.
     * 
     * @param hours the number of hours; must be at least 0.
     * @param minutes the number of minutes; must be between 0 and 59.
     * @param seconds the number of seconds; must be between 0 and 59.
     * @param milliseconds the number of milliseconds; must be between 0 and 999.
     */
    constructor(hours: number, minutes: number, seconds: number, milliseconds: number) {
        // if (!Number.isInteger(hours) || hours < 0) {
        //     throw new Error("Hours must be a non-negative integer.");
        // }
        // if (!Number.isInteger(minutes) || minutes < 0 || minutes > Duration.MAX_MINUTE_VALUE) {
        //     throw new Error("Minutes must be an integer between 0 and 59.");
        // }
        // if (!Number.isInteger(seconds) || seconds < 0 || seconds > Duration.MAX_SECOND_VALUE) {
        //     throw new Error("Seconds must be an integer between 0 and 59.");
        // }
        // if (milliseconds < 0 || milliseconds >= Duration.MILLI_VALUE_LIMIT) {
        //     throw new Error("Milliseconds must be between 0 (inclusive) and 1000 (exclusive)");
        // }
        super();
        this.hours = isNaN(hours) ? 0 : hours;
        this.minutes = isNaN(minutes) ? 0 : minutes;
        this.seconds = isNaN(seconds) ? 0 : seconds;
        this.milliseconds = isNaN(milliseconds) ? 0 : milliseconds;
    }

    /**
     * Adds two durations together.
     * 
     * @param durationToAdd the duration to add to this instance.
     * @returns the sum of two durations.
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
     * Subtracts a given duration from this instance.
     * 
     * @param durationToSubtract the duration to subtract from this instance.
     * @returns the difference between the two durations.
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
     * Multiplies this duration by a given number.
     * 
     * @param scale the multiplier.
     * @returns the product as a duration.
     */
    times(scale: Scale): Duration {
        const scaleVal: number = scale.value;
        // Step 1
        const hoursProduct: number = this.hours * scaleVal;
        let hoursPlace: number = Math.floor(hoursProduct);
        const hoursRemainder: number = hoursProduct - hoursPlace;
        // Step 2
        const minutesProduct: number = (Duration.MINUTES_PER_HOUR * hoursRemainder) + (this.minutes * scaleVal);
        let minutesPlace: number = Math.floor(minutesProduct);
        const minutesRemainder: number = minutesProduct - minutesPlace;
        // Step 3
        const secondsProduct: number = (Duration.SECONDS_PER_MINUTE * minutesRemainder) + (this.seconds * scaleVal);
        let secondsPlace: number = Math.floor(secondsProduct);
        const secondsRemainder: number = secondsProduct - secondsPlace;
        // Step 4 
        const millisProduct: number = Math.floor((Duration.MILLIS_PER_SECOND * secondsRemainder) + (this.milliseconds * scaleVal));
        let millisPlace: number = millisProduct % Duration.MILLIS_PER_SECOND;
        // Step 5
        const secondsSum: number = Math.floor(millisProduct / Duration.MILLIS_PER_SECOND) + secondsPlace;
        secondsPlace = secondsSum % Duration.SECONDS_PER_MINUTE;
        // Step 6
        const minutesSum: number = Math.floor(secondsProduct / Duration.SECONDS_PER_MINUTE) + minutesPlace;
        minutesPlace = minutesSum % Duration.MINUTES_PER_HOUR;
        // Step 7
        hoursPlace = Math.floor(minutesSum / Duration.MINUTES_PER_HOUR) + hoursPlace;
        return new Duration(hoursPlace, minutesPlace, secondsPlace, millisPlace);
    }

    /**
     * Divides this duration by a given number.
     * 
     * @param scale the divisor; cannot be 0 or else an arithmetic error will be thrown.
     * @returns the quotient as a duration.
     */
    dividedBy(scale: Scale): Duration {
        const scaleVal: number = scale.value;
        // Ensure that the scale is not zero
        if (scaleVal === 0) {
            throw new Error(i18n.t("errors.divideByZero"));
        }
        // Divide the hours place by the scale...
        const hoursQuotient: number = this.hours / scaleVal;
        let hoursPlace: number = Math.floor(hoursQuotient);
        const hoursRemainder: number = hoursQuotient - hoursPlace;
        // Step 2
        const minutesQuotient: number = (Duration.MINUTES_PER_HOUR * hoursRemainder) + (this.minutes / scaleVal);
        let minutesPlace: number = Math.floor(minutesQuotient);
        const minutesRemainder: number = minutesQuotient - minutesPlace;
        // Step 3
        const secondsQuotient: number = (Duration.SECONDS_PER_MINUTE * minutesRemainder) + (this.seconds / scaleVal);
        let secondsPlace: number = Math.floor(secondsQuotient);
        const secondsRemainder: number = secondsQuotient - secondsPlace;
        // Step 4
        const millisQuotient: number = Math.floor((Duration.MILLIS_PER_SECOND * secondsRemainder) + (this.milliseconds / scaleVal));
        let millisPlace: number = millisQuotient % Duration.MILLIS_PER_SECOND;
        // Step 5
        const secondsSum: number = Math.floor(millisQuotient / Duration.MILLIS_PER_SECOND) + secondsPlace;
        secondsPlace = secondsSum % Duration.SECONDS_PER_MINUTE;
        // Step 6
        const minutesSum: number = Math.floor(secondsQuotient / Duration.SECONDS_PER_MINUTE) + minutesPlace;
        minutesPlace = minutesSum % Duration.MINUTES_PER_HOUR;
        // Step 7
        hoursPlace = Math.floor(minutesSum / Duration.MINUTES_PER_HOUR) + hoursPlace;
        return new Duration(hoursPlace, minutesPlace, secondsPlace, millisPlace);

    }

    // Mapping arithmetic symbols to their respective methods
    // Source: https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
    // Need for any in this context. TypeChecking would occur within the actual method.
    /**
     * The mapping of all operands to their respective methods for Duration computation.
     */
    private readonly operationMap: Record<Operand, (calculable: any) => Duration> = {
        '+': this.plus.bind(this),
        '-': this.minus.bind(this),
        '×': this.times.bind(this),
        '÷': this.dividedBy.bind(this),

        // For debugging
        "N/A": (calculable: any) => { throw new Error("Please place conditionals before calling operationMap.") }
    };

    // Perform the calculation based on the symbol
    // Article of Reference: https://www.typescripttutorial.net/typescript-tutorial/typescript-function-overloadings/
    // performCalculation(argument: Duration, opSymbol: '+' | '-'): Duration;
    // performCalculation(argument: Scale, opSymbol: '×' | '÷'): Duration;
    /**
     * Performs a calculation on the current values of the Duration with the
     * given operand and Calculable passed.
     * 
     * @param argument either a Duration or a Scale.
     * @param opSymbol the operand; must be + or - if the Calculable is a Duration; must be × or ÷ if the Calculable is a Scale.
     * @returns the calculated Duration.
     */
    performCalculation(argument: Calculable, opSymbol: Operand): Duration {
        const operation = this.operationMap[opSymbol];
        return operation(argument);
    }

    /**
     * Converts the minutes, seconds, and milliseconds fields into hours and adds
     * them all to the hours field.
     * 
     * @returns the duration expressed as a decimal number of hours.
     */
    toHours(): number {
        const minutesToPartialHour: number = this.minutes / Duration.MINUTES_PER_HOUR;
        const secondsToPartialHour: number = this.seconds / Duration.SECONDS_PER_HOUR;
        const millisToPartialHour: number = this.milliseconds / Duration.MILLIS_PER_HOUR;
        return (this.hours + minutesToPartialHour + secondsToPartialHour + millisToPartialHour);
    }

    /**
     * Converts the hours, seconds, and milliseconds fields into minutes and adds
     * them all to the minutes field.
     * 
     * @returns the duration expressed as a decimal number of minutes.
     */
    toMinutes(): number {
        const hoursToMinutes: number = this.hours * Duration.MINUTES_PER_HOUR;
        const secondsToPartialMinute: number = this.seconds / Duration.SECONDS_PER_MINUTE;
        const millisToPartialMinute: number = this.milliseconds / Duration.MILLIS_PER_MINUTE;
        return (hoursToMinutes + this.minutes + secondsToPartialMinute + millisToPartialMinute);
    }

    /**
     * Converts the hours, minutes, and milliseconds fields into seconds and adds
     * them all to the seconds field.
     * 
     * @returns the duration expressed as a decimal number of seconds.
     */
    toSeconds(): number {
        const hoursToSeconds: number = this.hours * Duration.SECONDS_PER_HOUR;
        const minutesToSeconds: number = this.minutes * Duration.SECONDS_PER_MINUTE;
        const millisToPartialSecond: number = this.milliseconds / Duration.MILLIS_PER_SECOND;
        return (hoursToSeconds + minutesToSeconds + this.seconds + millisToPartialSecond);
    }

    /**
     * Converts the hours, minutes, and seconds fields into hours and adds
     * them all to the hours field.
     * 
     * @returns the duration expressed as a decimal number of hours.
     */
    toMilliseconds(): number {
        const hoursToMillis: number = this.hours * Duration.MILLIS_PER_HOUR;
        const minutesToMillis: number = this.minutes * Duration.MILLIS_PER_MINUTE;
        const secondsToMillis: number = this.seconds * Duration.MILLIS_PER_SECOND;
        return (hoursToMillis + minutesToMillis + secondsToMillis + this.milliseconds);
    }

    // Cloning method for deep copy
    clone(): Duration {
        const cloned = new Duration(this.hours, this.minutes, this.seconds, this.milliseconds);
        // cloned.id = this.id; // Retain the same ID
        return cloned;
    }

    // toReadable() {
    //     return `${this.hours} hours, ${this.minutes} minutes, ${this.seconds} seconds, ${this.milliseconds} millisecoinds`;
    // }
}

/**
 * A container for a Duration/Scale and mathematical operand.
 * Useful mapping so that the correct operation can be performed
 * on the running total of the duration, without having to create
 * a separate array.
 */
export class CalcWrapper {
    /** the operand. */
    operand: Operand;
    /** the duration or the scale. */
    durationCalculable: Calculable;

    /**
     * Creates a new instance of CalcWrapper.
     * 
     * @param operand the operand.
     * @param durationCalculable the duration or the scale.
     */
    constructor(operand: Operand, durationCalculable: Calculable) {
        this.operand = operand;
        this.durationCalculable = durationCalculable;
    }

    /**
     * Clones an instance of CalcWrapper.
     * 
     * @returns the cloned instance.
     */
    clone() {
        const clonedCalculable: Calculable = this.durationCalculable.clone();
        const clonedInstance = new CalcWrapper(this.operand, clonedCalculable);
        return clonedInstance;
    }
}

// Type guard for Duration
/**
 * Checks whether a given Calculable is a Duration.
 * 
 * @param calculable the Calculable to check.
 * @returns true if it's a Duration; false otherwise.
 */
export function isDuration(calculable: Calculable): calculable is Duration {
    return calculable instanceof Duration;
}

// Type guard for Scale
/**
 * Checks whether a given Calculable is a Scale.
 * 
 * @param calculable the Calculable to check.
 * @returns true if it's a Scale; false otherwise.
 */
export function isScale(calculable: Calculable): calculable is Scale {
    return calculable instanceof Scale;
}