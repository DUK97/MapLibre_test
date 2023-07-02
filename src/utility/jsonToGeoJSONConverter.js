/**
 *
 * @param {Array} JSON - regularJSON
 * @return {Object} geoJSON - regularJSON converted to GeoJSON
 *
 */

function convertJSONToGeoJSON(JSON) {
    const geoJSON = {
        type: "FeatureCollection",
        features: [],
    };
    JSON.locations.forEach(object => {
        geoJSON.features.push({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": object.locations.coordinates,
            },
            "properties": {
                "id": object["id"],
                "name": object["name"],
            }
        })
    })


    return geoJSON
}

export default convertJSONToGeoJSON