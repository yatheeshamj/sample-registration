import * as Yup from 'yup';

// const AadharScheme = '';

const AadharScheme = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    ssn: Yup.string()
        .matches(/^[2-9]{1}[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}$/, 'Invalid PAN number')
        .required('Aadhar number is required'),
    ssnConfirm: Yup.string()
        .oneOf([Yup.ref('ssn'), null], 'Aadhar numbers must match')
        .required('Aadhar confirm is required'),
});


export default AadharScheme;
