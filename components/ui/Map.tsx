"use client";

import { useEffect, useRef, useState } from "react";
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

export default function PhilippinesMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapRefInstance = useRef<Map | null>(null);
  const vectorSource = useRef(new VectorSource());

  const [search, setSearch] = useState("");
  const [address, setAddress] = useState("");

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

      const result = await reverseGeocode(lat, lon);
      setAddress(result);
    });

    return () => {
      map.setTarget(undefined);
    };
  }, []);

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

  // 🔎 SEARCH LOCATION → FLY + PIN
  const searchLocation = async () => {
    if (!search) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${search}`
    );

    const data = await res.json();

    if (!data.length) {
      alert("Location not found");
      return;
    }

    const { lon, lat } = data[0];

    const coords = fromLonLat([parseFloat(lon), parseFloat(lat)]);

    mapRefInstance.current?.getView().animate({
      center: coords,
      zoom: 14,
      duration: 1000,
    });

    placeSinglePin(coords);

    const result = await reverseGeocode(lat, lon);
    setAddress(result);
  };

  // 📍 REVERSE GEOCODING (Barangay / City / Street)
  const reverseGeocode = async (lat: number, lon: number) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );

    const data = await res.json();

    return data.display_name || "No address found";
  };

  return (
    <div className="w-full h-screen relative">

      {/* 🔎 SEARCH BAR */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search location..."
          className="p-2 border rounded w-64 bg-white"
        />

        <button
          onClick={searchLocation}
          className="bg-blue-600 text-white px-3 rounded"
        >
          Search
        </button>
      </div>

      {/* 📍 ADDRESS DISPLAY */}
      {address && (
        <div className="absolute bottom-4 left-4 z-10 bg-white p-3 rounded shadow max-w-sm text-sm">
          📍 {address}
        </div>
      )}

      {/* 🗺️ MAP */}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}