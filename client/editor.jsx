import React from 'react'
import uuid from 'uuid'
import util from 'util'
import {
	Button
} from 'react-bootstrap'
import MenuNav from './editor/menu-nav.jsx'
import EditorBlock from './editor/editor-block.jsx'
import MarkdownBlock from './editor/markdown-block.jsx'
import conf from './utils/conf.js'
import AlertDialog from './comps/alert-dialog.jsx'
import {
	VerticalDiv,
	EntireDiv
} from './comps/div-layout'


var Editor = React.createClass({
	dropbox: null,

	getInitialState() {
		return { 
			username: '',
			text: '',
			currentFilename: '',
			fileList: []
		}
	},

	componentDidMount() {
		vim.open({ debug: false })
		this.initDropboxClient()
		this.loadFileList()
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

	loadFileList() {
		this.dropbox.readdir('/', (err, entries) => {
			if(err) {
				if(typeof err !== 'string') err = JSON.stringify(err)
				refs.alert.show('ERR', err)
				return
			}

			this.setState({ fileList: entries })
		})
	},

	onTextChange(text) {
		this.setState({ text: text })
	},

	onNewFile(filename) {
		var { ref } = this
		this.dropbox.writeFile(filename, '', (err, stat) => {
			if(err) {
				if(typeof err !== 'string') err = JSON.stringify(err)
				refs.alert.show('ERR', err)
				return
			}
			this.loadFile(filename)
		})
	},

	loadFile(filename) {
		this.dropbox.readFile(filename, (err, data) => {
			if(err) {
				if(typeof err !== 'string') err = JSON.stringify(err)
				refs.alert.show('ERR', err)
				return
			}

			this.setState({
				currentFilename: filename,
				text: data
			})
		})
	},

	render() {
		try {
			var { state } = this

			return (
				<EntireDiv>
					<MenuNav 
						username={state.username}
						fileList={state.fileList}
						onNewFile={this.onNewFile}
						onLoadFile={this.loadFile} />
					<EditorBlock 
						currentFilename={state.currentFilename}
						text={state.text}
						onTextChange={this.onTextChange} />
					<MarkdownBlock text={state.text} />
					<AlertDialog ref="alert" />
				</EntireDiv>
			)
		} catch(err) {
			console.error(err)
		}
	}
})
module.exports = Editor


