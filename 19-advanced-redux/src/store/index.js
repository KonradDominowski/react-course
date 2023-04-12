import { createSlice, configureStore } from "@reduxjs/toolkit";

const UIInitialState = {
	cartIsVisible: false,
	notification: null
}

const UISlice = createSlice({
	name: 'ui',
	initialState: UIInitialState,
	reducers: {
		toggleCartVisibility(state) {
			state.cartIsVisible = !state.cartIsVisible
		},
		showNotification(state, action) {
			state.notification = {
				status: action.payload.status,
				title: action.payload.title,
				message: action.payload.message
			}
		},
		clearNotification(state) {
			state.notification = null
		},
	}
})

const itemsInitialState = [
	{
		key: Math.random(),
		title: 'Test item 1',
		price: 6,
		description: 'Test description 1'
	},
	{
		key: Math.random(),
		title: 'Test item 2',
		price: 8,
		description: 'Test description 2'
	}

]

const itemsSlice = createSlice({
	name: 'items',
	initialState: itemsInitialState,
	reducers: {}
})

const cartInitialState = {
	items: [],
	changed: false
}


const cartSlice = createSlice({
	name: 'cart',
	initialState: cartInitialState,
	reducers: {
		addItem(state, action) {
			state.changed = true
			const newItem = action.payload.item
			let IDs = state.items.map(item => item.key)


			if (IDs.includes(newItem.key)) {
				const cartItem = state.items.find(item => item.key === newItem.key);
				cartItem.quantity++
				cartItem.totalPrice = cartItem.quantity * cartItem.price
			} else {
				state.items.push({
					...newItem,
					quantity: 1,
					totalPrice: newItem.price
				})
			}
		},
		removeItem(state, action) {
			state.changed = true

			const itemToRemove = action.payload.item;
			let itemQuantity = state.items.find(item => item.key === itemToRemove.key).quantity

			if (itemQuantity === 1) {
				state.items = state.items.filter(item => item.key !== itemToRemove.key)
				// state.items.splice(state.items.findIndex(item => item.key === itemToRemove.key), 1)
			} else {
				const cartItem = state.items.find(item => item.key === itemToRemove.key);
				cartItem.quantity--
				cartItem.totalPrice = cartItem.quantity * cartItem.price
			}
		},
		clearCart(state) {
			state.items.length = 0
		},
		updatecart(state, action) {
			state.items = action.payload.items || []
			state.changed = false
		}
	}
})

const store = configureStore({
	reducer: {
		items: itemsSlice.reducer,
		cart: cartSlice.reducer,
		ui: UISlice.reducer
	}
})

export const sendCartData = (cart) => {
	return async (dispatch) => {
		dispatch(UIActions.showNotification({
			status: 'Loading',
			title: 'Request is being sent',
			message: 'Sending cart to database'
		}))

		try {
			const res = await fetch('https://react-course-51208-default-rtdb.firebaseio.com/cart.json', { method: 'PUT', body: JSON.stringify(cart) })
			if (!res.ok) {
				throw new Error('Fetch failed')
			}

			dispatch(UIActions.showNotification({
				status: 'success',
				title: 'Request sent successfully',
				message: 'Sent cart to database'
			}))

		} catch (error) {
			dispatch(UIActions.showNotification({
				status: 'error',
				title: 'Something went wrong',
				message: 'Sending data failed.'
			}))
		}
	}
}

export const fetchCartData = () => {
	return async (dispatch) => {
		dispatch(UIActions.showNotification({
			status: 'Loading cart',
			title: 'Request is being sent',
			message: 'Loading cart from database'
		}))

		try {
			const res = await fetch('https://react-course-51208-default-rtdb.firebaseio.com/cart.json')
			console.log(res)
			if (!res.ok) throw new Error
			const data = await res.json()

			dispatch(cartActions.updatecart({ items: data.items }))
			dispatch(UIActions.clearNotification())

		} catch (error) {
			dispatch(UIActions.showNotification({
				status: 'error',
				title: 'Something went wrong',
				message: 'Fething cart failed.'
			}))
		}
	}
}

export default store
export const cartActions = cartSlice.actions
export const UIActions = UISlice.actions
