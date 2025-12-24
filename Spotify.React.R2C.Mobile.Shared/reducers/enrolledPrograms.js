import * as actionTypes from "../actionTypes/enrolledPrograms"

const initalState = {
    "isFetching": false,
    isDropFetching: false,
    "error": null,
    "canceling": {
        "id": null,
        "isSubmitting": false,
        "error": null,
        "isComplete": false,
        /*		"dropReasonId": null,
                "isValidatingDrop": false*/
    },
    "rescheduling": {
        "id": null,
        "isSubmitting": false,
        "error": null,
        "isComplete": false,
        "newclassid": null
    },
    eligiblity: {
        isSubmitting: false,
        error: null,
        isComplete: false,
        name: "",
        description: "",
    },
    "data": {},

    "dropreasons": []
};


export default (state = initalState, action) => {

    switch (action.type) {
        case actionTypes.ENROLLED_PROGRAM_GET_BY_AGENT:
            {
                state = {
                    ...state,
                    error: null,
                    isFetching: true
                }
                break;
            }
        case actionTypes.ENROLLED_PROGRAM_GET_BY_AGENT_COMPLETE:
            {
                state = {
                    ...state,
                    error: null,
                    isFetching: false,
                    data: action.payload || {}
                }
                break;
            }
        case actionTypes.STAGE_CANCEL_ENROLLMENT:
            {
                state = {
                    ...state,
                    error: null,
                    isFetching: false,
                    canceling: {
                        id: action.payload,
                        isSubmitting: false,
                        isComplete: false,
                        error: null
                    }
                }
                break;
            }
        case actionTypes.CANCEL_ENROLLMENT_COMPLETE:
            {
                state = {
                    ...state,
                    error: null,
                    isFetching: false,
                    canceling: {
                        ...state.canceling,
                        id: action.payload,
                        isSubmitting: false,
                        isComplete: true
                    }
                }
                break;
            }

        case actionTypes.CANCEL_STAGED_ENROLLMENT:
            {
                state = {
                    ...state,
                    // data: action.payload,
                    canceling: {
                        ...state.canceling,
                        isSubmitting: true
                    }
                }
                break;
            }
        case actionTypes.CANCEL_ENROLLMENT_ERROR:
            {
                state = {
                    ...state,
                    canceling: {
                        ...state.canceling,
                        isSubmitting: false,
                        isComplete: false,
                        error: action.payload
                    }
                }
                break;
            }

        case actionTypes.DROP_ENROLLMENT_ERROR:
            {
                state = {
                    ...state,
                    canceling: {
                        ...state.canceling,
                        isSubmitting: false,
                        isComplete: false,
                        error: action.payload
                    }
                }
                break;
            }
        case actionTypes.DROP_ENROLLMENT_COMPLETE:
            {
                state = {
                    ...state,
                    error: null,
                    isFetching: false,
                    canceling: {
                        ...state.canceling,
                        id: action.payload,
                        isSubmitting: false,
                        isComplete: true
                    }
                }
                break;
            }
        case actionTypes.DROP_STAGED_ENROLLMENT:
            {
                state = {
                    ...state,
                    //data: action.payload,
                    canceling: {
                        ...state.canceling,
                        isSubmitting: true
                    }
                }
                break;
            }
        /*		case actionTypes.Stage_Drop_Enrollment:
                    {
                        state = {
                            ...state,
                            error: null,
                            isFetching: false,
                            canceling: {
                                ...state.canceling,
                                dropReasonId: action.payload,
                                isValidatingDrop: true
        
                            }
                        }
                        break;
                    }
        */
        case actionTypes.GET_DROPSTATUSREASON:
            state = {
                ...state,
                error: null,
                isDropFetching: true
            };
            break;

        case actionTypes.GET_DROPSTATUSREASON_COMPLETED:
            state = {
                ...state,
                error: null,
                isDropFetching: false,
                dropreasons: action.payload
            };
            break;

        case actionTypes.GET_DROPSTATUSREASON_ERROR:
            state = {
                ...state,
                isDropFetching: false,
                error: 'Could not retrieve Drop Status Reasons'
            };
            break;


        case actionTypes.STAGE_CLASS_TORESCHEDULE:
            {
                state = {
                    ...state,
                    error: null,
                    isFetching: false,
                    rescheduling: {
                        id: action.payload,
                        isSubmitting: false,
                        isComplete: false,
                        error: null
                    }
                }
                break;
            }
        case actionTypes.RESCHEDULE_CLASS_COMPLETE:
            {
                state = {
                    ...state,
                    error: null,
                    isFetching: false,
                    rescheduling: {
                        ...state.rescheduling,
                        id: action.payload,
                        isSubmitting: false,
                        isComplete: true
                    }
                }
                break;
            }

        case actionTypes.RESCHEDULE_CLASS:
            {
                state = {
                    ...state,
                    // data: action.payload,
                    rescheduling: {
                        ...state.rescheduling,
                        isSubmitting: true
                    }
                }
                break;
            }
        case actionTypes.RESCHEDULE_CLASS_ERROR:
            {
                state = {
                    ...state,
                    rescheduling: {
                        ...state.rescheduling,
                        isSubmitting: false,
                        isComplete: false,
                        error: action.payload
                    }
                }
                break;
            }
        case actionTypes.ELIGIBLITY_CHECK_COMPLETE: {
            state = {
                ...state,
                error: null,
                isFetching: false,
                eligiblity: {
                    ...state.eligiblity,
                    isSubmitting: false,
                    isComplete: true,
                    name: action.payload.name,
                    description: action.payload.description,
                },
            };
            break;
        }

        case actionTypes.ELIGIBLITY_CHECK: {
            state = {
                ...state,
                // data: action.payload,
                eligiblity: {
                    ...state.eligiblity,
                    isSubmitting: true,
                },
            };
            break;
        }
        case actionTypes.ELIGIBLITY_CHECK_ERROR: {
            state = {
                ...state,
                eligiblity: {
                    ...state.eligiblity,
                    isSubmitting: false,
                    isComplete: false,
                    error: action.payload,
                },
            };
            break;
        }
        case actionTypes.CLEAR_ELIGIBLITY_CHECK: {
            state = {
                ...state,
                eligiblity: {
                    name: "",
                    description: "",
                    isSubmitting: false,
                    isComplete: false,
                    error: null
                },
            };
            break;
        }

        default:
            return state;

    }

    return state;
}
