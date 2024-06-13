import {
  Map,
  GeolocateControl,
  NavigationControl,
  Source,
  Layer,
  Popup,
  MapLayerMouseEvent
} from "react-map-gl/maplibre";
import { MaplibreLegendControl } from "@watergis/maplibre-gl-legend";
import '@watergis/maplibre-gl-legend/dist/maplibre-gl-legend.css';

import "maplibre-gl/dist/maplibre-gl.css";
import { useCallback, useState } from "react";
import { oilGasFieldsStyle, basinNamesStyle, pipelinesStyle, quadsStyle, highwaysStyle, landownershipStyle, riversStyle, streamsStyle } from "./layerStyles";

function App() {
  const [popupInfo, setPopupInfo] = useState<{
    longitude: number,
    latitude: number,
    features: { [key: string]: object }[],
    title: string
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const onClick = useCallback((event: MapLayerMouseEvent) => {
    const { lngLat, features } = event;
    if (features && features.length > 0) {
      setPopupInfo({
        longitude: lngLat.lng,
        latitude: lngLat.lat,
        features: features.map(f => f.properties),
        title: features[0].layer.id
      });
      setCurrentPage(0); // Reset to the first page on new click
    }
  }, []);

  const nextPage = () => {
    if (popupInfo && currentPage < popupInfo.features.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (popupInfo && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: 'relative' }}>
      <Map
        initialViewState={{
          longitude: -113,
          latitude: 39.5,
          zoom: 6.5,
        }}
        hash={true}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json"
        onClick={onClick}
        interactiveLayerIds={['oilGasFields', 'basinNames', 'pipelines', '24kQuads', 'highways', 'landownership', 'rivers', 'streams']}
      >
        <GeolocateControl position="top-right" />
        <NavigationControl
          position="top-right"
          visualizePitch={true}
          showZoom={true}
          showCompass={true}
        />


        <Source id="oilGasFields" type="geojson" data='https://pgfeatureserv-souochdo6a-wm.a.run.app/collections/emp.oilgasfields/items.json'>
          <Layer {...oilGasFieldsStyle} />
        </Source>
        <Source id="basinNames" type="geojson" data='https://pgfeatureserv-souochdo6a-wm.a.run.app/collections/emp.basin_names/items.json'>
          <Layer {...basinNamesStyle} />
        </Source>
        <Source id="pipelines" type="geojson" data='https://pgfeatureserv-souochdo6a-wm.a.run.app/collections/emp.pipelines/items.json'>
          <Layer {...pipelinesStyle} />
        </Source>
        <Source id="24kQuads" type="geojson" data='https://pgfeatureserv-souochdo6a-wm.a.run.app/collections/gengis.24kquads/items.json'>
          <Layer {...quadsStyle} />
        </Source>
        <Source id="highways" type="geojson" data='https://pgfeatureserv-souochdo6a-wm.a.run.app/collections/gengis.highways/items.json'>
          <Layer {...highwaysStyle} />
        </Source>
        <Source id="landownership" type="geojson" data='https://pgfeatureserv-souochdo6a-wm.a.run.app/collections/gengis.landownershipugrc/items.json'>
          <Layer {...landownershipStyle} />
        </Source>
        <Source id="rivers" type="geojson" data='https://pgfeatureserv-souochdo6a-wm.a.run.app/collections/gengis.rivers/items.json'>
          <Layer {...riversStyle} />
        </Source>
        <Source id="streams" type="geojson" data='https://pgfeatureserv-souochdo6a-wm.a.run.app/collections/gengis.streamsnhdmajor/items.json'>
          <Layer {...streamsStyle} />
        </Source>

        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            onClose={() => setPopupInfo(null)}
            closeOnClick={false}
          >
            <div>
              <h3>Feature Info: Layer {popupInfo.title}</h3>
              <p>Feature {currentPage + 1} of {popupInfo.features.length}</p>
              {Object.entries(popupInfo.features[currentPage]).map(([key, value]) => (
                <div key={key}><strong>{key}:</strong> {value.toString()}</div>
              ))}
              <div>
                {currentPage > 0 && <button onClick={previousPage}>Previous</button>}
                {currentPage < popupInfo.features.length - 1 && <button onClick={nextPage}>Next</button>}
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default App;
