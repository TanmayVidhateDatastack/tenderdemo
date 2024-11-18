export const parseCsv = async (
    file: File
  ): Promise<string[][]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const rows = text.trim().split('\n');
        const data = rows.map(x=>x.split(',').map((header) => header.trim()));
  
       
  
        resolve(data);
      };
  
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };
//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       try {
//         const rows = await parseCsv<T>(file);
//         console.log('Parsed Rows:', rows); // Logs rows of type CsvRow[]
//       } catch (error) {
//         console.error('Error parsing CSV:', error);
//       }
//     }
//   };
  