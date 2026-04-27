"use client";

import { useEffect, useRef, useCallback } from "react";
import "ol/ol.css";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

import Feature from "ol/Feature";
import Point from "ol/geom/Point";

import { fromLonLat, toLonLat } from "ol/proj";
import { Style, Icon } from "ol/style";

interface PhilippinesMapProps {
  onLocationChange?: (data: {
    province: string;
    city: string;
    barangay: string;
    street: string;
    zipcode: string;
    lat: number;
    lon: number;
  }) => void;
  onPinPlace?: (coords: [number, number]) => void;
}

export default function PhilippinesMap({ onLocationChange, onPinPlace }: PhilippinesMapProps = {}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapRefInstance = useRef<Map | null>(null);
  const vectorSource = useRef(new VectorSource());

  // 📍 REVERSE GEOCODING
  const reverseGeocode = useCallback(async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
      );
      const data = await res.json();
      const address = data.address;
      if (!address) return null;

      // Philippines address format parsing
      const province = address.state || "";
      const city = address.city || address.municipality || "";
      const barangay = address.suburb || address.neighbourhood || address.village || "";
      const street = address.road || "";
      const postcode = address.postcode || "";

      return {
        province,
        city,
        barangay,
        street,
        zipcode: postcode,
        lat,
        lon,
      };
    } catch (e) {
      console.error("Reverse geocoding error:", e);
      return null;
    }
  }, []);

  // 🗺️ INIT MAP
  useEffect(() => {
    if (!mapRef.current) return;

    const vectorLayer = new VectorLayer({
      source: vectorSource.current,
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([122.0, 12.0]), // Philippines center
        zoom: 6,
        minZoom: 5,
        maxZoom: 18,
      }),
    });

    mapRefInstance.current = map;

    // 🖱️ CLICK MAP → PIN + REVERSE GEOCODE
    map.on("click", async (event) => {
      const coords = toLonLat(event.coordinate);
      const lat = coords[1];
      const lon = coords[0];

      placeSinglePin(event.coordinate);

      onPinPlace?.([lon, lat]);

      const result = await reverseGeocode(lat, lon);
      if (result && onLocationChange) {
        onLocationChange(result);
      }
    });

    return () => {
      map.setTarget(undefined);
    };
  }, [onLocationChange, onPinPlace, reverseGeocode]);

  // 📌 ONLY ONE PIN (replace previous)
  const placeSinglePin = (coordinate: any) => {
    vectorSource.current.clear();

    const marker = new Feature({
      geometry: new Point(coordinate),
    });

    marker.setStyle(
      new Style({
        image: new Icon({
          src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          scale: 0.05,
        }),
      })
    );

    vectorSource.current.addFeature(marker);
  };

  // 📍 LOCATE USER
  const locateUser = useCallback(async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return false;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;
      const coords = fromLonLat([longitude, latitude]);

      mapRefInstance.current?.getView().animate({
        center: coords,
        zoom: 16,
        duration: 1000,
      });

      placeSinglePin(coords);

      onPinPlace?.([longitude, latitude]);

      const result = await reverseGeocode(latitude, longitude);
      if (result && onLocationChange) {
        onLocationChange(result);
      }

      return true;
    } catch (error) {
      console.error("Geolocation error:", error);
      const code = (error as GeolocationPositionError).code;
      if (code === 1) {
        alert("Location access denied. Please enable location permissions.");
      } else {
        alert("Unable to get your location. Please try again.");
      }
      return false;
    }
  }, [onLocationChange, onPinPlace, reverseGeocode]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full" />
      {/* Locate button overlay */}
      <button
        onClick={locateUser}
        className="absolute bottom-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all duration-150 active:scale-95"
        title="Use my current location"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" fill="#4285F4" />
        </svg>
      </button>
    </div>
  );
}
