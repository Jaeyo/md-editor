import React from 'react'
import {
	Modal,
	Input,
	Button
} from 'react-bootstrap'

var PromptDialog = React.createClass({
	callback: null,
	answer: '',

	getInitialState() {
		return { 
			visible: false,
			title: '',
			msg: ''
		}
	},

	show(title, msg, callback) {
		this.callback = callback
		this.answer = ''

		this.setState({ 
			visible: true,
			title: title,
			msg: msg
		})
	},

	onInputChange(evt) {
		evt.stopPropagation()
		this.answer = evt.target.value
	},

	onOkBtnClick(evt) {
		evt.stopPropagation()
		this.setState({ visible: false, title: '', msg: '' }, () => { this.callback(this.answer) })
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
						<Input 
							type="text"
							label={state.msg}
							onChange={this.onInputChange} />
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.onOkBtnClick}>OK</Button>
						<Button onClick={this.onCloseBtnClick}>CLOSE</Button>
					</Modal.Footer>
				</Modal>
			)
		} catch(err) {
			console.error(err)
		}
	}
})
module.exports = PromptDialog