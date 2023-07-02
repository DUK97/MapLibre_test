/**
 *
 * @param {Object} mapInstance
 * @param {String} mapSourceId
 * @param {Array} pointsLocations
 */
export const renderMapLayer = function (mapInstance, mapSourceId, pointsLocations) {
    console.log(mapInstance, mapSourceId);
    console.log(pointsLocations)
    mapInstance.addSource(mapSourceId, {type: "geojson", data: pointsLocations})
    const circleColor = mapSourceId === 'pinball' ? '#F12D1E' : '#73197C';
    mapInstance.addLayer({
        'id': mapSourceId,
        'type': 'circle',
        'source': mapSourceId,
        paint: {
            "circle-color": circleColor,
            "circle-radius": 7,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
        }
    });


}