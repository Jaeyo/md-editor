import React from 'react'
import uuid from 'uuid'
import marked from 'marked'
import util from 'util'
import {
	Button
} from 'react-bootstrap'
import conf from './utils/conf.js'
import PromptDialog from './comps/prompt-dialog.jsx'
import AlertDialog from './comps/alert-dialog.jsx'

var Editor = React.createClass({
	dropbox: null,

	getInitialState() {
		return { 
			text: '',
			username: '',
			filename: ''
		}
	},

	componentDidMount() {
		vim.open({ debug: false })
		this.initDropboxClient()
	},

	initDropboxClient() {
		var { refs } = this

		this.dropbox = new Dropbox.Client({ key: conf.dropbox.key })
		this.dropbox.authenticate((err, dropbox) => {
			if(err) {
				if(typeof err !== 'string') err = JSON.stringify(err)
				refs.alert.show('ERR', err)
				return
			}

			dropbox.getAccountInfo((err, accountInfo) => {
				if(err) {
					if(typeof err !== 'string') err = JSON.stringify(err)
					refs.alert.show('ERR', err)
					return
				}
				this.setState({ username: util.format('%s(%s)', accountInfo.name, accountInfo.email) })
			})
		})
	},

	onTextChange(evt) {
		evt.stopPropagation()
		this.setState({ text: evt.target.value })
	},

	onNewDocBtnClick(evt) {
		evt.stopPropagation()
		var { refs } = this

		refs.prompt.show('new document name', 'new document name:', (docName) => {
			var filename = docName + '.md'
			this.dropbox.writeFile(filename, '', (err, stat) => {
				this.setState({ filename: filename })
			})
		})
	},

	render() {
		try {
			var { state } = this

			return (
				<EntireDiv>
					<VerticalDiv width="10%">
						<div style={{ padding: '10px' }}>{state.username}</div>
						<Button onClick={this.onNewDocBtnClick} style={{ width: '100%' }}>new document</Button>
					</VerticalDiv>
					<VerticalDiv width="45%">
						<div>{state.filename}</div>
						<Text onChange={this.onTextChange} />
					</VerticalDiv>
					<VerticalDiv width="45%">
						<div dangerouslySetInnerHTML={{ __html: marked(state.text) }} />
					</VerticalDiv>
					<PromptDialog ref="prompt" />
					<AlertDialog ref="alert" />
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