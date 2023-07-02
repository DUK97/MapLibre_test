/**
 *
 * @param {Object} JSON - regularJSON
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
                "coordinates": [object.lon,object.lat],
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