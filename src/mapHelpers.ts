import Geocode from "react-geocode";

import { MAPS_KEY } from "./keys";

Geocode.setApiKey(MAPS_KEY);

export const geoCode = () => null;

export const reverseGeoCode = async (lat: number, lng: number) => {
  const response = await Geocode.fromLatLng(`${lat}`, `${lng}`);
  // tslint:disable-next-line
  console.log(response.results[0].formatted_address);
};
