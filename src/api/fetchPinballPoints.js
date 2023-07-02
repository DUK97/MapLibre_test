
export const fetchPinballPoints = async ()=>{
    let pinballPointsArray;
    try {
        const pinballPoints =  await fetch(process.env.VUE_APP_API_URL_PINBALL);
        pinballPointsArray = await pinballPoints.json();
    } catch (error) {
        console.error(error)
    }
    return pinballPointsArray;
}