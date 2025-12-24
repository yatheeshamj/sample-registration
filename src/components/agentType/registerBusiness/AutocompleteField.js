import React, { useState } from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import debounce from 'lodash/debounce';
import { useFormikContext } from "formik";
import { TextField, CircularProgress } from '@material-ui/core';
import { useInputStyles } from '../../../styles';

export const AutocompleteField = ({ name, label, fetchOptions, className = "", setFieldTouched, setRecent, id = "" }) => {
    const [loading, setLoading] = useState(false);
    const { setFieldValue } = useFormikContext();
    const [options, setOptions] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    const [open, setOpen] = useState(false);

    const classes = useInputStyles();


    const debouncedFetch = debounce(async (inputValue, selectedkey = "") => {
        setLoading(true);
        const options = await fetchOptions(inputValue, selectedkey);
        setLoading(false);
        //setFieldValue(name, options);
        console.log(options, "debounced fetch")
        const res = options || []
        setOptions(res);
        setOpen(true)
    }, 300);

    const handleInputChange = (event, newInputValue) => {
        // event.preventDefault()
        // console.log(event,event.type,newInputValue,"handle Input change")
        setSearchValue(newInputValue);
        //debouncedFetch(newInputValue);
        if (event && event.type == 'change') {

            debouncedFetch(newInputValue);
        }

    };
    function buildAddress(suggestion) {
        if (!suggestion) return ""; // Return empty string if suggestion is null
        let whiteSpace = " ";
        let modifiedSecondary = suggestion.secondary || "";
        if (suggestion.secondary) {
            if (suggestion.entries > 1) {
                modifiedSecondary += " (" + suggestion.entries + " entries)";
            }
        }
        return suggestion.street_line + whiteSpace + modifiedSecondary + " " + suggestion.city + " " + suggestion.state + " " + suggestion.zipcode;
    }

    function buildSelected(suggestion) {
        if (!suggestion) return ""; // Return empty string if suggestion is null
        console.log(suggestion, "inside build");
        let whiteSpace = "+";
        let modifiedSecondary = suggestion.secondary || "";
        if (suggestion.secondary) {
            if (suggestion.entries > 1) {
                modifiedSecondary += " (" + suggestion.entries + ")";
            }
        }
        return suggestion.street_line + whiteSpace + modifiedSecondary + whiteSpace + suggestion.city + whiteSpace + suggestion.state + whiteSpace + suggestion.zipcode;
    }


    return (
        <div>
            <Autocomplete

                options={options}
                getOptionLabel={(option) => buildAddress(option)}
                value={selectedValue} // Use the selected value to control the Autocomplete value
                inputValue={searchValue} // Manually set the input value
                open={open}
                className={className}
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
                        // className={className}
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
                onChange={(event, newValue) => {
                    console.log(event, newValue, "onchange")
                    if (newValue && newValue.entries < 2) {
                        //close options 
                        setOpen(false)
                        //set search field value

                        setSelectedValue(newValue)

                        //set actual field value and other fields
                        //setField triggers field validation ensure address is validated at last to ensure value is passed correctly
                        setFieldTouched(name, true)
                        setRecent(event.nativeEvent.srcElement.id);
                        setFieldValue("city", newValue["city"])
                        setFieldValue("zipCode", newValue["zipcode"])
                        setFieldValue("address2", newValue["secondary"])
                        const optionsValue = document.getElementById('stateId')
                        for (let i = 0; i < optionsValue.length; i++) {

                            if (newValue["state"] == optionsValue[i].getAttribute('data-state-code')) {
                                setFieldValue("stateId", optionsValue[i].value);
                                break;
                            }
                        }
                        if (name) {
                            setFieldValue(name, newValue["street_line"] + "," + newValue["secondary"] + "," + newValue["city"] + "," + newValue["state"]);
                        }
                        else if (id) {
                            setFieldValue(id, newValue["street_line"] + "," + newValue["secondary"] + "," + newValue["city"] + "," + newValue["state"])
                        }


                    }
                    else {
                        let searchKey = buildAddress(newValue)
                        searchKey = searchKey.split('(')[0]
                        console.log(searchKey, "set")
                        setSearchValue(searchKey)
                        let selected = buildSelected(newValue)

                        //setSearchValue()
                        debouncedFetch(searchKey.replaceAll(" ", "+"), selected.replaceAll(" ", "+"))
                    }
                }}
                onInputChange={handleInputChange}

            />
            {/* {errors['address'] && touched['address'] && <div style={errorStyle}> <ErrorMessage name="name" /></div>} */}
        </div>
    );
};
