import { useRef, useEffect, useState } from 'react';
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
  TrafficLayer,
} from '@react-google-maps/api';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import { SidePanel } from '../AddFormLayout/AddFormLayout';
import { Input } from '../ui/input';

const libraries = ['places'];
const GOOGLE_MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY;

/**
 * AddressWithMap component that integrates a Google Map for selecting and displaying addresses.
 *
 * @component
 * @param {function} setFieldValue - Function to set form field values.
 * @param {object} values - Object containing values for lat, long, and address.
 * @example
 * const formik = useFormik({
 *   initialValues: {
 *     lat: '',
 *     long: '',
 *     address: '',
 *   },
 *   onSubmit: values => {
 *
 *   },
 * });
 *
 * return (
 *   <form onSubmit={formik.handleSubmit}>
 *     <AddressWithMap setFieldValue={formik.setFieldValue} values={formik.values} />
 *     <button type="submit">Submit</button>
 *   </form>
 * );
 */
export default function AddressWithMap({ setFieldValue, values, area }) {
  const [position, setPosition] = useState({
    lat: +values.lat || 26.8466937,
    lng: +values.long || 80.94616599999999,
  });
  const [address, setAddress] = useState(values.address || '');
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_KEY,
    libraries,
  });

  useEffect(() => {
    if (mapRef.current && position) {
      mapRef.current.panTo(position);
    }
  }, [position]);

  useEffect(() => {
    if (values.lat && values.long) {
      const location = {
        lat: +values.lat,
        lng: +values.long,
      };
      setPosition(location);
      setMarkers([location]);

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location }, (results, status) => {
        if (status === 'OK' && results[0]) {
          setAddress(results[0].formatted_address);
          setFieldValue('address', results[0].formatted_address);
        }
      });
    }
  }, [values.lat, values.long]);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const location = { lat, lng };
    setPosition(location);
    setMarkers([{ lat, lng }]);
    setFieldValue('lat', lat);
    setFieldValue('long', lng);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setAddress(results[0].formatted_address);
        setFieldValue('address', results[0].formatted_address);
      }
    });
  };

  const handleMarkerClick = (marker) => {
    const location = { lat: marker.lat, lng: marker.lng };
    setPosition(location);
    setFieldValue('lat', location.lat);
    setFieldValue('long', location.lng);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setAddress(results[0].formatted_address);
        setFieldValue('address', results[0].formatted_address);
      }
    });
  };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setPosition(location);
      setMarkers([{ lat: location.lat, lng: location.lng }]);
      setFieldValue('lat', location.lat);
      setFieldValue('long', location.lng);
      setAddress(place.formatted_address);
      setFieldValue('address', place.formatted_address);
    }
  };

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <div
      className="add-v-form pt-43"
      style={{ padding: '20px', justifyContent: 'center' }}
    >
      <div className="add-v-form-right-section">
        <div className="add-v-form-section">
          <SidePanel
            title={`Address`}
            // description={`Enter Personal Information Here`}
          />
          <div className="group-type-2-equal">
            <div className="flex-1 w-100 addeditoff">
              <div className="group-type-1">
                <div className="to-input-field">
                  <label className="to-label c-black">
                    Address
                    <span style={{ color: 'red' }}> *</span>
                  </label>
                  <Autocomplete
                    onLoad={(autocomplete) =>
                      (autocompleteRef.current = autocomplete)
                    }
                    onPlaceChanged={handlePlaceChanged}
                  >
                    <Input
                      type="text"
                      placeholder="Enter your address"
                      className="to-input-all"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      autoComplete="off"
                    />
                  </Autocomplete>
                </div>
              </div>
              <div className="group-type-2-equal">
                <div className="flex-1">
                  <FormikTextField
                    label="Latitude"
                    type="number"
                    placeholder="Enter Latitude"
                    name="lat"
                    isRequired={true}
                  />
                </div>
                <div className="flex-1">
                  <FormikTextField
                    label="Longitude"
                    type="number"
                    placeholder="Enter Longitude"
                    name="long"
                    isRequired={true}
                  />
                </div>
              </div>
              {area && (
                <div className="group-type-1">
                  <FormikTextField
                    label="Area"
                    placeholder="Enter Area"
                    name="area"
                    suffix="m2"
                    type="number"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 w-100">
            <div className="dash-map">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '300px' }}
                center={position}
                zoom={12}
                onLoad={(map) => (mapRef.current = map)}
                onClick={handleMapClick}
                options={{
                  gestureHandling: 'greedy',
                  disableDefaultUI: true,
                }}
              >
                <TrafficLayer />
                {markers.map((marker, index) => (
                  <Marker
                    key={index}
                    position={marker}
                    onClick={() => handleMarkerClick(marker)}
                  />
                ))}
              </GoogleMap>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
