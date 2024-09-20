export const parseFileNameFromUrl = (url) => {
  try {
    // Create a new URL object
    const urlObj = new URL(url);

    // Extract the pathname (part after the domain)
    const pathname = urlObj.pathname;

    // Split the pathname by '/' and get the last part
    let fileName = pathname.substring(pathname.lastIndexOf('/') + 1);

    // Decode the file name to handle any URL encoding
    fileName = decodeURIComponent(fileName);

    // Remove the date string using a regular expression
    const datePattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;
    fileName = fileName.replace(datePattern, '');

    return fileName;
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
};
