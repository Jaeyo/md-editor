import React from 'react'
import {
	Modal,
	Input,
	Button
} from 'react-bootstrap'

var AlertDialog = React.createClass({
	getInitialState() {
		return { 
			visible: false,
			title: '',
			msg: ''
		}
	},

	show(title, msg) {
		this.setState({ 
			visible: true,
			title: title,
			msg: msg
		})
	},

	onCloseBtnClick(evt) {
		evt.stopPropagation()
		this.setState({ visible: false, title: '', msg: '' })
	},

	render() {
		try {
			var { state } = this
			return (
				<Modal show={state.visible}>
					<Modal.Header closeButton>
						<Modal.Title>{state.title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h3>{state.msg}</h3>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.onCloseBtnClick}>CLOSE</Button>
					</Modal.Footer>
				</Modal>
			)
		} catch(err) {
			console.error(err)
		}
	}
})
module.exports = AlertDialog