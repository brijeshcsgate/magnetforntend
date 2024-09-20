import {
  bus,
  calenderShell,
  chevronRight,
  crewPool,
  locationPin,
  maintenance,
  notificationBell,
  partsInventory,
  personAdd,
  planRouteIcon,
  specialDays,
} from '@/assets/Icons';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GettingStartedPage() {
  const navigate = useNavigate();
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Getting Started');
  }, []);

  const links = [
    {
      color: '#E6E6FA',
      icon: calenderShell({
        width: 18,
        height: 18,
        className: 'text-blue-primary-200',
      }),
      title: 'Dispatcher',
      description: 'Generate trip authorization for the upcoming duty',

      onClick: () => navigate('/dispatcher'),
    },
    {
      color: '#87CEEB',
      icon: bus({
        width: 18,
        height: 18,
      }),
      title: 'Add UPSRTC Fleet',
      description:
        'Add your UPSRTC Buses using single vehicle addition or bulk upload',
      onClick: () => navigate('/vehicles/add'),
    },
    {
      color: '#98FB98',
      icon: planRouteIcon({
        width: 18,
        height: 18,
      }),
      title: 'Plan a New Route',
      description: 'Create a new route plan for your fleet',
      onClick: () => navigate('/route/add'),
    },

    {
      color: '#F7E7CE',
      icon: maintenance({
        width: 18,
        height: 18,
      }),
      title: 'Maintenance',
      description: 'View open service issues',
      onClick: () => navigate('/issues'),
    },

    {
      color: '#FFB6C1',
      icon: crewPool({
        width: 18,
        height: 18,
      }),
      title: 'Crew Pool',
      description: 'Check your Drivers & Conductors and new resources',
      onClick: () => navigate('/crew'),
    },
    {
      color: '#FFF8DC',
      icon: personAdd({
        width: 18,
        height: 18,
      }),
      title: 'Invite your team members',
      description: 'Invite other users and assign their role',
      onClick: () => navigate('/users/add'),
    },

    {
      color: '#FFDAB9',
      icon: specialDays({
        width: 18,
        height: 18,
      }),
      title: 'Special Days',
      description: 'Check the marked special days or create a new one',
      href: '/',
    },
    {
      color: '#CCCCFF',
      icon: partsInventory({
        width: 18,
        height: 18,
      }),
      title: 'Parts Inventory',
      description: 'Review the inventory of the spares',
      href: '/',
    },
    // {
    //   color: "#FFFF99",
    //   icon: notificationBell({
    //     width: 18,
    //     height: 18,
    //   }),
    //   title: "Invite your team members",
    //   description: "View important reminders on vehicle & resources",
    //   href: "/",
    // },
    {
      color: '#AFEEEE',
      icon: locationPin({
        width: 18,
        height: 18,
      }),
      title: 'UPSRTC Zone',
      description: 'Review the various places of UPSRTC',
      href: '/',
    },
  ];


  return (
    <section className="w-full h-full flex flex-col gap-4">
      <section className="w-full bg-white shadow-md flex-grow overflow-auto w-full h-[calc(100vh-71px)]">
        <div className="flex items-center justify-between gap-4 p-12 pb-0">
          <div className="flex flex-col gap-1 border-l-4 pl-4 border-blue-primary-200">
            <h1 className="text-2xl font-medium text-blue-primary-200">
              Welcome to UPSRTC Depot Management System
            </h1>
            <p className="leading-7 text-base text-gray-tertiary">
              Access this quick menu to navigate to the important parts of this
              system{' '}
            </p>
          </div>
        </div>
        <section className="mt-4 px-12 pt-4 scrollbar overflow-y-scroll h-[calc(100vh-71px-30px-114px)] ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start items-start">
            {links.map((item, idx) => (
              <div
                className="flex border-2 border-gray-quaternary/25 p-4 hover:bg-gray-quaternary/10 cursor-pointer w-full h-full"
                key={idx}
                onClick={item.onClick}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{ backgroundColor: item.color }}
                  x
                >
                  <span className="w-12 h-12 flex place-content-center items-center justify-center">
                    {item.icon}
                  </span>
                </div>
                <div className="flex flex-col space-y-1 ml-4 mr-2 w-fit">
                  <h2 className="text-sm text-gray-primary font-semibold">
                    {item.title}
                  </h2>
                  <p className="text-xs text-gray-tertiary ">
                    {item.description}
                  </p>
                </div>
                <div className="ml-auto w-5 h-5">
                  {chevronRight({
                    width: 18,
                    height: 18,
                    className: 'text-blue-primary-200',
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </section>
  );
}
