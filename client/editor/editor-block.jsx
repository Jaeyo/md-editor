import React from 'react'
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

	onTextChange(evt) {
		evt.stopPropagation()
		var { props } = this
		props.onTextChange(evt.target.value)
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
					<Text onChange={this.onTextChange} text={props.text} />
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