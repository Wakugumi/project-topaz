/**
 * Converts Unix time (in seconds or milliseconds) to a JavaScript Date object.
 * @param unixTime - The Unix timestamp as a number or string.
 * @returns A JavaScript Date object.
 */
export function convertUnixToDate(unixTime: number | string): Date {
	const timestamp = typeof unixTime === 'string' ? parseInt(unixTime, 10) : unixTime;

	// If timestamp is in seconds, convert it to milliseconds.
	return new Date(timestamp < 1e12 ? timestamp * 1000 : timestamp);
}

