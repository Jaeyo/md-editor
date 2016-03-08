import React from 'react'

//props: width
var VerticalDiv = (props) => {
	return ( 
		<div 
			style={{ 
				float: 'left', 
				width: props.width, 
				height: '100%', 
				position: 'relative'}}>
			{props.children}
		</div>
	)
}

var EntireDiv = (props) => {
	return (
		<div 
			style={{ 
				height: '100%', 
				width: '100%' }}>
			{props.children}
		</div> 
	)
}

module.exports = {
	VerticalDiv: VerticalDiv,
	EntireDiv: EntireDiv
}