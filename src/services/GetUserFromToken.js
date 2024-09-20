import { jwtDecode } from 'jwt-decode';

export default function getUserIdFromToken() {
  const token =
    localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      // console.log('User ID:', decodedToken);
      return decodedToken.id;
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }
  return null;
}

// const userId = getUserIdFromToken();
