import { useCurrentPosition } from 'react-use-geolocation'

const Geometer = () => {
	const { latitude, longitude, error } = useCurrentPosition()

	return (
		<div>
			<h3 class='text-lg font-bold'>Geometer</h3>
			{error && <p>Error: {error}</p>}
			<p>Latitude: {latitude}</p>
			<p>Longitude: {longitude}</p>
		</div>
	)
}

export default Geometer
