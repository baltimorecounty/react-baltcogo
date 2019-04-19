//import React, { Component } from 'react'
import Form from "./common/form";
import { Formik } from 'formik'
import Select from "./select";
import { getReportType } from '../services/fakeReportType';
import { getSubCategoryType, getSubCategoryType1 } from '../services/fakeSubReportType';

class ReportType extends Form {
    // constructor(props) {
    //    super(props);
    state = {
        isSubCategoryHidden: false,
        data: {
            typeId: ""
        },
        datasub: {

            subtypeId: ""
        },
        reporttypes: [],
        reportsubcateories: [],
        errors: {}
    };

    componentDidMount() {
        this.setState({ reporttypes: getReportType() });
    }

    handleChange = ({ currentTarget: input }) => {
        //  console.log("inside onchange");
        //      console.log(input.name);


        if (input.name === 'typeId') {
            const subcategorydata = getSubCategoryType1(1);
            console.log('inside --typeId');
            const data = { ...this.state.data };
            console.log('  data[input.name] :' + input.name);
            console.log(' input.value:' + input.value);
            data[input.name] = input.value;
            if (input.value === '0') {
                this.setState({ data, isSubCategoryHidden: false, reportsubcateories: subcategorydata });
            }
            else {
                this.setState({ data, isSubCategoryHidden: true, reportsubcateories: subcategorydata });

            }

        }
        else if (input.name === 'subtypeId') {
            const data = { ...this.state.datasub };
            console.log('inside --subtypeId');
            console.log('  data[input.name] :' + input.name);
            console.log(' input.value:' + input.value);

            data[input.name] = input.value;
            this.setState({ datasub: data });

        }

        // this.setState({ reportsubcateories:subcategorydata});
    };

    render() {
        // console.log(this.state.t1);
        let isSubCategoryHidden = this.state.isSubCategoryHidden;
        // console.log('render--   this.state.data["typeId"]', this.state.data["typeId"]);
        //  console.log('render-- datasub["subtypeId"]', this.state.datasub['subtypeId']);
        return (
            <div>
                {this.renderSelect("typeId", this.state.data["typeId"], this.state.reporttypes)}

            </div>
        );
        {/* <Select
                    name={"typeId"}
                    value={this.state.data["typeId"]}
                    label={"report type"}
                    options={this.state.reporttypes}
                    onChange={this.handleChange}
                    error={"error test1"}
                    
                /> */}
        // {isSubCategoryHidden &&
        //    <Select
        //                     name={"subtypeId"}
        //                     class = "select-custom-class"
        //                     value={this.state.datasub["subtypeId"]}
        //                     label={"Request Sub-Category"}
        //                     options={this.state.reportsubcateories}
        //                     onChange={this.handleChange}
        //                     error={"error test2"}
        //                 />
    }

    //   {/* <textarea value={this.state.value} onChange={this.handleChange} cols={60} rows={10} /> */}


    export default ReportType;