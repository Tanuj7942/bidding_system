export class Utility {
    static isValidString(value: string) {
        return value != null && value.trim().length !== 0; 
    }

    static getCurrentTimeInMilliseconds() {
        return Date.now();
    }

    static getFutureTimeInMilliseconds(minutes = 0) {
        return Date.now() + (minutes * 60 * 1000);
    }

    static isValidDate(dateString: string): boolean {
        return !isNaN(new Date(dateString).getTime());
    }
}