import { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// GeoJSON con nombres en props.ADMIN (Natural Earth)
const geoUrl =
  "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";

// Ajusta la lista a cómo vienen los nombres en el dataset (props.ADMIN)
const VALID_COUNTRIES = [
  "Mexico",
  "Brazil",
  "Argentina",
  "Spain",
  "United States of America",
];

type AnyProps = Record<string, any>;

const getCountryName = (props: AnyProps) =>
  props?.ADMIN || props?.name || props?.NAME || props?.NAME_LONG || props?.SOVEREIGNT || "";

export default function MapaMundo() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const validSet = useMemo(() => new Set(VALID_COUNTRIES), []);

  return (
    <div>
      <ComposableMap projectionConfig={{ scale: 145 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = getCountryName(geo.properties);
              const isValid = validSet.has(name);
              const isSelected = selected === name;

              // Colores base
              const baseFill = isSelected ? "#3b82f6" : isValid ? "#22c55e" : "#e5e7eb";

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => isValid && setHovered(name)}
                  onMouseLeave={() => isValid && setHovered(null)}
                  onClick={() => isValid && setSelected(name)}
                  style={{
                    default: {
                      outline: "none",
                      stroke: "#111",
                      strokeWidth: 0.5,
                      fill: baseFill,
                      cursor: isValid ? "pointer" : "default",
                      pointerEvents: isValid ? "auto" : "none",
                    },
                    hover: {
                      outline: "none",
                      fill: isValid ? "#ef4444" : baseFill,
                    },
                    pressed: {
                      outline: "none",
                      fill: isValid ? "#3b82f6" : baseFill,
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      <div style={{ marginTop: 8 }}>
        {hovered && <p><strong>Estás sobre:</strong> {hovered}</p>}
        {selected && <p><strong>Seleccionaste:</strong> {selected}</p>}
      </div>
    </div>
  );
}
