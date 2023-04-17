import React from 'react'
import { useParams } from 'react-router-dom'

export default function ProductDetails() {
	const params = useParams()
	console.log(params)

	return (
		<div>Details of product number { params.productID }</div>
	)
}
