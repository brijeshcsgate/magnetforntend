import React, { useRef, useEffect, useContext } from "react";
import { GoogleMap,Marker,useLoadScript } from "@react-google-maps/api";
import { CounterContext } from "@/components/Layout/commonLayout/TitleOfPageProvider";

const GOOGLE_MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY;
const libraries = ["places"];
const initialValues = {
  zoom: 4,
  center: { lat: 27.5705886, lng: 80.0981869 }, 
};
const OfficeMap = ({ position }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null); // Reference for AdvancedMarkerElement

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_KEY,
    libraries,
  });
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Masters');
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.panTo({ lat: position?.lat, lng: position?.lng });
    }

    if (mapRef.current && position && !markerRef.current && window.google) {
      markerRef.current = new window.google.maps.Marker({
        position: position,
        map: mapRef.current,
      });
    }
    // if (markerRef.current && position) {
    //   markerRef.current.setPosition(position);
    // }
    if(position.lat!==0){
      initialValues.center=position;
      initialValues.zoom=8
    }

  }, [position, isLoaded]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
 
      <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <GoogleMap
      id="map"
      mapContainerStyle={{ height: "100%", width: "100%" }}
      center={initialValues.center}
          zoom={initialValues.zoom}
    >
          {position && <Marker position={position} />}
        </GoogleMap>
      </div>
  );
};
export default OfficeMap;
