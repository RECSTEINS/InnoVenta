import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './css/MapaRestaurantes.css';

// Fix para los iconos de Leaflet en React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Coordenadas de Cancún
const CANCUN_CENTER = [21.1743, -86.8466];

const MapaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerRestaurantes = async () => {
      try {
        // Query de Overpass API para obtener restaurantes en Cancún
        const query = `
          [out:json][timeout:25];
          (
            node["amenity"="restaurant"](21.0,-87.0,21.3,-86.5);
            way["amenity"="restaurant"](21.0,-87.0,21.3,-86.5);
            relation["amenity"="restaurant"](21.0,-87.0,21.3,-86.5);
          );
          out body;
          >;
          out skel qt;
        `;

        const response = await fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `data=${encodeURIComponent(query)}`,
        });

        const data = await response.json();
        
        // Procesar los datos de restaurantes
        const restaurantesData = data.elements
          .filter(element => element.type === 'node' && element.lat && element.lon)
          .map(element => ({
            id: element.id,
            name: element.tags?.name || 'Restaurante',
            cuisine: element.tags?.cuisine || 'Cocina variada',
            lat: element.lat,
            lon: element.lon,
            address: element.tags?.['addr:street'] || 'Dirección no disponible'
          }))
          .slice(0, 20); // Limitar a 20 restaurantes para mejor rendimiento

        setRestaurantes(restaurantesData);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener restaurantes:', error);
        setLoading(false);
      }
    };

    obtenerRestaurantes();
  }, []);

  if (loading) {
    return (
      <div className="mapa-container">
        <div className="loading-mapa">
          <h2>Mapa de Restaurantes en Cancún</h2>
          <p>Cargando restaurantes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mapa-container">
      <div className="mapa-header">
        <h2>Restaurantes en Cancún</h2>
        <p>Descubre los mejores restaurantes de la zona que ya usan innoventa</p>
      </div>
      
      <div className="mapa-wrapper">
        <MapContainer
          center={CANCUN_CENTER}
          zoom={13}
          style={{ height: '500px', width: '100%' }}
          className="mapa-leaflet"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {restaurantes.map((restaurante) => (
            <Marker
              key={restaurante.id}
              position={[restaurante.lat, restaurante.lon]}
            >
              <Popup>
                <div className="popup-content">
                  <h3>{restaurante.name}</h3>
                  <p><strong>Tipo:</strong> {restaurante.cuisine}</p>
                  <p><strong>Dirección:</strong> {restaurante.address}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapaRestaurantes;
