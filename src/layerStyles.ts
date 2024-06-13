import {
    FillLayer,
    LineLayer,
} from "react-map-gl/maplibre";

// Define layer styles
const oilGasFieldsStyle: FillLayer = {
    id: 'oilGasFields',
    type: 'fill',
    paint: {
        'fill-color': '#088',
        'fill-opacity': 0.8,
        'fill-outline-color': '#000'
    },
    source: "Oil And Gas Fields"
};

const basinNamesStyle: FillLayer = {
    id: 'basinNames',
    type: 'fill',
    paint: {
        'fill-color': '#800080',
        'fill-opacity': 0.5,
        'fill-outline-color': '#000'
    },
    source: "Basin Names"
};

const pipelinesStyle: LineLayer = {
    id: 'pipelines',
    type: 'line',
    paint: {
        'line-color': '#ff0000',
        'line-width': 2
    },
    source: "Pipelines"
};

const quadsStyle: FillLayer = {
    id: '24kQuads',
    type: 'fill',
    paint: {
        'fill-color': '#00ff00',
        'fill-opacity': 0.3,
        'fill-outline-color': '#000'
    },
    source: "24k Quads"
};

const highwaysStyle: LineLayer = {
    id: 'highways',
    type: 'line',
    paint: {
        'line-color': '#0000ff',
        'line-width': 2
    },
    source: "Highways"
};

const landownershipStyle: FillLayer = {
    id: 'landownership',
    type: 'fill',
    paint: {
        'fill-color': '#ffA500',
        'fill-opacity': 0.4,
        'fill-outline-color': '#000'
    },
    source: "Landownership"
};

const riversStyle: LineLayer = {
    id: 'rivers',
    type: 'line',
    paint: {
        'line-color': '#0000ff',
        'line-width': 1.5
    },
    source: "Rivers"
};

const streamsStyle: LineLayer = {
    id: 'streams',
    type: 'line',
    paint: {
        'line-color': '#00ffff',
        'line-width': 1
    },
    source: "Streams"
};

export {
    oilGasFieldsStyle,
    basinNamesStyle,
    pipelinesStyle,
    quadsStyle,
    highwaysStyle,
    landownershipStyle,
    riversStyle,
    streamsStyle
};
