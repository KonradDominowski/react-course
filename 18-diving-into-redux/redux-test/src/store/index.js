import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterInitialState = { counter: 0, showCounter: true }

const counterSlice = createSlice({
	name: 'counter',
	initialState: counterInitialState,
	reducers: {
		increment(state) {
			state.counter++
		},
		decrement(state) {
			state.counter--
		},
		increase(state, action) {
			state.counter += action.payload.amount
		},
		toggleCounter(state) {
			state.showCounter = !state.showCounter
		}
	}
})

const authInitialState = { user: null, isAuthenthicated: false }

const authSlice = createSlice({
	name: 'auth',
	initialState: authInitialState,
	reducers: {
		login(state, action) {
			console.log('Login fired')
			state.isAuthenthicated = true
			state.user = action.payload.user
		},
		logout(state) {
			state.isAuthenthicated = false
			state.user = null
		},

	}
})

const store = configureStore({
	reducer: {
		counter: counterSlice.reducer,
		auth: authSlice.reducer
	}
})

export const counterActions = counterSlice.actions
export const authActions = authSlice.actions
export default store