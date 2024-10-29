import { useEffect, useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import '../../../App.css';
import '../../../index.css';
import '../Admin.css';
import useStore from '@/store/userStore';
import { APIS } from '@/constants/api.constant';
import apiService from '@/lib/apiService';

const AdminLayout = (props) => {
  const { user, setUser, permissions, setPermissions } = useStore();

  const getUser = async () => {
    try {
      const res = await apiService.get(APIS.USER_PROFILE);
      setUser(res.data?.userDetails);
      setPermissions(res.data?.userDetails?.roleId?.permissions);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const toggleSidebar = (isOpen) => {
    setIsShowSidebar(isOpen !== undefined ? isOpen : !isShowSidebar);
  };
  const closeSidebar = () => {
    setIsShowSidebar(false); 
  };
  return (
    <div className="adminLayoutWrap">
      {isShowSidebar && (
        <div className="overlay1" onClick={() => toggleSidebar()} />
      )}

      <Sidebar
        page={props.page}
        currentUser={props.currentUser}
        isShowSidebar={isShowSidebar}
        toggleSidebar={toggleSidebar}
        permissions={permissions}
        onMouseEnter={toggleSidebar} // Call toggleSidebar on mouse enter
        onMouseLeave={closeSidebar} // Add this line
      />

      <div
        className={`adminLayoutInner ${
          isShowSidebar ? 'marginLeft active-sidebar' : ''
        }`}
      >
        <Header currentUser={props.currentUser} isShowSidebar={isShowSidebar}/>
        <div className="layoutContent !pb-0 h-[calc(100vh-59px)]">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
