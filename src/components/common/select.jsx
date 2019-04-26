import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
    console.log(options);
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name} {...rest} className="form-control">
                 <option value="">--Please select a category ---</option> 
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.type}
                    </option>
                ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
    
        </div>
    );
};

export default Select;
