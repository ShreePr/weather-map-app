export interface MapDisplayProps {
  latitude: number;
  longitude: number;
  zoom: number;
  setCoordinates: (coords: { latitude: number; longitude: number }) => void;
}
