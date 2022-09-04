import useGeolocation from 'react-hook-geolocation'

const Geometer = () => {
	const geolocation = useGeolocation()

	return !geolocation.error ? (
		<div>
			<h3 className='text-lg font-bold'>Geometer</h3>
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
		</div>
	) : (
		<p>No geolocation, sorry.</p>
	)
}

export default Geometer
