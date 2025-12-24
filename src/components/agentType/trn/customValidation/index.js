import { asyncFormApi } from '../../../../sagas/api';
import {COUNTRY_IDS} from '../../../../constants'
import { debounce } from 'lodash';
import { param } from 'jquery';

export function asyncValidateTrn(value) {
  let error;
  return new Promise((resolve) => {
    return asyncFormApi
      .asyncValidateSsnByCountry(value, COUNTRY_IDS.JM)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        resolve(err.response);
      });
  }).then((response) => {
    if (response.data) {
      error = response.data;
    } else {
      error = '';
    }
    return error;
  });  
}

export function validateConfirmTrn(value, ssn) {
  let error;
  if (value !== ssn) {
    error = 'Tax Registration Numbers do not match';
  }

  return error;
}

export function persistError(error) {
  return error;
}


export const  asyncValidateTrnNew=async (value,params)=> {
  let contactId;
  if (value=="") return ""
  if (params && params.agentCrmId ) 
    {
      contactId=params.agentCrmId 
    }else {
      contactId="00000000-0000-0000-0000-000000000000"
  }
  try {
    const data=await asyncFormApi.asyncValidateSsnByCountry(value, COUNTRY_IDS.JM,contactId)
    
    return ""
  } catch (error) {
    console.log(error)
    if(error.response.data.message==="TRN already exist"){
      return "TRN already exist"
    }
    return "TRN invalid"
  }
  
}
