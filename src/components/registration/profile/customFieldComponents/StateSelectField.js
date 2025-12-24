import React, { Component } from 'react';
import Select, { createFilter } from 'react-select';

const filterConfig = {
  ignoreCase: true,
  matchFrom: 'start'
};

class StateSelectField extends Component {
  state = {
    selectedOption: null
  };
  handleChange = (selectedOption) => {
    this.setState({
      selectedOption
    });
    this.props.setRecent(this.props.name);
    this.props.onChange(this.props.name, selectedOption.value);
  };

  render() {
    const { error, touched } = this.props;

    const customStyles = {
      control: (styles) => {
        return {
          ...styles,
          borderRadius: '4px',
          border: error && touched ? '1.5px solid #d4003b' : '1.5px solid #ced4da',
          boxShadow: 'none',
          cursor: 'pointer',
          fontSize:'14px',
          fontWeight: 400,
          color: '#495057 !important',
          verticalAlign: 'middle'
        };
      },
      valueContainer: (styles) => ({
        ...styles
      }),
      indicatorSeparator: () => ({ display: 'none' }),
      indicatorsContainer: (styles) => ({
        ...styles,
      }),
      placeholder: (styles) => ({ ...styles, color: '#455154' }),
      singleValue: (styles) => ({
        ...styles,
        color: '#455154',
        fontFamily: 'OpenSans'
      }),
      option: (styles, { data, isFocused, isSelected }) => {
        return {
          ...styles,
          backgroundColor: isSelected
            ? '#b6b6b6'
            : isFocused
            ? '#b6b6b6'
            : null,
          '&:active': { backgroundColor: '#b6b6b6' },
          color: '#455154',
          fontFamily: 'OpenSans',
          fontSize: 14
        };
      }
    };

    return (
      <div>
        <Select
          id='color'
          styles={customStyles}
          isSearchable={true}
          options={this.props.options}
          onChange={this.handleChange}
          value={this.state.selectedOption}
          placeholder={this.props.placeholder}
          filterOption={createFilter(filterConfig)}
        />
        {!!this.props.error && this.props.touched && (
          <div className={this.props.errorClassName}>{this.props.error}</div>
        )}
      </div>
    );
  }
}

export default StateSelectField;
