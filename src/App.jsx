
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
import ReactGA from "react-ga4";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Profilev2Main from './pages/profiles/profile-v2/Profilev2Main';
import ProfileV4Main from './pages/profiles/profile-v4/ProfileV4Main';
import ProfileV1Main from './pages/profiles/profile-v1/ProfileV1Main';
import useSecurityDeterrents from './components/common/SecurityFeatures/useSecurityDeterrents';
import { Toaster } from 'sonner';
import FBIndex from './pages/profiles/FacbookProfile/FBIndex';
// import { Toaster } from 'sonner';
const GOOGLE_MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY;
// Initialize GA4
ReactGA.initialize("G-BRYE3XKVN9");

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useAppStore();
  const { permissions, setPermissions } = useStore();
  // useSecurityDeterrents();
  const { id } = useParams(); // Access the id from URL
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  const { isLoading } = useQuery({
    queryKey: ['verifyToken'],
    queryFn: async () =>
      await apiService.get('v1/auth/verifyToken').then((res) => {
        // if (res.code === 200) {
          setIsAuthenticated(true);
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
    <><Toaster />    <Routes>
       
      {isAuthenticated
        ? renderRoutes(protectedRoutes, AdminLayout)
        : renderRoutes(publicRoutes, CommonLayout)}
        
        <Route path='/profile/:id' element={<ProfilepageUser />} />
        <Route  path='/magnetv1/:id' element={<Profilev2Main/>} />
      <Route  path='/profiles/v4' element={<ProfileV4Main/>} />
      <Route  path='/profiles' element={<ProfileV1Main/>} />
      <Route  path='/magnetfb' element={<FBIndex/>} />
   
        {/* <Route path='/dashboard' element={<AnalyticsDashboard />} /> */}


    </Routes>
     {/* <AnalyticsDisplay/> */}
    </>

  );
};

export default App;
