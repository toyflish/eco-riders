import { useState, useEffect } from 'react'
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
		}
	}, [geolocation])

	const formatHeading = (heading: number | null) => {
		return heading ? heading.toPrecision(1) : null
	}
	return (
		<div>
			<h3 className='text-lg font-bold'>Geometer</h3>
			{!geolocation.error && (
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
