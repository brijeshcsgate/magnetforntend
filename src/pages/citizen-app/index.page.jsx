import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CitizenCentricPage() {
  const navigate = useNavigate();
  const PAGE_LINK = '/help';
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Help');
  }, []);

  const list = [
    {
      label: 'Citizen Notification',
      description: 'List of all Notification.',
      href: 'citizen-notification',
    },
    {
      label: 'Citizen Complain',
      description: 'List of all Complain.',
      href: 'citizen-complain',
    },
    {
      label: 'Citizen Feedback',
      description: 'List of all Feedback.',
      href: 'citizen-feedback',
    },
    {
      label: 'Citizen Bus Ratings',
      description: 'List of all Bus Ratings.',
      href: 'citizen-busratings',
    },
    {
      label: 'Citizen Bus Staff Ratings',
      description: 'List of all Bus Staff Ratings.',
      href: 'citizen-busstaffratings',
    },
    {
      label: 'Citizen Rent Bus',
      description: 'List of all Rent Bus.',
      href: 'citizen-rentbus',
    },
    {
      label: 'Citizen Request Route',
      description: 'List of all Request Route.',
      href: 'citizen-requestroute',
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const sortOrder = useState('asc');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter and sort the list based on `searchQuery` and `sortOrder`
  const filteredList = list
    .filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const labelA = a.label.toLowerCase();
      const labelB = b.label.toLowerCase();
      if (labelA < labelB) return sortOrder === 'asc' ? -1 : 1;
      if (labelA > labelB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <main className="w-full overflow-y-scroll scrollbar max-h-[calc(100vh-70px-71px)] bg-white">
      <div className="bg-white flex justify-between pb-5 pt-5 border-b md:p-5 px-4">
        <div className="heading-600-24 c-blue1 v-center">
          Citizen Centric App
        </div>
        <input
          className="border border-[#E0E0E0] rounded-md py-1 text-sm pr-10 pl-4 focus:outline-none max-w-sm ml-auto"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-4 h-fit p-4">
        {filteredList.map((item, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-lg shadow cursor-pointer hover:shadow-xl h-full "
            onClick={() => {
              navigate(PAGE_LINK + '/' + item.href);
            }}
          >
            <div className="flex justify-between items-center gap-2">
              <div className="w-3/4">
                <p className="font-semibold text-[16px]">{item.label}</p>
                <p className="text-[#939393] text-[12px] my-1.5">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
