'use server';

const DRINKS_MODEL_URL = "https://api.up2tom.com/v3/models";
const MODEL_ID = "58d3bcf97c6b1644db73ad12"
const API_KEY = "9307bfd5fa011428ff198bb37547f979";


export const fetchDrinksModel = async (modelId: string = MODEL_ID) => {
  const drinksUrl = `${DRINKS_MODEL_URL}/${modelId}`;
  try {
    const response = await fetch(drinksUrl, {
      method: "GET",
      headers: {
        "Authorization": API_KEY,
        "Content-Type": "application/vnd.api+json",
      },
    });
    if (!response.ok) {
        const body = await response.text();
      return Promise.reject(JSON.parse(body));
    }
    const data = await response.json();
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error.message);
  }
};

export const postDrinksModelAttributes = async (requestData: any) => {
    try {
      const drinksUrl = `${DRINKS_MODEL_URL}/${MODEL_ID}`;
      const response = await fetch(drinksUrl, {
        method: "POST",
        headers: {
          "Authorization": API_KEY,
          "Content-Type": "application/vnd.api+json",
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
          const body = await response.text();
        return Promise.reject(JSON.parse(body));
      }
      const body = await response.json();
      return Promise.resolve(body);
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };
