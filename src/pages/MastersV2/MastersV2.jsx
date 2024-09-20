import { SortIcon } from '@/assets/Icons';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import { ROUTES } from '@/constants/route.constant';
import apiService from '@/lib/apiService';
import { Skeleton } from '@mui/material';
import axios from 'axios';
import { startCase } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MastersV2 = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [masters, setMasters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Masters');
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiService.get(`v2/masters/metaData`);
      const data = response;
      setCategories(['All', ...Object.keys(data.totalCountByCategory)]);
      setMasters(data.masters);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortToggle = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const filteredMasters = Object.values(masters)
    .filter(
      (master) =>
        (selectedCategory === 'All' || master.category === selectedCategory) &&
        master.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const labelA = a.label.toLowerCase();
      const labelB = b.label.toLowerCase();
      if (labelA < labelB) return sortOrder === 'asc' ? -1 : 1;
      if (labelA > labelB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const CategoryList = ({
    categories,
    selectedCategory,
    handleCategorySelect,
    masters,
  }) => (
    <aside className="min-h-full w-full md:w-1/5 border-r">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              animation="wave"
              width="100%"
              height="100%"
            />
          ))
        : categories.map((category) => (
            <div
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`text-gray-400 flex justify-between items-center px-5 py-2 cursor-pointer ${
                category === selectedCategory
                  ? 'bg-[#E9F4FF] c-blue1 font-semibold'
                  : ''
              }`}
            >
              <p>{startCase(category)}</p>
              <p
                className={`bg-[#F2F2F2] px-2 py-1 w-10 text-center rounded-md ${
                  category === selectedCategory
                    ? 'bg-blue-primary-200 text-white'
                    : ''
                }`}
              >
                {category === 'All'
                  ? Object.keys(masters).length
                  : Object.values(masters).filter(
                      (master) => master.category === category
                    ).length}
              </p>
            </div>
          ))}
    </aside>
  );
function PageTitle(route,title){
  navigate(route);
  setCount(title)
}
// const url = window.location.href;;
// const lastEndpoint = url.split('/').pop(); // Get the last part of the URL

// console.log(lastEndpoint); // Output: busOwnership

  const MastersList = ({ filteredMasters, navigate }) => (
    <main className="w-full md:w-4/5 p-4 overflow-y-scroll scrollbar max-h-[calc(100vh-70px-71px)] bg-gray-100">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-4 h-fit">
        {filteredMasters.map((master, index) => (
          <div
            key={index}
            // onClick={() => navigate(`${ROUTES.MASTERS}/${master.routeId}`)}
            onClick={()=>PageTitle(`${ROUTES.MASTERS}/${master.routeId}`,`${master.label}`)}
            className="bg-white p-3 rounded-lg shadow cursor-pointer hover:shadow-xl h-full"
            style={{ gap: '8px' }}
          >
            <div className="flex justify-between items-center gap-2">
              <div className="w-3/4">
              {/* <SetTitle title={master.label}/> */}
                <p className="font-semibold text-[16px]">{master.label}</p>
                <p className="text-[#939393] text-[12px] my-1.5">
                  {master.description}
                </p>
                <span className="bg-[#EFEFEE] text-[#939393] px-2 py-1 text-[8px] rounded-full">
                  {startCase(master.category || 'Other')}
                </span>
              </div>
              <div className="flex items-center justify-center w-12 h-12 border-gray-300 border-2 rounded-full">
                <span className="text-lg">{master.totalCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );

  return (
    <div className="flex flex-col w-full h-full w-full bg-white shadow-md flex-grow overflow-auto">
      <div className="bg-white flex justify-between pb-5 pt-5 border-b md:p-5">
        <div className="heading-600-24 c-blue1 v-center"></div>
        <div className="flex items-center gap-2">
          <button
            className="w-full p-1.5 border border-[#E0E0E0] rounded-md hover:bg-gray-100 cursor-pointer"
            onClick={handleSortToggle}
          >
            <SortIcon className="w-4 h-4" />
          </button>
          <input
            className="border border-[#E0E0E0] rounded-md py-1 text-sm pr-10 pl-4 focus:outline-none max-w-md"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="flex w-full h-[calc(100vh-71px-70px)]">
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategorySelect={handleCategorySelect}
          masters={masters}
        />
        {loading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-4 w-full md:w-4/5 my-5 ml-5 h-fit">
            {Array.from({ length: 16 }).map((_, i) => (
              <Skeleton
                key={i}
                animation="wave"
                className="rounded-lg"
                variant="rectangular"
                width={210}
                height={90}
              />
            ))}
          </div>
        ) : (
          <MastersList filteredMasters={filteredMasters} navigate={navigate} />
        )}
      </div>
    </div>
  );
};

export default MastersV2;



// const SetTitle=({title})=>{
//   const {setCount } = useContext(CounterContext);

//   useEffect(() => { 
//     setCount({title});
//   }, []);

//   return(<> </>)
// }