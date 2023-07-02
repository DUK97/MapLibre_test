export const fetchSensorsPoints = async ()=>{
    let sensorsPointsArray;
    try {
      const sensorsPointsJSON =  await fetch(process.env.VUE_APP_API_URL_SENSORS);
        sensorsPointsArray = await sensorsPointsJSON.json();
    } catch (error) {
        console.error(error)
    }
    return sensorsPointsArray;
}