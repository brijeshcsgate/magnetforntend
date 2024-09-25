import { useContext, useState } from 'react';
import { notificationIcon } from '@/assets/Icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/route.constant';
import useStore from '@/store/userStore';
import axios from 'axios';
import useAppStore from '@/store';
import { CounterContext } from './commonLayout/TitleOfPageProvider';

export const BaseUrl = `${import.meta.env.VITE_APP_BASE_URL_V1}`;

const Header = ({isShowSidebar}) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, setUser, setPermissions } = useStore();
  const { setIsAuthenticated } = useAppStore();

  const handleLogout = async () => {
    await axios.post(`${BaseUrl}/v1/auth/logout`).then((res) => {  
      setUser(null);
      setPermissions([]);
      setIsAuthenticated(false);
       navigate(ROUTES.LOGIN, { replace: true });
       window.location.href = '/';
    });
  };
  // const handleChangePassword = () => {
  //   navigate(ROUTES?.USER_PROFILE);
  // };
  const navigateToView = (id) => {
    navigate(`${ROUTES.USER_PROFILE}`, {
      state: { id: id },
    });
  };
  const handleBlur = () => {
    setTimeout(() => {
      setDropdownOpen((prev) => !prev);
    }, 100);
  };
  const { count, setCount } = useContext(CounterContext);
  return (
    <div className="biHeader">
      
        <div className={isShowSidebar===false?"text-2xl font-semibold text-[#002850]":"pl-2 ml-5 text-2xl font-semibold text-[#002850]"}>
          {count}

        </div>
     
      <ul className="biHeaderNav">
        <li className="biList">
          {notificationIcon({ width: 24, height: 24, fill: '#8da3b6' })}
        </li>

        <li className="biUser relative">
          <div className="biUserWrap flex items-center cursor-pointer">
            <img
              src="/assets/images/user.png"
              alt="John Smith"
              className="biUserImg w-8 h-8 rounded-full"
            />
            <button
              className="biUserNameWrap ml-2 v-center"
              style={{ gap: '10px' }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onBlur={handleBlur}
            >
              <div>
                <div className="biUserName text-sm font-semibold">
                  {user?.name?.english}
                </div>
                <div className="biUserRole text-xs text-gray-500">
                  {user?.designation}
                </div>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-1">
              <li>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={()=>navigateToView(user?._id)}


                >
                  User Profile
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
