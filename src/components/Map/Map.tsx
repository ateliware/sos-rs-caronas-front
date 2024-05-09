import { DataLoader } from '../DataLoader';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

interface Props {
  value: LatLng;
  onChange: (value: LatLng) => void;
  mapHeight?: string;
  mapWidth?: string;
}

type LatLng = {
  lat: number;
  lng: number;
};

export default function Map(props: Props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY!,
  });

  const mapContainerStyle = {
    width: props.mapWidth || '30vw',
    height: props.mapHeight || '40vh',
  };

  return (
    <DataLoader
      data={
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={props.value}
          zoom={18}
          onClick={(event) => {
            props.onChange({
              lat: event.latLng?.lat() || 0,
              lng: event.latLng?.lng() || 0,
            });
          }}
        >
          <MarkerF position={props.value} />
        </GoogleMap>
      }
      isLoading={!isLoaded}
    />
  );
}
