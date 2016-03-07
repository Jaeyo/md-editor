import React from 'react'
import Dropbox from 'dropbox'
import conf from './utils/conf.js'

var DropboxPage = React.createClass({
	client: null,

	componentDidMount() {
		this.client = new Dropbox.Client({ key: conf.dropbox.key })
		console.log('client init', { client: this.client })

		console.log('try to authenticate')
		this.client.authenticate((err, client) => {
			console.log({ err: err, client: client })
		})
	},

	render() {
		try {
			return (
				<div>test</div>
			)
		} catch(err) {
			console.error(err)
		}
	}
})
module.exports = DropboxPage