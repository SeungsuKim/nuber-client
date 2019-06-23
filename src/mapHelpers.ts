import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_MAPS_KEY);

export const geoCode = () => null;

export const reverseGeoCode = async (lat: number, lng: number) => {
  const response = await Geocode.fromLatLng(`${lat}`, `${lng}`);
  // tslint:disable-next-line
  console.log(response.results[0].formatted_address);
};
