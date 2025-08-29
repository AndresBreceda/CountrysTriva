import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
} from "react-leaflet";
import type { Feature, FeatureCollection, GeoJsonObject } from "geojson";
import L, { type PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";

const Mapa = () => {
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json")
      .then((res) => res.json())
      .then((data: GeoJsonObject) => {
        if (data.type === "FeatureCollection") {
          setGeoData(data as FeatureCollection);
        }
      });
  }, []);

  // ✅ Evento para cada país
  const onEachCountry = (feature: Feature, layer: L.Layer) => {
    if (feature.properties && "NAME" in feature.properties) {
      const countryName = feature.properties["NAME"];

      layer.on({
        mouseover: (e) => {
          const target = e.target;
          target.setStyle({
            fillColor: "#f03",
            fillOpacity: 0.7,
          } as PathOptions);

          setHoveredCountry(countryName);
        },
        mouseout: (e) => {
          const target = e.target;
          target.setStyle({
            fillColor: "#3388ff",
            fillOpacity: 0.5,
          } as PathOptions);

          setHoveredCountry(null);
        },
        click: () => {
          setSelectedCountry(countryName);
          alert("Seleccionaste: " + countryName);
        },
      });

      // Cambiar el cursor a pointer
      layer.getElement()?.setAttribute("style", "cursor: pointer");
    }
  };

  // ✅ Estilo base de todos los países
  const geoJSONStyle: PathOptions = {
    color: "#000",         // Borde
    weight: 1,
    fillColor: "#3388ff",  // Color de fondo
    fillOpacity: 0.5,
  };

  return (
    <div>
      <MapContainer
        center={[20, 0] as [number, number]}
        zoom={2}
        style={{ height: "600px", width: "100%" }}
        zoomControl={false}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        boxZoom={false}
        keyboard={false}
        touchZoom={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData && (
          <GeoJSON
            data={geoData}
            style={geoJSONStyle}
            onEachFeature={onEachCountry}
          />
        )}
      </MapContainer>

      <div style={{ marginTop: "10px" }}>
        {hoveredCountry && <p><strong>Estás sobre:</strong> {hoveredCountry}</p>}
        {selectedCountry && <p><strong>Seleccionaste:</strong> {selectedCountry}</p>}
      </div>
    </div>
  );
};

export default Mapa;
