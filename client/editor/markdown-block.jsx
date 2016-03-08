import React from 'react'
import marked from 'marked'
import {
	VerticalDiv
} from '../comps/div-layout.jsx'


var MarkdownBlock = React.createClass({
	PropTypes: {
		text: React.PropTypes.string
	},

	render() {
		try {
			var { props } = this

			return (
				<VerticalDiv width="45%">
					<div dangerouslySetInnerHTML={{ __html: marked(props.text) }} />
				</VerticalDiv>
			)
		} catch(err) {
			console.error(err)
		}
	}
})
module.exports = MarkdownBlock