import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapDisplayProps } from "./MapDisplay.interface";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

const MapDisplay: React.FC<MapDisplayProps> = ({ latitude, longitude, zoom, setCoordinates }) => {
  useEffect(() => {
    const container: any = L.DomUtil.get("map");

    if (container != null) {
      container._leaflet_id = null;
    }
    const map = L.map("map").setView([latitude, longitude], zoom);
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: process.env.REACT_APP_OPEN_STREET_MAP_TOKEN
    }).addTo(map);
    L.Marker.prototype.options.icon = DefaultIcon;
    const marker = L.marker([latitude, longitude]).addTo(map);
    const onMapClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      setCoordinates({ latitude: lat, longitude: lng });
      marker.setLatLng([lat, lng]);
    };

    map.on("click", onMapClick);
    marker.bindPopup("<b>Hello!</b><br>Welcome to the Destination.").openPopup();

    return () => {
      if (map) {
        map.off("click", onMapClick);
        map.remove();
      }
    };
  }, [latitude, longitude, zoom, setCoordinates]);

  return <div id="map" style={{ height: "400px", marginTop: "25px" }}></div>;
};

export default MapDisplay;
