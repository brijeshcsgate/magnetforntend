export const createCSVContent = (rawData) => {
    // Split the raw data into lines
    const lines = rawData.trim().split("\n");
  
    // Extract headers and rows
    const headers = lines[0].split(",");
    const rows = lines.slice(1).map((line) => line.split(","));
  
    // Create CSV content
    let csvContent = headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });
  
    return csvContent;
  };
  
  export const downloadCSV = (csvContent, filename) => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };