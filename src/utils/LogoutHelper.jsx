export default function LogoutHelper({
  setIsAuthenticated,
  setUser,
  setPermissions,
}) {
  setUser(null);
  setPermissions([]);
  setIsAuthenticated(false);
}
