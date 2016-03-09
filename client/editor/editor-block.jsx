import React from 'react'
import CodeMirror from 'react-codemirror'
import 'codemirror/mode/markdown/markdown'
import { Button } from 'react-bootstrap'
import { VerticalDiv } from '../comps/div-layout.jsx'
import ConfirmDialog from '../comps/confirm-dialog.jsx'


var EditorBlock = React.createClass({
	PropTypes: {
		currentFilename: React.PropTypes.string,
		text: React.PropTypes.string,
		onTextChange: React.PropTypes.func.isRequired,
		onDocSave: React.PropTypes.func.isRequired,
		onDocDelete: React.PropTypes.func.isRequired
	},

	onTextChange(value) {
		var { props } = this
		props.onTextChange(value)
	},

	onDeleteBtnClick(evt) {
		evt.stopPropagation()

		var { props, refs } = this
		refs.confirm.show('delete?', 'delete?', (result) => {
			if(result === false) return
			props.onDocDelete()
		})
	},

	render() {
		try {
			var { props } = this

			return (
				<VerticalDiv width="45%">
					<div>current filename: {props.currentFilename}</div>
					<div>
						<Button
							bsStyle="primary"
							onClick={props.onDocSave}>
							save
						</Button>
						<Button
							bsStyle="danger"
							onClick={this.onDeleteBtnClick}>
							delete
						</Button>
					</div>
					<CodeMirrorText onChange={this.onTextChange} text={props.text} />
					<ConfirmDialog ref="confirm" />
				</VerticalDiv>
			)
		} catch(err) {
			console.error(err)
		}
	}
})
module.exports = EditorBlock


//props: onChange, text
var Text = (props) => {
	return (
		<textarea 
			style={{ 
				width: '100%'
			}} 
			rows="20"
			onChange={props.onChange}
			value={props.text}>
		</textarea>
	)
}

//props: onChange, text
var CodeMirrorText = (props) => {
	return (
		<CodeMirror
			value={props.text}
			onChange={props.onChange}
			options={{ 
				lineNumbers: true,
				mode: 'markdown'
			}} />
	)
}