import { useJsApiLoader, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

import { Load } from '../../../utils/api/supabase/types';

type LoadMap = {
  address: Partial<Load>;
  setDistance: (value: string | undefined) => void;
  setDuration: (value: string | undefined) => void;
};

export const LoadMap = ({ address, setDistance, setDuration }: LoadMap) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  const calculateRoute = async (address: Load) => {
    try {
      if (!address) return;

      const { loadingAddressData, unloadingAddressData } = address;
      const loadingAddressCords = new google.maps.LatLng(
        loadingAddressData.latitude,
        loadingAddressData.longitude,
      );
      console.log(loadingAddressCords);
      const unloadingAddressCords = new google.maps.LatLng(
        unloadingAddressData.latitude,
        unloadingAddressData.longitude,
      );
      console.log(unloadingAddressCords);

      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: loadingAddressCords,
        destination: unloadingAddressCords,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      console.log(results);
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance?.text);
      setDuration(results.routes[0].legs[0].duration?.text);
    } catch (err) {
      console.log(err);
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

  if (!isLoaded) return <div>Loading</div>;

  return (
    <>
      <GoogleMap
        zoom={15}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {directionsResponse && (
          <DirectionsRenderer
            options={directionsRendererOptions}
            onLoad={(directionsRenderer) => setDirectionsRenderer(directionsRenderer)}
          />
        )}
      </GoogleMap>
    </>
  );
};
