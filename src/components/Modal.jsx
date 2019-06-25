import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import { Button } from 'reactstrap';
class Examples extends Component {
	constructor(props, context) {
		super(props, context);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			show: false,
		};
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}

	render() {
		return (
			<>
				<Button type="button" color="link" onClick={this.handleShow}>
                    Why do I need to do this?
				</Button>

				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title><h3>Why do I need an account?</h3></Modal.Title>
					</Modal.Header>
					<Modal.Body><div>

						<p>In order to report an issue online, we require a one-time account creation.</p>
						<p>This allows us to better track and follow up on issues in a timely fashion, as it ensures that we get all of the proper contact information when the issue is submitted.</p>
						<p>At this time we cannot take anonymous requests online.</p>

					</div></Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>
							Close
						</Button>

					</Modal.Footer>
				</Modal>
			</>
		);
	}
}
export default Examples