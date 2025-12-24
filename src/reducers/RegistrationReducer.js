import {
    REGISTER_REDIRECT,
    CREATE_AGENT_PROFILE,
    CREATE_AGENT_PROFILE_COMPLETED,
    CREATE_AGENT_PROFILE_FAILED,
    GET_AGENT_PROFILE_COMPLETED,
    GET_AGENT_PROFILE_FAILED,
    GET_USER_COUNTRY_COMPLETED,
    GET_USER_COUNTRY_FAILED,
    GET_COUNTRIES_COMPLETED,
    GET_COUNTRIES_FAILED,
    GET_STATES_COMPLETED,
    GET_STATES_FAILED,
    GET_PROVINCES_COMPLETED,
    GET_PROVINCES_FAILED,
    GET_PARISHES,
    GET_PARISHES_COMPLETED,
    GET_PARISHES_FAILED,
    CHECK_IF_JM_CONSENT_SIGNED_SUCCESS,
    UPDATE_LANGUAGE_PREFERENCE

} from '../types/registrationTypes';

import { LOGOUT_USER_COMPLETED } from '../types/loginTypes';

import { GET_ADMISSION_STEP_INSTANCES_COMPLETED } from '../types/admissionStepTypes';

const initialState = {
    profile: {
        isSubmitting: false,
        isComplete: false,
        isCountryFoundByIP: null,
        isFetchCountryComplete: false,
        isFetchCountriesComplete: false,
        isFetchStatesComplete: false,
        isFetchProvincesComplete: false,
        isFetchUserProfileComplete: false,
        formOptions: {
            countries: [],
            states: [],
            provinces: []
        },
        formInfo: {
            countryId: '',
            countryObj: {},
            stateId: '',
            provinceId: '',
            firstName: '',
            middleInitial: '',
            lastName: '',
            email: '',
            username: '',
            mobilePhone: '',
            terms: false,
            password: ''
        },
        error: '',
        signPending: {
            isrequired: false
        },

    },
    updateLanguagePreference: undefined,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REDIRECT:
            state = {
                ...state,
                regForm: {
                    ...state.profile.formInfo
                }
            };
            break;

        case CREATE_AGENT_PROFILE:
            state = {
                ...state,
                profile: {
                    ...state.profile,
                    isSubmitting: true
                }
            };
            break;

        case CREATE_AGENT_PROFILE_COMPLETED:
            state = {
                ...state,
                profile: {
                    ...state.profile
                }
            };
            break;

        case CREATE_AGENT_PROFILE_FAILED:
            state = {
                ...state,
                profile: {
                    ...state.profile,
                    isSubmitting: false,
                    error: 'Username Not unique'
                }
            };
            break;

        case GET_AGENT_PROFILE_COMPLETED:
            state = {
                ...state,
                profile: {
                    ...state.profile,
                    isFetchUserProfileComplete: true,
                    formInfo: action.payload.data
                }
            };
            break;

        case GET_AGENT_PROFILE_FAILED:
            state = {
                ...state,
                profile: {
                    ...state.profile,
                    isFetchUserProfileComplete: true
                }
            };
            break;

        case GET_USER_COUNTRY_COMPLETED:
            state = {
                ...state,
                profile: {
                    ...state.profile,
                    isFetchCountryComplete: true,
                    isCountryFoundByIP: action.payload.data.isCountryFoundByIP,
                    formInfo: {
                        ...state.profile.formInfo,
                        countryObj: action.payload.data
                    }
                }
            };
            break;

        case GET_USER_COUNTRY_FAILED:
            state = {
                ...state,
                profile: {
                    ...state.profile,
                    isFetchCountryComplete: true,
                    isCountryFoundByIP: false
                }
            };
            break;

        case GET_COUNTRIES_COMPLETED:
            state = {
                ...state,
                profile: {
                    ...state.profile,
                    isFetchCountriesComplete: true,
                    formOptions: {
                        ...state.profile.formOptions,
                        countries: action.payload.data
                    }
                }
            };
            break;

        case GET_COUNTRIES_FAILED:
            // TODO: some error to show user
            break;

        case GET_STATES_COMPLETED:
            state = {
                ...state,
                profile: {
                    ...state.profile,
                    isFetchStatesComplete: true,
                    formOptions: {
                        ...state.profile.formOptions,
                        states: action.payload.data
                    }
                }
            };
            break;

        case GET_STATES_FAILED:
            // TODO: some error to show user
            break;

        case GET_PROVINCES_COMPLETED:
        case GET_PARISHES_COMPLETED:
            state = {
                ...state,
                profile: {
                    ...state.profile,
                    isFetchProvincesComplete: true,
                    formOptions: {
                        ...state.profile.formOptions,
                        provinces: action.payload.data
                    }
                }
            };
            break;

        case GET_PROVINCES_FAILED:
        case GET_PARISHES_FAILED:
            // TODO: some error to show user
            break;

        case GET_ADMISSION_STEP_INSTANCES_COMPLETED:
            state = {
                ...state,
                profile: {
                    ...state.profile,
                    isSubmitting: false
                }
            };
            break;

        case LOGOUT_USER_COMPLETED:
            state = initialState;
            break;

        // Update User's language preference
        case UPDATE_LANGUAGE_PREFERENCE:
            state = {
                ...state,
                updateLanguagePreference: action.payload
            };
            break;

        case CHECK_IF_JM_CONSENT_SIGNED_SUCCESS:
            state = {
                ...state,
                profile: {
                    ...state.profile,
                    signPending: {
                        ...state.profile.signPending,
                        isrequired: action.payload
                    }
                }

            }
            break;
        default:
            return state;
    }
    return state;
};
