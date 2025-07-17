const axios = require("axios");

const token = "y0_AgAAAABom-G9AAc6MQAAAADgYVtmAd8k1lO_RLCBcOQ2H-H35JnyRsg";

function replaceSpacesWithPlus(inputString) {
  console.log(inputString);
  return inputString.replace(/ /g, "+");
}

async function getCoordinates(inputString) {
    const newString = replaceSpacesWithPlus(inputString);
    const geocodeResponse = await axios.get(
      `https://geocode-maps.yandex.ru/1.x/?apikey=e6fe2a3b-fa6d-456d-8847-502385e9b154&format=json&geocode=${newString}`
    );
    const result =
      geocodeResponse.data.response.GeoObjectCollection.featureMember[0]
        .GeoObject.Point.pos;
    return result.split(" ").map(Number);
}

async function createOrder(inputString) {

    let coordinates = await getCoordinates(inputString);
    
    return {
        route_points: [
          {
            id: 1,
            fullname: "Ярославль, улица Бабича, 3В",
            coordinates: [39.770583, 57.699097]
          },
          {
            id: 2,
            fullname: inputString,
            coordinates: coordinates
          }
        ],
        requirements: {
          cargo_options: ["auto_courier"]
        }
      };
}

async function getPrice(order, token) {
  try {

    const response = await axios.post(
      `/api/b2b/cargo/integration/v2/check-price`,
      order,
      {
        headers: {
          "Accept-Language": "ru",
          "Content-Type": "application/json",
        "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function init(string) {
    let new_order = await createOrder(string);
    let response = await getPrice(new_order, token);
    return {
      price: response.price,
      eta: response.eta,
      distance: response.distance_meters
  };
};

export function getAddress(query) {
  var url =
    "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  var token = "475be05d5b20b8e082adb0173d447e422b2e9c23";

  var options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
    body: JSON.stringify({ query: `Ярославль ${query}` }),
  };

  return fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      const suggestions = result.suggestions
        .map((suggestion) => ({
          value: suggestion.value,
          house: suggestion.data.house,
        }))
        .filter(
          (suggestion) =>
            !suggestion.value.includes("кв") &&
            !suggestion.value.includes("помещ")
        )
        .slice(0, 3);
      return suggestions;
    })
    .catch((error) => {
      console.log("error", error);
      throw error;
    });
}

