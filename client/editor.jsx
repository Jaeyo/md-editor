import React from 'react'
import uuid from 'uuid'
import marked from 'marked'
import {
	Button
} from 'react-bootstrap'
import PromptDialog from './comps/prompt-dialog.jsx'

var Editor = React.createClass({
	getInitialState() {
		return { text: '' }
	},

	componentDidMount() {
		vim.open({ debug: false })
	},

	onTextChange(evt) {
		evt.stopPropagation()
		this.setState({ text: evt.target.value })
	},

	onNewDocBtnClick(evt) {
		evt.stopPropagation()
		var { refs } = this
		refs.prompt.show('new document name', 'new document name:', (docName) => {
			alert(docName)
		})
	},

	render() {
		try {
			var { state } = this

			return (
				<EntireDiv>
					<VerticalDiv width="10%">
						<Button onClick={this.onNewDocBtnClick} style={{ width: '100%' }}>new document</Button>
					</VerticalDiv>
					<VerticalDiv width="45%">
						<Text onChange={this.onTextChange} />
					</VerticalDiv>
					<VerticalDiv width="45%">
						<div dangerouslySetInnerHTML={{ __html: marked(state.text) }} />
					</VerticalDiv>
					<PromptDialog ref="prompt" />
				</EntireDiv>
			)
		} catch(err) {
			console.error(err)
		}
	}
})
module.exports = Editor


var EntireDiv = (props) => {
	return (
		<div style={{ height: '100%', width: '100%' }}>{ props.children }</div>
	)
}

//props: width
var VerticalDiv = (props) => {
	return (
		<div style={{ float: 'left', width: props.width, height: '100%', position: 'relative' }}>{ props.children }</div>
	)
}

//props: onChange
var Text = (props) => {
	return (
		<textarea 
			style={{ 
				position: 'absolute', 
				width: '100%', 
				height: '100%', 
				top: 0, left: 0, right: 0, bottom: 0 
			}} 
			onChange={props.onChange}>
		</textarea>
	)
}