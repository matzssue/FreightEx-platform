import bus from 'src/assets/bus.svg';
import doubleTrailer from 'src/assets/double-trailer.svg';
import semiTrailer from 'src/assets/semi-trailer.svg';
import solo from 'src/assets/solo.svg';

export const selectVehicleImage = (vehicleType: string) => {
  let imagePath = '';
  switch (vehicleType) {
    case 'solo':
      imagePath = solo;
      break;
    case 'bus':
      imagePath = bus;
      break;
    case 'double-trailer':
      imagePath = doubleTrailer;
      break;
    case 'semi-trailer':
      imagePath = semiTrailer;
      break;
    default:
      imagePath = '';
      break;
  }
  return imagePath;
};
