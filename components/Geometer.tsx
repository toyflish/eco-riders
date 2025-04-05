import { useState, useEffect, useRef } from 'react'
import useGeolocation, {
	EnrichedGeolocationCoordinates,
} from 'react-hook-geolocation'

const Geometer = () => {
	const geolocation = useGeolocation({
		maximumAge: 0,
		timeout: 100,
		enableHighAccuracy: true,
	})

	const [run, setRun] = useState<EnrichedGeolocationCoordinates[]>([])
	const [acceleratingSeconds, setAcceleratingSeconds] = useState(0)
	const [deceleratingSeconds, setDeceleratingSeconds] = useState(0)
	const [totalAcceleration, setTotalAcceleration] = useState(0)
	const [totalDeceleration, setTotalDeceleration] = useState(0)
	const [isAccelerating, setIsAccelerating] = useState(false)
	const [isDecelerating, setIsDecelerating] = useState(false)
	const prevSpeed = useRef<number | null>(null)
	const timerRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		if (geolocation.latitude && geolocation.longitude) {
			setRun((r) => [
				...r,
				{
					latitude: geolocation.latitude,
					longitude: geolocation.longitude,
					accuracy: geolocation.accuracy,
					altitude: geolocation.altitude,
					altitudeAccuracy: geolocation.altitudeAccuracy,
					heading: geolocation.heading,
					speed: geolocation.speed,
					timestamp: geolocation.timestamp,
				} as EnrichedGeolocationCoordinates,
			])
			
			// Check acceleration/deceleration by comparing current speed with previous
			if (prevSpeed.current !== null && geolocation.speed !== null) {
				const currentSpeed = geolocation.speed
				const speedDiff = currentSpeed - prevSpeed.current
				
				// Detect acceleration/deceleration
				if (speedDiff > 0) {
					setIsAccelerating(true)
					setIsDecelerating(false)
					// Add the positive speed difference to total acceleration
					setTotalAcceleration(prev => prev + speedDiff)
				} else if (speedDiff < 0) {
					setIsAccelerating(false)
					setIsDecelerating(true)
					// Add the absolute value of negative speed difference to total deceleration
					setTotalDeceleration(prev => prev + Math.abs(speedDiff))
				} else {
					setIsAccelerating(false)
					setIsDecelerating(false)
				}
			}
			
			// Update prevSpeed for next comparison
			prevSpeed.current = geolocation.speed
		}
	}, [geolocation])
	
	// Increment acceleration/deceleration timers
	useEffect(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current)
		}
		
		timerRef.current = setInterval(() => {
			if (isAccelerating) {
				setAcceleratingSeconds(prev => prev + 1)
			} else if (isDecelerating) {
				setDeceleratingSeconds(prev => prev + 1)
			}
		}, 1000)
		
		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current)
			}
		}
	}, [isAccelerating, isDecelerating])

	const formatHeading = (heading: number | null) => {
		return heading ? heading.toPrecision(1) : null
	}
	// Convert speed from m/s to km/h (multiply by 3.6)
	const speedKmh = geolocation.speed ? (geolocation.speed * 3.6).toFixed(1) : '0.0'
	const heading = geolocation.heading ? geolocation.heading.toFixed(0) : '0'
	
	// Calculate delta (acceleration - deceleration)
	const accelerationDelta = (totalAcceleration - totalDeceleration).toFixed(2)

	return (
		<div>
			<h3 className='text-lg font-bold'>Geometer</h3>
			
			{!geolocation.error && (
				<>
					<p className='text-lg font-medium my-3'>
						You are moving with {speedKmh}km/h in {heading} deg
					</p>
					
					{isAccelerating && (
						<p className='text-md font-medium my-2 text-green-600'>
							You are accelerating for {acceleratingSeconds} seconds
						</p>
					)}
					{isDecelerating && (
						<p className='text-md font-medium my-2 text-red-600'>
							You are decelerating for {deceleratingSeconds} seconds
						</p>
					)}
					
					<div className='my-4 p-3 bg-gray-100 dark:bg-gray-800 rounded'>
						<h4 className='font-medium mb-2'>Movement Summary</h4>
						<div className='grid grid-cols-3 gap-2'>
							<div className='text-green-600'>
								<div className='text-sm'>Acceleration</div>
								<div className='font-bold'>{totalAcceleration.toFixed(2)}</div>
							</div>
							<div className='text-red-600'>
								<div className='text-sm'>Deceleration</div>
								<div className='font-bold'>{totalDeceleration.toFixed(2)}</div>
							</div>
							<div className={Number(accelerationDelta) >= 0 ? 'text-blue-600' : 'text-orange-600'}>
								<div className='text-sm'>Delta</div>
								<div className='font-bold'>{accelerationDelta}</div>
							</div>
						</div>
					</div>
					
					<ul>
						<li>Latitude: {geolocation.latitude}</li>
						<li>Longitude: {geolocation.longitude}</li>
						<li>Location accuracy: {geolocation.accuracy}</li>
						<li>Altitude: {geolocation.altitude}</li>
						<li>Altitude accuracy: {geolocation.altitudeAccuracy}</li>
						<li>Heading: {geolocation.heading}</li>
						<li>Speed: {geolocation.speed}</li>
						<li>Timestamp: {geolocation.timestamp}</li>
					</ul>
				</>
			)}

			<table className='table-auto'>
				<thead>
					<tr>
						<th>heading</th>
						<th>speed</th>
					</tr>
				</thead>
				<tbody>
					{run
						.slice()
						.reverse()
						.map((r, i) => (
							<tr key={r.timestamp}>
								<td className='table-cell'>{(r.heading || 0).toFixed(1)}</td>
								<td className='table-cell'>{(r.speed || 0).toFixed(3)}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	)
}

export default Geometer