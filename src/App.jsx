// import './App.css';
// import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useQuery } from '@tanstack/react-query';
import { Route, Routes, useParams } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';
import AdminLayout from '@/components/Layout/adminLayout';
import CommonLayout from '@/components/Layout/commonLayout';
import { LoadScript } from '@react-google-maps/api';
import apiService from '@/lib/apiService';
import { getRolesPermissions } from './utils/rolespermission';
import { protectedRoutes, publicRoutes } from '@/routes';
import useAppStore from '@/store';
import useStore from './store/userStore';
import { TitleOfPageProvider } from './components/Layout/commonLayout/TitleOfPageProvider';
import ProfilepageUser from './pages/ProfilePages/ProfilepageUser';

const GOOGLE_MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY;

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useAppStore();
  const { permissions, setPermissions } = useStore();

  const { id } = useParams(); // Access the id from URL
  // let profileId = id;
  const { isLoading } = useQuery({
    queryKey: ['verifyToken'],
    queryFn: async () =>
      await apiService.get('v1/auth/verifyToken').then((res) => {
        // if (res.code === 200) {
          setIsAuthenticated(true);
          console.log('ussss>>', res.data?.user?.roleId?.permissions);
          setUser(res.data?.user);
          setPermissions(res.data?.user?.roleId?.permissions);
        // } else {
        //   setIsAuthenticated(false);
        // }
      }),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    enabled: true,
  });

  if (isLoading) {
    return <LoadingScreen className="h-screen w-screen" />;
  }

  const renderRoutes = (routes, Layout) =>
    routes
      .filter((route) => {
        if (!route.permission) return true;
        const { moduleName, actions } = route.permission;
        return getRolesPermissions(permissions, moduleName, actions);
      })
      .map((route, index) => (
        <Route
          path={route.path}
          key={index}
          element={
            <TitleOfPageProvider>
              <Layout>
                <LoadScript googleMapsApiKey={GOOGLE_MAP_KEY}>
                  <route.component />
                </LoadScript>
              </Layout>
            </TitleOfPageProvider>
          }
        />
      ));

  return (
    <Routes>
      {isAuthenticated
        ? renderRoutes(protectedRoutes, AdminLayout)
        : renderRoutes(publicRoutes, CommonLayout)}
        {/* <Route
          path='/profile'
          // key={index}
          element={<ProfilepageUser/>}
        /> */}
        <Route path='/profile/:id' element={<ProfilepageUser />} />
    </Routes>
  );
};

export default App;
