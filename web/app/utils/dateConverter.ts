/**
 * Defines the formatting options for a date.
 *
 * Each property corresponds to an option recognized by the built-in `toLocaleDateString` method.
 * Depending on the specified values, the output can vary in precision and style.
 */
export interface IDateOptions {
  /**
   * The representation of the year.
   * - "numeric": e.g., 2024
   * - "2-digit": e.g., 24
   */
  year?: "numeric" | "2-digit";

  /**
   * The representation of the month.
   * - "numeric": e.g., 12
   * - "2-digit": e.g., 12
   * - "long": e.g., December
   * - "short": e.g., Dec
   * - "narrow": e.g., D
   */
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";

  /**
   * The representation of the day of the month.
   * - "numeric": e.g., 31
   * - "2-digit": e.g., 31
   */
  day?: "numeric" | "2-digit";

  /**
   * The representation of the hour.
   * - "numeric": e.g., 23
   * - "2-digit": e.g., 23
   */
  hour?: "numeric" | "2-digit";

  /**
   * The representation of the minute.
   * - "numeric": e.g., 59
   * - "2-digit": e.g., 59
   */
  minute?: "numeric" | "2-digit";

  /**
   * The representation of the second.
   * - "numeric": e.g., 59
   * - "2-digit": e.g., 59
   */
  second?: "numeric" | "2-digit";

  /**
   * The representation of the time zone name.
   * - "long": e.g., Pacific Standard Time
   * - "short": e.g., PST
   */
  timeZoneName?: "long" | "short";
}

/**
 * A utility class for converting and formatting dates.
 *
 * Provides a static method to transform a string representation of a date into
 * a localized, human-readable date format using `toLocaleDateString`.
 */
export class DateConverter {
  /**
   * Converts a date string into a human-readable date format.
   *
   * @param dateString - A string representing a date (e.g., "2024-12-17T10:00:00Z").
   *
   * @returns A formatted date string based on the user's default locale settings.
   * By default, this includes the full year, the full month name, and the numeric day.
   *
   * @example
   * ```typescript
   * const formattedDate = DateConverter.formatDateFromString("2024-12-17T10:00:00Z");
   * console.log(formattedDate); // "December 17, 2024" (format may vary by locale)
   * ```
   */
  static formatDateFromString(dateString: string): string {
    const date = new Date(dateString);

    const options: IDateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString(undefined, options);
  }
}
