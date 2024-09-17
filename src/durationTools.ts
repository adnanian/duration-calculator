export type Operand = '+' | '-' | '×' | '÷' | "N/A";

export class Calculable {
    // constructor() {
    // }

    clone(): Calculable {
        return this;
    }
}

export class Scale extends Calculable {
    public value: number;

    constructor(value: number) {
        if (value < 0) {
            throw new Error("Scale value must be non-negative.");
        }
        super();
        this.value = value;

    }

    // Cloning method for deep copy
    clone(): Scale {
        const cloned = new Scale(this.value);
        // cloned.id = this.id; // Retain the same ID
        return cloned;
    }
}

export class Duration extends Calculable {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;

    // CONSTRAINTS AND VALIDATION
    private static readonly MAX_MINUTE_VALUE: number = 59;
    private static readonly MAX_SECOND_VALUE: number = 59;
    private static readonly MILLI_VALUE_LIMIT: number = 1000;

    // CONVERSIONS
    private static readonly MILLIS_PER_SECOND: number = 1000;
    private static readonly SECONDS_PER_MINUTE: number = 60;
    private static readonly MINUTES_PER_HOUR: number = 60;

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
        super();
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.milliseconds = milliseconds;
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
     * @param scaleVal 
     * @returns 
     */
    times(scale: Scale): Duration {
        const scaleVal: number = scale.value;
        // Multiple the milliseconds place by the scale, then carry the full seconds to the seconds place.
        const millisProduct: number = this.milliseconds * scaleVal;
        const millisPlace: number = millisProduct % Duration.MILLIS_PER_SECOND;
        // Multiply the seconds place by the scale, then carry the full minutes to the minutes place.
        const secondsProduct: number = Math.floor(millisProduct / Duration.MILLIS_PER_SECOND) + (this.seconds * scaleVal);
        const secondsPlace: number = secondsProduct % Duration.SECONDS_PER_MINUTE;
        // Multiply the minutes place by the scale, then carry the full minutes to the hours place.
        const minutesProduct: number = Math.floor(secondsProduct / Duration.SECONDS_PER_MINUTE) + (this.minutes * scaleVal);
        const minutesPlace: number = minutesProduct % Duration.MINUTES_PER_HOUR;
        // Multiply the hours place by the scale.
        const hoursPlace: number = Math.floor(minutesProduct / Duration.MINUTES_PER_HOUR) + (this.hours * scaleVal);
        return new Duration(hoursPlace, minutesPlace, secondsPlace, millisPlace);
    }

    /**
     * 
     * @param scale 
     * @returns 
     */
    dividedBy(scale: Scale): Duration {
        const scaleVal: number = scale.value;
        // Divide the hours place by the scale...
        const hoursQuotient: number = this.hours / scaleVal;
        const hoursPlace: number = Math.floor(hoursQuotient);
        const hoursRemainder: number = hoursQuotient - hoursPlace;
        //
        const minutesQuotient: number = (Duration.MINUTES_PER_HOUR * hoursRemainder) + (this.minutes / scaleVal);
        const minutesPlace: number = Math.floor(minutesQuotient);
        const minutesRemainder: number = minutesQuotient - minutesPlace;
        //
        const secondsQuotient: number = (Duration.SECONDS_PER_MINUTE * minutesRemainder) + (this.seconds / scaleVal);
        const secondsPlace: number = Math.floor(secondsQuotient);
        const secondsRemainder: number = secondsQuotient - secondsPlace;
        //
        const millisPlace: number = Math.floor((Duration.MILLIS_PER_SECOND * secondsRemainder) + (this.milliseconds / scaleVal));
        return new Duration(hoursPlace, minutesPlace, secondsPlace, millisPlace);

    }

    // Mapping arithmetic symbols to their respective methods
    // Source: https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
    // Need for any in this context. TypeChecking would occur within the actual method.
    private readonly operationMap: Record<Operand, (calculable: any) => Duration> = {
        '+': this.plus.bind(this),
        '-': this.minus.bind(this),
        '×': this.times.bind(this),
        '÷': this.dividedBy.bind(this),
        "N/A": (calculable: any) => { throw new Error("Please place conditionals before calling operationMap.") }
    };

    // Perform the calculation based on the symbol
    // Article of Reference: https://www.typescripttutorial.net/typescript-tutorial/typescript-function-overloadings/
    // performCalculation(argument: Duration, opSymbol: '+' | '-'): Duration;
    // performCalculation(argument: Scale, opSymbol: '×' | '÷'): Duration;
    performCalculation(argument: Calculable, opSymbol: Operand): Duration {
        const operation = this.operationMap[opSymbol];
        return operation(argument);
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

export class CalcWrapper {
    id: number
    operand: Operand;
    durationCalculable: Calculable;

    static idIncrement: number = 0;

    constructor(operaton: Operand, durationCalculable: Calculable) {
        this.operand = CalcWrapper.idIncrement === 0 ? "N/A" : operaton;
        if (durationCalculable instanceof Scale && CalcWrapper.idIncrement === 0) {
            throw new Error("The first calculable container must contain a Duration and NOT a scale.");
        }
        this.durationCalculable = durationCalculable;
        this.id = CalcWrapper.idIncrement++;
    }

    clone() {
        const clonedCalculable: Calculable = this.durationCalculable.clone();
        const clonedInstance = new CalcWrapper(this.operand, clonedCalculable);
        clonedInstance.id = this.id;
        return clonedInstance;
    }
}

// Type guard for Duration
export function isDuration(calculable: Calculable): calculable is Duration {
    return calculable instanceof Duration;
}

// Type guard for Scale
export function isScale(calculable: Calculable): calculable is Scale {
    return calculable instanceof Scale;
}