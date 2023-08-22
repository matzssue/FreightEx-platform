import { useJsApiLoader, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import styles from './LoadMap.module.scss';
import { Load } from '../../../../../utils/api/supabase/types';

type LoadMap = {
  address: Partial<Load>;
  setDistance: (value: string | undefined) => void;
  setDuration: (value: string | undefined) => void;
};

export const LoadMap = ({ address, setDistance, setDuration }: LoadMap) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (typeof google !== 'object') {
      const result = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
      });
      setIsMapLoaded(result.isLoaded);
    } else {
      setIsMapLoaded(true);
    }
  }, []);

  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  const calculateRoute = async (address: Load) => {
    try {
      if (!address) return;

      const { loadingAddress, unloadingAddress } = address;
      const loadingAddressCords = new google.maps.LatLng(
        loadingAddress.latitude,
        loadingAddress.longitude,
      );

      const unloadingAddressCords = new google.maps.LatLng(
        unloadingAddress.latitude,
        unloadingAddress.longitude,
      );

      const directionsService = new google.maps.DirectionsService();

      const results = await directionsService.route({
        origin: loadingAddressCords,
        destination: unloadingAddressCords,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance?.text);
      setDuration(results.routes[0].legs[0].duration?.text);
      setIsError(false);
    } catch (err) {
      if (err) setIsError(true);
      setDistance(undefined);
      setDuration(undefined);
      setDirectionsResponse(undefined);
    }
  };
  useEffect(() => {
    const clearDirections = () => {
      if (directionsRenderer) {
        directionsRenderer.setDirections({ routes: [] });
      }
    };

    const updateRoute = async () => {
      clearDirections();
      setDistance(undefined);
      setDuration(undefined);
      calculateRoute(address as Load);
    };

    updateRoute();
  }, [address, directionsRenderer]);

  const directionsRendererOptions = {
    directions: directionsResponse,
  };

  return (
    <>
      {isMapLoaded ? (
        <GoogleMap
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '70%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {directionsResponse && directionsRendererOptions && (
            <DirectionsRenderer
              options={directionsRendererOptions}
              onLoad={(directionsRenderer) => setDirectionsRenderer(directionsRenderer)}
            />
          )}
          {isError && (
            <p className={styles['no-results']}>Sorry, no routes found between these locations </p>
          )}
        </GoogleMap>
      ) : (
        <p>Loading....</p>
      )}
    </>
  );
};
