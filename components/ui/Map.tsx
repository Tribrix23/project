"use client";

import {
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";

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

const PhilippinesMap = forwardRef<any, PhilippinesMapProps>(
  ({ onLocationChange, onPinPlace }, ref) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapRefInstance = useRef<Map | null>(null);
    const vectorSource = useRef(new VectorSource());

    // 🔒 Prevent animation interruption
    const isAnimatingRef = useRef(false);

    // 🔁 Stable callbacks
    const onLocationChangeRef = useRef(onLocationChange);
    const onPinPlaceRef = useRef(onPinPlace);

    useEffect(() => {
      onLocationChangeRef.current = onLocationChange;
      onPinPlaceRef.current = onPinPlace;
    }, [onLocationChange, onPinPlace]);

    // 📍 Reverse Geocode
    const reverseGeocode = useCallback(async (lat: number, lon: number) => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
        );
        const data = await res.json();
        const address = data.address;
        if (!address) return null;

        return {
          province: address.state || "",
          city: address.city || address.municipality || "",
          barangay:
            address.suburb || address.neighbourhood || address.village || "",
          street: address.road || "",
          zipcode: address.postcode || "",
          lat,
          lon,
        };
      } catch (e) {
        console.error("Reverse geocoding error:", e);
        return null;
      }
    }, []);

    // 📌 Single Pin
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
          center: fromLonLat([122.0, 12.0]),
          zoom: 6,
          minZoom: 5,
          maxZoom: 18,
        }),
      });

      mapRefInstance.current = map;

      // 🖱️ CLICK
      map.on("click", async (event) => {
        if (isAnimatingRef.current) return;

        const coords = toLonLat(event.coordinate);
        const lat = coords[1];
        const lon = coords[0];

        placeSinglePin(event.coordinate);
        onPinPlaceRef.current?.([lon, lat]);

        const result = await reverseGeocode(lat, lon);
        if (result && onLocationChangeRef.current) {
          onLocationChangeRef.current(result);
        }
      });

      return () => {
        map.setTarget(undefined);
      };
    }, []);

    // 📍 Locate User
    const locateUser = useCallback(async () => {
      if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return false;
      }

      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 10000,
            });
          }
        );

        const { latitude, longitude } = position.coords;
        const coords = fromLonLat([longitude, latitude]);

        const view = mapRefInstance.current?.getView();
        if (!view) return false;

        isAnimatingRef.current = true;

        view.animate(
          {
            center: coords,
            zoom: 16,
            duration: 1000,
          },
          () => {
            isAnimatingRef.current = false;
          }
        );

        placeSinglePin(coords);
        onPinPlaceRef.current?.([longitude, latitude]);

        const result = await reverseGeocode(latitude, longitude);
        if (result && onLocationChangeRef.current) {
          onLocationChangeRef.current(result);
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }, [reverseGeocode]);

    // 🗺️ Expose functions to parent
    useImperativeHandle(ref, () => ({
      locateUser,

      zoomToLocation: (lat: number, lon: number) => {
        const coords = fromLonLat([lon, lat]);

        const view = mapRefInstance.current?.getView();
        if (!view) return;

        isAnimatingRef.current = true;

        view.animate(
          {
            center: coords,
            zoom: 17,
            duration: 1000,
          },
          () => {
            isAnimatingRef.current = false;
          }
        );

        placeSinglePin(coords);
      },
    }));

    return (
      <div className="w-full h-full relative">
        <div ref={mapRef} className="w-full h-full" />

        {/* 📍 Locate Button */}
        <button
          onClick={locateUser}
          disabled={isAnimatingRef.current}
          className="absolute bottom-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-95 disabled:opacity-50"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4285F4"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="3" fill="#4285F4" />
          </svg>
        </button>
      </div>
    );
  }
);

export default PhilippinesMap;