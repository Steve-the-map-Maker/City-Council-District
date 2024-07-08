console.log("Loading map.js file...");

fetch("data/Updated_Portland_City_Council_Districts.geojson")
  .then((response) => response.json())
  .then((json) => {
    var geojson = json; // Store the GeoJSON data in a variable
    assignUniqueColors(geojson);
    initializeMap(geojson); // Call initializeMap with the GeoJSON data
  });

const style = {
  version: 8,
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap Contributors",
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm",
    },
  ],
};

const map = new maplibregl.Map({
  container: "map",
  style: style,
  center: [-122.62283427563828, 45.50856459753845],
  zoom: 10.5,
});

function assignUniqueColors(geojsonData) {
  const colors = [
    "#e6194B", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#46f0f0", "#f032e6",
    "#bcf60c", "#fabebe", "#008080", "#e6beff", "#9a6324", "#fffac8", "#800000", "#aaffc3",
    "#808000", "#ffd8b1", "#000075", "#808080"
  ];

  geojsonData.features.forEach((feature, index) => {
    feature.properties.color = colors[index % colors.length];
  });
}

function initializeMap(geojsonData) {
  map.on("load", function () {
    map.addSource("districts", {
      type: "geojson",
      data: geojsonData,
    });

    map.addLayer({
      id: "districts-fill",
      type: "fill",
      source: "districts",
      layout: {},
      paint: {
        "fill-color": ["get", "color"],
        "fill-opacity": 0.5,
        "fill-outline-color": "#000000", // Black outline for polygons
      },
    });

    map.addLayer({
      id: "districts-outline",
      type: "line",
      source: "districts",
      layout: {},
      paint: {
        "line-color": "#000000",
        "line-width": 2,
      },
    });

    map.addLayer({
      id: "districts-labels",
      type: "symbol",
      source: "districts",
      layout: {
        "text-field": ["get", "DISTRICT"],
        "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
        "text-size": 14,
        "text-offset": [0, 0.6],
        "text-anchor": "top"
      },
      paint: {
        "text-color": "#000000"
      }
    });
  });
}
