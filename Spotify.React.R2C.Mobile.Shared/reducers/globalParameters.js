import * as actionTypes from "../actionTypes/globalParameters"

const initalState = {
	"isFetching": false,
	"error": null,
	"data": {}
};

//state must be Immutable 
export default (state = initalState, action) => {

	switch (action.type) {

		case actionTypes.RETRIEVEGLOBALPARAMETER:
			state = {
				...state,
				"isFetching": true,
				error: '',
			};
			break;

		case actionTypes.RETRIEVEGLOBALPARAMETERCOMPLETE:
			state = {
				...state,
				data: {
					...state.data,
					"isFetching": false,
					[action.payload[0]]: action.payload[1]
				}
			};

			break;

		case actionTypes.RETRIEVEGLOBALPARAMETERERROR:
			state = {
				...state,
				"isFetching": false,
				"globalParamName": "",
				error: action.payload
			};

			break;

		default:
			return state;

	}

	return state;
}
