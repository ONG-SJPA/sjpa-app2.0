import axios from "axios";

export async function getCatchImage() {
  const response = await axios.get("https://api.thecatapi.com/v1/images/search");

  if (!response.data) {
    return "";
  }

  return response.data[0].url as string;
}