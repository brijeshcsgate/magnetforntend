import { useJsApiLoader } from "@react-google-maps/api";
import { useCallback } from "react";
import { toast } from "react-toastify";

const GOOGLE_MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY;

/**
 * Custom hook to calculate the total distance and time between a set of geographical points using the Google Maps API.
 *
 * @returns {Object} An object containing the `calculateDistanceAndTime` function.
 *
 * @example
 * import { useRouteMetrics } from "@/hooks/useRouteMetrics";
 *
 * const Component = () => {
 *   const { calculateDistanceAndTime } = useRouteMetrics();
 *
 *   const points = {
 *     origin: { lat: 40.7128, lng: -74.006 },
 *     destination: { lat: 34.0522, lng: -118.2437 },
 *     waypoints: [
 *       { lat: 41.8781, lng: -87.6298 },
 *       { lat: 39.9526, lng: -75.1652 },
 *     ],
 *   };
 *
 *   const handleCalculate = async () => {
 *     try {
 *       const { totalDistance, totalTime } = await calculateDistanceAndTime(points);
 *   
 *     } catch (error) {
 *       console.error(error);
 *     }
 *   };
 *
 *   return (
 *     <button onClick={handleCalculate}>Calculate Distance and Time</button>
 *   );
 * };
 */
export const useRouteMetrics = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_KEY,
  });

  /**
   * Calculates the total distance and time between the provided origin, destination, and waypoints.
   *
   * @param {Object} points - The geographical points for the route.
   * @param {Object} points.origin - The starting point of the route.
   * @param {number} points.origin.lat - Latitude of the origin.
   * @param {number} points.origin.lng - Longitude of the origin.
   * @param {Object} points.destination - The ending point of the route.
   * @param {number} points.destination.lat - Latitude of the destination.
   * @param {number} points.destination.lng - Longitude of the destination.
   * @param {Object[]} points.waypoints - Array of waypoints for the route.
   * @param {number} points.waypoints[].lat - Latitude of the waypoint.
   * @param {number} points.waypoints[].lng - Longitude of the waypoint.
   *
   * @returns {Promise<Object>} A promise that resolves to an object containing the total distance and time.
   * @returns {string} result.totalDistance - The total distance of the route formatted in kilometers.
   * @returns {string} result.totalTime - The total time of the route formatted in hours and minutes.
   */
  const calculateDistanceAndTime = useCallback(
    ({ origin, destination, waypoints }) => {
      return new Promise((resolve, reject) => {
        if (!isLoaded) {
          reject("Google Maps API is not loaded yet.");
          return;
        }

        if (
          !origin ||
          !origin.lat ||
          !origin.lng ||
          !destination ||
          !destination.lat ||
          !destination.lng
        ) {
          reject(
            "Origin and destination (with latitude and longitude) are required."
          );
          return;
        }

        const originLatLng = new window.google.maps.LatLng(
          origin.lat,
          origin.lng
        );
        const destinationLatLng = new window.google.maps.LatLng(
          destination.lat,
          destination.lng
        );
        const waypointsLatLng = waypoints.map(
          (point) => new window.google.maps.LatLng(point.lat, point.lng)
        );

        const service = new window.google.maps.DirectionsService();

        service.route(
          {
            origin: originLatLng,
            destination: destinationLatLng,
            waypoints: waypointsLatLng.map((point) => ({
              location: point,
              stopover: true,
            })),
            travelMode: window.google.maps.TravelMode.DRIVING,
            unitSystem: window.google.maps.UnitSystem.METRIC,
          },
          (response, status) => {
            if (status !== "OK") {
              toast.error(`Error fetching directions.`);
              reject(`Error fetching directions: ${status}`);
              return;
            }

            const route = response.routes[0];
            let totalDistance = 0;
            let totalTime = 0;

            route.legs.forEach((leg) => {
              totalDistance += leg.distance.value; // distance in meters
              totalTime += leg.duration.value; // duration in seconds
            });

            totalDistance = `${(totalDistance / 1000).toFixed(2)} km`;

            const hours = Math.floor(totalTime / 3600);
            const minutes = Math.floor((totalTime % 3600) / 60);

            const totalTimeFormatted = `${hours}h ${minutes}m`;

            const result = { totalDistance, totalTime: totalTimeFormatted };

            resolve(result);
          }
        );
      });
    },
    [isLoaded]
  );

  return { calculateDistanceAndTime };
};
