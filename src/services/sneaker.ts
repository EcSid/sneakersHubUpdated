import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ISneaker } from '../components/types/types'

export const sneakerApi = createApi({
	reducerPath: 'sneakerApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/sneakers' }),
	endpoints: builder => ({
		fetchSneakers: builder.query<ISneaker[], number>({
			query: limit => ({
				url: '/',
				params: {
					_limit: limit,
				},
			}),
		}),
	}),
})
