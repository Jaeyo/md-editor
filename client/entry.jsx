import React from 'react'
import ReactDOM from 'react-dom'
import QS from 'query-string'
import request from 'superagent'
import util from './utils/util.js'
import server from './utils/server.js'

import Editor from './editor.jsx'
import DropboxPage from './dropbox.jsx'

util.init()

function getDOM() {
	var pathname = window.location.pathname
	var params = QS.parse(location.search)

	try {
		if(pathname === '/') {
			// return (<DropboxPage />)
			return (<Editor />)
		}
	} catch(err) {
		console.error(err)
	}
}

ReactDOM.render(
	getDOM(),
	document.getElementById('container')
)