
import {
    getGoogleMapsApiKey
} from './helpers/request';
import { GOOGLE_MAPS_BASE_URL } from '../constants';

export const getUserCountry = (action) => {
    return fetch(
        `${GOOGLE_MAPS_BASE_URL}/geolocation/v1/geolocate?key=${getGoogleMapsApiKey()}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Pragma: "no-cache"
            },
            body: JSON.stringify(action.payload)
        }
    )
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            const { lat, lng } = response.location;
            return fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${getGoogleMapsApiKey()}`,
                {
                    method: 'GET'
                }
            )
                .then((resp) => {
                    return resp.json();
                })
                .then((resp) => {
                    if (!resp.results.length) {
                        return null;
                    } else {
                        return {
                            name:
                                resp.results[resp.results.length - 1].address_components[0]
                                    .long_name,
                            code:
                                resp.results[resp.results.length - 1].address_components[0]
                                    .short_name
                        };
                    }
                });
        })
        .catch((err) => {
            console.log(err);
        });
}
