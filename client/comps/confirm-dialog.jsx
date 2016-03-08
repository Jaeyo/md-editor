import React from 'react'
import {
	Modal,
	Input,
	Button
} from 'react-bootstrap'

var ConfirmDialog = React.createClass({
	callback: null,

	getInitialState() {
		return { 
			visible: false,
			title: '',
			msg: ''
		}
	},

	show(title, msg, callback) {
		this.callback = callback
		this.setState({ 
			visible: true,
			title: title,
			msg: msg
		})
	},

	hide(result) {
		this.setState({
			visible: false,
			title: '',
			msg: ''
		}, () => {
			this.callback(true)
		})
	},

	onOkBtnClick(evt) {
		evt.stopPropagation()
		this.hide(true)
	},

	onCancelBtnClick(evt) {
		evt.stopPropagation()
		this.hide(false)
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
						<Button onClick={this.onOkBtnClick}>OK</Button>
						<Button onClick={this.onCancelBtnClick}>CANCEL</Button>
					</Modal.Footer>
				</Modal>
			)
		} catch(err) {
			console.error(err)
		}
	}
})
module.exports = ConfirmDialog