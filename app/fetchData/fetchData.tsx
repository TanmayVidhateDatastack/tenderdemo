
import React, { useState, useEffect } from 'react';
export interface fetchdataprops 
{
url: string;
method:'GET' |'POST' |'DELETE'|'Put';
dataObject :any;

};
const fetchData: React.FC<fetchdataprops> =(
  { 
   url,
   method,
   dataObject,
     })=> 
{
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() =>{
    const fetchDataUrl = async () => {
      try {
        const options: RequestInit = {
          method: method, 
          headers: {
            'Content-Type': 'application/json',
          },
          body: method === 'GET' ? null : JSON.stringify(dataObject),
        };

        const response = await fetch(url,options);
        if (!response.ok) 
        {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json(); 
        setData(result);
    
      } 
      
      
      
      catch (error) {
   
        alert(`Error occurred: ${error.message}`);
      } 
      
    };

    fetchDataUrl();
  }, [url, method, dataObject]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {data && <p>{JSON.stringify(data, null, 2)}</p>}
    </div>
  );

};

export default fetchData;
























































































































