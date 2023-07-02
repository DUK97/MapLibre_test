/**
 *
 * @param {Object} mapInstance
 * @param {String} mapSourceId
 * @param {Array} pointsLocations
 */
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


}