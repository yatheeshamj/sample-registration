import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import { useStyles } from '../../../../styles'
import { withStyles } from "@material-ui/core/styles";

class PhoneField extends Component {
  state = {
    userInput: null
  };

  handleChange = (userInput) => {
    this.setState({
      userInput
    });
    this.props.setRecent(this.props.name);
    this.props.onChange(this.props.name, userInput.value);
  };

  handleBlur = () => {
    this.props.setRecent(this.props.name);
    if (!this.props.touched) {
      this.props.onBlur(this.props.name, true, true);
    } else {
      this.props.setRecent('');
    }
  }

  render() {
    const { className, placeholder, name, classes, error, touched } = this.props;
    return (
      <div>
        <NumberFormat
          id={name}
          format='##### ######'
          mask=''
          type='tel'
          size="small"
          variant="outlined"
          name={name}
          className={className}
          label={placeholder}
          onValueChange={this.handleChange}
          onBlur={this.handleBlur}
          customInput={TextField}
          fullWidth
          // helperText={error && touched ? error : ''}
          classes={{ root: !(error && touched) && classes.root }}
          error={error && touched ? true : false}
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(PhoneField);
