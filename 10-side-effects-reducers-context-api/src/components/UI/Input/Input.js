import React from 'react'

export default function Input(props) {
	return (
		<div className={ props.className }>
			<label htmlFor={ props.htmlFor } >{ props.label }</label>
			<input
				type={ `${props.type}` || 'text' }
				id={ props.htmlFor }
				value={ props.value }
				onChange={ props.onChange }
				onBlur={ props.onBlur }
			/>
		</div>
	)
}
