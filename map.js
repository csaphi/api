fetch(
    "https://phl.carto.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM public_cases_fc WHERE requested_datetime >= current_date - 7"
  )
    .then((response) => response.json())
    .then((data) => {
      const philly311 = data.features.filter(
        (d) => d.geometry !== null && d.properties.status === "Open"
    );

    const deckgl = new deck.DeckGL({
        container: "map",
        mapboxApiAccessToken: "pk.eyJ1IjoiY3NhcGhpIiwiYSI6ImNsOXd0eXJ5aDA0MXozcm1qbTl0Z3dldnkifQ.NZxoecH0XDE2h-SOyCxeEQ",
        mapStyle: "mapbox://styles/csaphi/cl9wu1dto000214qh4jfaga4y",
        initialViewState:{
            latitude: 39.9526,
            longitude: -75.1652,
            zoom: 12,
            bearing:0,
            pitch:0,
        },
        controller: true,

        layers: [
            new deck.ScatterplotLayer({
                id:"points-311",
                data: philly311,
                getPosition: (d)=>d.geometry.coordinates,
                opacity: 0.7,
                stroked: false,
                filled: true,
                radiusScale: 20,
                radiusMinPixels: 2,
                radiusMaxPixels: 50,
                lineWidthMinPixels:1,
                getFillColor: [255, 255, 255],
            }),
        ],
    });
    
    });
  