import React from "react";
import { Formik, Form, Field } from "formik";
import { Go, Routes } from "../Routing";
import SeButton from './SeButton';
import Note from './Note';

const GetReport = props => {

	let alertMessage = '';

	const buildNote = (urlParameter) =>{
		const message = '<p>The record you’re looking for is available in a different tracking system. Please visit <a href= https://citizenaccess.baltimorecountymd.gov/CitizenAccess/Cap/CapHome.aspx' + urlParameter + '>Baltimore County Online Services</a> and enter the tracking number again.</p><p>We’re working to better integrate these systems in the future. Until then, we apologize for any inconvenience this may cause.</p>'
		alertMessage = <Note>
			{message}
		</Note>
	}

	const checkCode =(values) =>{
		let urlParameter = '';

		if(RegExp(/^(ACCMP)/i).test(values.ReportID)){
			urlParameter = '?&Module=Enforce';
			buildNote(urlParameter);
		}
		else if (RegExp(/^(CC|CRH|CS|PP|TS|CE|CP|CB|CG)\d+$/i).test(values.ReportID)){
			urlParameter = '?&Module=Enforcement';
			buildNote(urlParameter);
		}	
		else if (RegExp( /^\d+$/i).test(values.ReportID)){
			Go(props, Routes.ReportStatus)
		}
	}
	return (
		<Formik>
			{
				(props) => {
					const { values} = props;
					return (
						<Form >
							<div>
								<div className="callout_gray">
									<div className="col-md-3">
										<img width="188" height="54" alt="Baltcogo Issue Reporting System" src="/sebin/w/q/baltcogo.gif" border="0" vspace="0" hspace="0"/>
								
									</div>	
									<div id="divclear">&nbsp;</div>					
									
									<p>If you were given a tracking number from an issue you reported on our website, please enter it below to get an update.</p>
									{(alertMessage)?
										alertMessage: null}
									<div>
										<strong>
											<div className="seform">
												<div className="SEAFGroupVertical vertical">
													<div className="SEAFGroupVertical vertical">
														<div className="SEAFGroupVertical vertical">
															<div className="SEAFWrapper">
																<div className="seText" style={{width:'100%'}}>
																	<span>Fields marked with </span>
																	<span className="seRequiredMarker">*</span>
																	<span> are required.</span>
																</div>
																<div className="SEAFWrapper">
																	<div className="SEAFGroupHorizontal horizontal">
																		<div className="seLabelCell seLabelCellHorizontal">
																			<div className="seText">
																				<label htmlFor="ReportID"
																				>Tracking Number
																					<span className="seRequiredMarker">*</span>
																				</label>
																			</div>
																		</div>
																		<div className = "seFieldCell seFieldCellHorizontal">
																			<Field
																				type="text"
																				name="ReportID"
																			/>
																		</div>
																	</div>
																</div>
															</div>
															<div className="SEAFWrapper">
																<SeButton
																	text="Track Now"
																	onClick={checkCode(values)}
																	className="pull-left"
																/>
															</div>
														</div>
													</div>
												</div>
											</div>
										</strong>	
									</div>
								</div>
								<div className="input-feedback">
									<label name="ReportResponse"></label>
								</div>
							</div>
						</Form>
					)
				}
			}
		</Formik>
	);
}



export default GetReport;
