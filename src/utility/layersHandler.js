/**
 *
 * @param {Object} mapInstance
 * @param {String} mapSourceId
 * @param {Array} pointsLocations
 */
import maplibregl from "maplibre-gl";

export const renderMapLayer = function (mapInstance, mapSourceId, pointsLocations) {
    mapInstance.addSource(mapSourceId, {type: "geojson", data: pointsLocations})
    const circleColor = mapSourceId === 'pinball' ? '#F12D1E' : '#73197C';
    mapInstance.addLayer({
        'id': mapSourceId,
        'type': 'circle',
        'source': mapSourceId,
        paint: {
            "circle-color": circleColor,
            "circle-radius": 5,
            "circle-stroke-width": 1,
            "circle-stroke-color": circleColor,
        }
    });
    const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    mapInstance.on('mouseenter', mapSourceId, function (e) {
        mapInstance.getCanvas().style.cursor = 'pointer';

        const coordinates = e.features[0].geometry.coordinates;
        const description = mapSourceId === 'pinball' ? e.features[0].properties.name : `${e.features[0].properties.name}: ${JSON.parse(e.features[0].properties.sensors).length} sensors `;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        popup.setLngLat(coordinates).setHTML(description).addTo(mapInstance);
    });

    mapInstance.addLayer({
        'id': `${mapSourceId}-label`,
        'type': 'symbol',
        'source': mapSourceId,
        'layout': {
            'text-field': ['get','name'] ,
            'text-variable-anchor': ['top', 'bottom'],
            'text-radial-offset': 0.5,
            'text-justify': 'auto',
        }
    });

    mapInstance.on('mouseleave', mapSourceId, function () {
        mapInstance.getCanvas().style.cursor = '';
        popup.remove();
    });

}