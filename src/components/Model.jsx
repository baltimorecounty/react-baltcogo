import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import { Button } from 'reactstrap';
export default class Examples extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		}
	}

	openModal() {
		this.setState({
			visible: true
		});
	}

	closeModal() {
		this.setState({
			visible: false
		});
	}

	render() {
		return (
			<section>

				{/* <input type="button" value="Open" onClick={() => this.openModal()} /> */}
				<Button type="button" color="link" onClick={() => this.openModal()}>
                    Why do i need to do this?
				</Button>
				<Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
					<div>
						<h3>Why do i need an account?</h3>
						<p>In order to report an Isue online, we require a one-time account creation.</p>
						<p>This allows us to better track and follow up on issues in a timely fasion, as it ensures that we get all of the proper contact information when the issue is submitted.</p>
						<p>At this time we cannot take anonymous requests online.</p>
						<a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
					</div>
				</Modal>
			</section>
		);
	}
}