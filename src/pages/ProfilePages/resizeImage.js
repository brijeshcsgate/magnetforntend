// utils.js (or wherever you'd like to store this utility function)
export const resizeImage = (width, height) => ({
    width: `${width}px`,
    height: `${height}px`,
    objectFit: "cover", // Ensures the image fills the space while maintaining aspect ratio
  });
  