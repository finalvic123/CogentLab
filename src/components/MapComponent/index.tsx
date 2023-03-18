import React from "react";
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import { companyLocation } from "../../constants/location";

type Props = {
	location: {
		latitude: number,
		longitude: number
	}
}

const MapComponent:React.FC<Props> = ({location}) => {
	const restaurantLocation = {
		lat: location.latitude,
		lng: location.longitude,
	}
	return (
		<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API || ''}>
			<GoogleMap 
				mapContainerStyle={{width: '100%', height: '300px'}}
				center={companyLocation}
				zoom={14}>
					<MarkerF position={companyLocation} label=" 🏢 " />
					<MarkerF position={restaurantLocation} label=" 🍝 " />
			</GoogleMap>
		</LoadScript>
	)
}

export default MapComponent;