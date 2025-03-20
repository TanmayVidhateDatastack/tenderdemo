import { FetchDataProps } from "../types";
 
const fetchData = async ({
  url,
  method = "GET",
  dataObject,
  headers = { "Content-Type": "application/json" },
}: FetchDataProps) => {
  try {
    const options: RequestInit = {
      method,
      headers: new Headers(headers),
      body: method === "GET" ? null : JSON.stringify(dataObject),
    };
 
    const response = await fetch(url, options);
 
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error occurred: ${error.message}`);
    }
    throw error;
  }
};
 
export default fetchData;
 
 
 
 
 

 