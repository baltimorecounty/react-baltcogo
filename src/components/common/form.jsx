import React, { Component } from 'react'
import Select from "./select";
import TextArea from "./textarea";
import Joi from "joi-browser";

class Form extends Component {
    state = {}

   

 
    renderTextArea(name, label, type = "text") {
      const { data, errors } = this.state;
      console.log(data);
      return (
        <TextArea
          type={type}
          name={name}
          value={data[name]}
          label={label}
          onChange={this.handleChangeTextArea}
          error={errors[name]}
        />
      );
    }
    renderButton(label) {
      return (
        <button disabled={this.validate()} className="btn btn-primary">
          {label}
        </button>
      );
    }

    renderSelect(name, label, options) {
        const { data, errors } = this.state;

        
        return (
          <Select
            name={name}
            value={data[name]}
            label={label}
            options={options}
            onChange={this.handleChange}
            error={errors[name]}
          />
        );
      }
    }
export default Form;