import React from 'react'
import {
	VerticalDiv
} from '../comps/div-layout.jsx'


var EditorBlock = React.createClass({
	PropTypes: {
		currentFilename: React.PropTypes.string,
		text: React.PropTypes.string,
		onTextChange: React.PropTypes.func.isRequired
	},

	onTextChange(evt) {
		evt.stopPropagation()
		var { props } = this
		props.onTextChange(evt.target.value)
	},

	render() {
		try {
			var { props } = this

			return (
				<VerticalDiv width="45%">
					<div>{props.currentFilename}</div>
					<Text onChange={this.onTextChange} />
				</VerticalDiv>
			)
		} catch(err) {
			console.error(err)
		}
	}
})
module.exports = EditorBlock


//props: onChange
var Text = (props) => {
	return (
		<textarea 
			style={{ 
				width: '100%'
			}} 
			rows="20"
			onChange={props.onChange}>
		</textarea>
	)
}