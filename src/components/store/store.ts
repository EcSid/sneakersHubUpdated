import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { sneakerApi } from '../../services/sneaker'

const rootReducer = combineReducers({
	[sneakerApi.reducerPath]: sneakerApi.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware(getDefaultMiddleware) {
		return getDefaultMiddleware().concat(sneakerApi.middleware)
	},
})
