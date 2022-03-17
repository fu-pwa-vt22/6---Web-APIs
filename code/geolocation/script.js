const API_TOKEN = 'pk.eyJ1Ijoiam9oYW5raXZpIiwiYSI6ImNrcnl6M25xMDA4aWUyd3BqY3EzYnA1NTEifQ.ve5rEn8ZDwUGKvphMkEdpw';

document.querySelector('button')
.addEventListener('click', () => {
    // Get position
    if(navigator.geolocation){
        console.log('supported!')

        navigator.geolocation.getCurrentPosition(pos => {
            if(pos){
                showMap(pos)
            }
        })
    }
})

function showMap(pos){
    
    mapboxgl.accessToken = API_TOKEN;
    console.log(pos)
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [pos.coords.longitude, pos.coords.latitude],
        zoom: 13
    });

    new mapboxgl.Marker()
    .setLngLat([pos.coords.longitude, pos.coords.latitude])
    .addTo(map);

}



