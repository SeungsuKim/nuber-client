import Geocode from "react-geocode";
import { toast } from "react-toastify";

Geocode.setApiKey(process.env.REACT_APP_MAPS_KEY);

export const geoCode = async (address: string) => {
  const response = await Geocode.fromAddress(address);
  // tslint:disable-next-line
  console.log(response);
};

export const reverseGeoCode = async (lat: number, lng: number) => {
  const { status, results } = await Geocode.fromLatLng(`${lat}`, `${lng}`);
  if (status === "OK") {
    return results[0].formatted_address;
  } else {
    toast.error("Error while getting address.");
    return false;
  }
};
