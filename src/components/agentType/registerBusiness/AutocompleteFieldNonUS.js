import React, { useState } from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import debounce from 'lodash/debounce';
import { useFormikContext } from "formik";
import { TextField, CircularProgress } from '@material-ui/core';
import { SMARTY_ADDRESS_NON_US, SMARTY_API_KEY } from "../../../config";
import { useInputStyles } from '../../../styles';
//Smarty Implemenatation  for non us countries

export const AutocompleteFieldNonUS = ({ name, label, fetchOptions, className, setFieldTouched, setRecent, countryISO }) => {

    const [loading, setLoading] = useState(false);
    const { setFieldValue } = useFormikContext();
    const [options, setOptions] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    const [open, setOpen] = useState(false);

    const classes = useInputStyles();


    const debouncedFetch = debounce(async (inputValue, addressId) => {
        setLoading(true);
        const options = await fetchOptions(inputValue, addressId);
        setLoading(false);
        //setFieldValue(name, options);

        const res = options || []

        setOptions(res);
        setOpen(true)
    }, 300);

    const handleInputChange = (event, newInputValue) => {

        setSearchValue(newInputValue);
        if (event && event.type == 'change') {
            debouncedFetch(newInputValue);
        }

    };
    function buildAddress(suggestion) {
        if (!suggestion) return ""; // Return empty string if suggestion is null
        if (suggestion.entries && suggestion.entries > 1) {
            return suggestion.address_text + " (" + suggestion.entries + " entries)";
        }
        return suggestion.address_text;
    }


    return (
        <div>
            <Autocomplete

                options={options}
                getOptionLabel={(option) => buildAddress(option)}
                value={selectedValue} // Use the selected value to control the Autocomplete value
                inputValue={searchValue} // Manually set the input value
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        variant="outlined"
                        classes={{ root: classes.root }}
                        className={className}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
                onChange={async (event, newValue) => {
                    console.log(newValue, "onchange")
                    if (newValue && newValue.entries && newValue.entries < 2) {
                        let addressId = newValue.address_id;
                        setOpen(false);
                        //set search field value

                        setSelectedValue(newValue);
                        //make api call to with addressId to get details
                        //set actual field value and other fields
                        const data = await fetch(`${SMARTY_ADDRESS_NON_US}/v2/lookup/${addressId}?key=${SMARTY_API_KEY}&country=${countryISO}`);
                        const { candidates } = await data.json();
                        console.log("candidates-->",candidates);

                        setFieldValue("city", candidates[0]["locality"]);
                        setFieldValue("zipCode", candidates[0]["postal_code"]);
                        setFieldTouched(name, true);

                        const optionsValue = document.getElementById('provinceId');
                        if (optionsValue) {
                            console.log("optionsValue->",optionsValue);
                            for (let i = 0; i < optionsValue.length; i++) {
                                
                                console.log(candidates[0]["administrative_area_short"], optionsValue[i].getAttribute('data-state-code'), "heello");
                                if (candidates[0]["administrative_area_short"] === optionsValue[i].getAttribute('data-state-code')) {
                                    console.log("setvalue", optionsValue[i].value, optionsValue[i].getAttribute('data-state-code'));
                                    setFieldValue("provinceId", optionsValue[i].value);
                                    //optionsValue[i].selected=true;
                                    break;
                                }else if (candidates[0]["administrative_area"] == optionsValue[i].getAttribute('data-state-code')) {
                                    console.log("setvalue", optionsValue[i].value, optionsValue[i].getAttribute('data-state-code'));
                                    setFieldValue("provinceId", optionsValue[i].value);
                                    //optionsValue[i].selected=true;
                                    break;
                                }
                            }
                        }

                        setFieldValue(name, candidates[0]["street"]);
                    } else if (newValue) {
                        let searchKey = buildAddress(newValue);
                        searchKey = searchKey.split(' (')[0];
                        debouncedFetch("", newValue.address_id);
                        setSearchValue(searchKey);
                    }
                }}

                onInputChange={handleInputChange}

            />
            {/* {errors['address'] && touched['address'] && <div style={errorStyle}> <ErrorMessage name="name" /></div>} */}
        </div>
    );
};
