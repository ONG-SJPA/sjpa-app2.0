import axios from "axios";

export async function getDogImage() {
  const response = await axios.get("https://api.thedogapi.com/v1/images/search");

  if (!response.data) {
    return "";
  }

  return response.data[0].url as string;
}