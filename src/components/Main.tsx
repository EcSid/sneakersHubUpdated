import { FC, useState } from 'react'
import SneakerPost from './SneakerPost.tsx'
import SearchInput from './SearchInput/SearchInput.tsx'
import { boughtSneakers } from '../data.ts'
import { sneakerApi } from '../services/sneaker.ts'

const Main: FC = () => {
	const [value, setValue] = useState<string>('')
	const [page, setPage] = useState<number>(1)

	const {
		data: sneakers,
		isLoading: loading,
		error,
	} = sneakerApi.useFetchSneakersQuery(page * 6)

	const arrFiltered = sneakers?.slice((page - 1) * 6, page * 6).filter(el => {
		return el.name.toLowerCase().includes(value.trim().toLowerCase())
	})

	const bannerAndSearch = (
		<>
			<img
				className='NB_banner'
				src='https://24segons.wordpress.com/wp-content/uploads/2015/05/banner-jordan1-chicago-20150528.jpg'
			/>
			<SearchInput
				placeholder='Введите название кроссовок'
				value={value}
				onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
					setValue(e.target.value)
				}}
			/>
		</>
	)

	if (loading) {
		return (
			<>
				{bannerAndSearch}
				<h3 style={{ textAlign: 'center' }}>Loading...</h3>
			</>
		)
	}

	if (error) {
		return <div>Error</div>
	}

	return (
		<>
			{bannerAndSearch}
			<main style={{ marginBottom: '10%' }}>
				{arrFiltered?.length === 0 ? (
					<h5 className='nothingFound'>Ничего не найдено...</h5>
				) : (
					arrFiltered?.map(el => {
						if (boughtSneakers.includes(el.id)) {
							return <SneakerPost key={el.id} sneaker={el} inBasket={true} />
						}
						return <SneakerPost key={el.id} sneaker={el} inBasket={false} />
					})
				)}
			</main>
			<div className='boxes'>
				<div className='box' onClick={() => setPage(1)}>
					1
				</div>
				<div className='box' onClick={() => setPage(2)}>
					2
				</div>
				<div className='box' onClick={() => setPage(3)}>
					3
				</div>
			</div>
		</>
	)
}
export default Main
