document.addEventListener('DOMContentLoaded', () => {
  const map = L.map('map').setView([0, 0], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  let marker;

  function updateUserLocation(position) {
    const { latitude, longitude } = position.coords;
    map.setView([latitude, longitude], 13);

    if (marker) {
      map.removeLayer(marker);
    }

    marker = L.marker([latitude, longitude]).addTo(map)
      .bindPopup(`Latitude: ${latitude}<br>Longitude: ${longitude}`)
      .openPopup();
  }

  function handleLocationError(error) {
    console.error(error.message);
  }

  function getLocation() {
    navigator.geolocation.getCurrentPosition(updateUserLocation, handleLocationError);
  }

  document.getElementById('location-btn').addEventListener('click', getLocation);
});
