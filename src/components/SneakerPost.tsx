import { FC, useEffect, useRef, useState } from 'react'
import { ISneaker } from './types/types'
import { boughtSneakers } from '../data'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'

interface SneakerProps {
	sneaker: ISneaker
	inBasket: boolean
}

const SneakerProps: FC<SneakerProps> = ({ sneaker, inBasket }) => {
	const divRef = useRef<HTMLDivElement>(null)

	const [isBuying, setIsBuying] = useState<boolean>(false)

	useEffect(() => {
		if (isBuying) {
			boughtSneakers.push(sneaker.id)
		}
	}, [isBuying])

	return (
		<div
			ref={divRef}
			style={{
				border: '1px solid grey',
				borderRadius: 25,
				height: '270px',
				padding: '0.8rem 2rem',
				width: '270px',
				textAlign: 'center',
				position: 'relative',
				marginBottom: '3%',
			}}
		>
			<p style={{ height: '39px', fontSize: '17.3px' }}>
				{sneaker.name.slice(0, 50)}
			</p>
			<Swiper
				modules={[Navigation]}
				observer={true}
				observeParents={true}
				navigation={{
					nextEl: `.button-next${sneaker.id}`,
					prevEl: `.button-prev${sneaker.id}`,
				}}
				loop={true}
				touchRatio={0}
			>
				<SwiperSlide>
					<div className='swiper-slide'>
						<img
							src={sneaker.imageSrc}
							width='190px'
							height='190px'
							className='imageInSneakerPost'
						></img>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='swiper-slide'>
						<img
							src={sneaker.imageRotateSrc}
							width='190px'
							height='190px'
						></img>
					</div>
				</SwiperSlide>
			</Swiper>
			<div className={`swiper-button-next button-next${sneaker.id}`}></div>
			<div className={`swiper-button-prev button-prev${sneaker.id}`}></div>
			<p className='price'>{sneaker.estimatedMarketValue}</p>
			<button
				className='button'
				style={{
					position: 'absolute',
					right: 1,
					bottom: 3,
					width: '70px',
					height: '25px',
					cursor: isBuying || inBasket ? 'default' : 'pointer',
					marginRight: '1rem',
				}}
				onClick={() => setIsBuying(true)}
				disabled={isBuying || inBasket}
			>
				{isBuying || inBasket ? 'В корзине' : 'Купить'}
			</button>
			<br></br>
			<br></br>
			<br></br>
		</div>
	)
}
export default SneakerProps
