import { getWithAuthRequest } from './helpers/request';
import { getBaseUrl } from "./helpers/request"


export const retrieveGlobalParameters = props => {
	return getWithAuthRequest(`${getBaseUrl()}common/parameters/${props}`);
}
