import { makeStyles } from '@material-ui/core/styles';


export const useInputStyles = makeStyles({
  root: {
    '& label.Mui-focused': {
      color: '#00827E',
    },
    '& input:valid:focus + fieldset': {
      borderColor: '#00827E'
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#00827E",
    },
    "& .MuiOutlinedInput-input": {
      paddingLeft: '16px',
      paddingRight: '6px',
      paddingTop: '9px',
      paddingBottom: '9px',

    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#00827E"
    },
    "& .MuiInputBase-input.Mui-disabled": {
      cursor: 'not-allowed'
    },
    error: {
      main: "#ff604f"
    },
    rootParish: {
      marginBottom: "15px"
    }
  }
});

export const useStyles = () => ({
  root: {
    '& label.Mui-focused': {
      color: '#00827E',
    },
    '& input:valid:focus + fieldset': {
      borderColor: '#00827E'
    }
  }
});
