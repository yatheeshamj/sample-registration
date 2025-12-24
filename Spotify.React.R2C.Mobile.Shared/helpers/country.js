export const getCurrencySymbolForCountry = (countryCode) => {

	switch (countryCode) {
		case "US": {

			return "$";
		}
		case "GB": {

			return "£";
		}
		case "CA": {

			return "$";
		}

		default:
			{
				return "$";
			}
	}

}

export const getTimeZoneForCountry = (countryCode) => {

	switch (countryCode) {
		case "US": {

			return "ET";
		}
		case "GB": {

			return "UK Time";
		}
		case "CA": {

			return "ET";
		}

		default:
			{
				return "ET";
			}
	}

}

export const getTimeZoneForCountryByCurrency = (currencyCode) => {

	switch (currencyCode) {
		case "$": {

			return "(ET)";
		}
		default:
			{
				return "(UK Time)";
			}
	}

}
