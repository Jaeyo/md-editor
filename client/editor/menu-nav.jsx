import React from 'react'
import {
	Button
} from 'react-bootstrap'
import PromptDialog from '../comps/prompt-dialog.jsx'
import {
	VerticalDiv
} from '../comps/div-layout.jsx'


var MenuNav = React.createClass({
	PropTypes: {
		username: React.PropTypes.string,
		fileList: React.PropTypes.object,
		onNewFile: React.PropTypes.func.isRequired,
		onLoadFile: React.PropTypes.func.isRequired
	},

	onNewDocBtnClick(evt) {
		evt.stopPropagation()
		var { refs, props } = this

		refs.prompt.show('new document name', 'new document name:', (docName) => {
			var filename = docName + '.md'
			props.onNewFile(filename)
		})
	},

	renderFileList() {
		var { props } = this

		return props.fileList.map((filename) => {
			return (
				<Button	
					key={filename}
					style={{ width: '100%' }}
					bsStyle="link"
					onClick={() => { props.onLoadFile(filename) }}>
					{ filename }
				</Button>
			)
		})
	},

	render() {
		try {
			var { props } = this
			return (
				<VerticalDiv width="10%">
					<div style={{ padding: '10px' }}>{props.username}</div>
					<Button onClick={this.onNewDocBtnClick} style={{ width: '100%' }}>new document</Button>
					{ this.renderFileList() }
					<PromptDialog ref="prompt" />
				</VerticalDiv>
			)
		} catch(err) {
			console.error(err)
		}
	}
})
module.exports = MenuNav