import React from 'react'
import QS from 'query-string'
import conf from './utils/conf.js'

var DropboxPage = React.createClass({
	client: null,

	componentDidMount() {
		this.client = new Dropbox.Client({ key: conf.dropbox.key })
		console.log('client init', { client: this.client })

		console.log('try to authenticate')
		this.client.authenticate((err, client) => {
			console.log('authenticate done')
			console.log({ err: err, client: client })
		})
	},

	onGetUserInfoBtnClick(evt) {
		evt.stopPropagation()

		console.log('try to get user info')
		this.client.getAccountInfo((error, accountInfo) => {
			console.log('getttt')
			console.log({
				error: error,
				accountInfo: accountInfo
			})
		})

		this.client.readdir('/', (err, entries) => {
			console.log({
				err: err,
				entries: entries
			})
		})
	},

	render() {
		try {
			return (
				<div>
					<div>dropbox test page</div>
					<button onClick={this.onGetUserInfoBtnClick}>get user info</button>
				</div>
			)
		} catch(err) {
			console.error(err)
		}
	}
})
module.exports = DropboxPage