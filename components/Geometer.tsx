import { useCurrentPosition } from 'react-use-geolocation'

const Geometer = () => {
	const { latitude, longitude, error } = useCurrentPosition()

	return (
		<div>
			{error && <p>Error: {error}</p>}
			<p>Latitude: {latitude}</p>
			<p>Longitude: {longitude}</p>
		</div>
	)
}

export default Geometer
