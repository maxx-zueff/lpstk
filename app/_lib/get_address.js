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