import { CheckIcon, chevronDown } from '@/assets/Icons';
import { getApi } from '@/services/method';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { searchIcon } from '@/assets/Icons';

const DataTableAction = ({
  selectedRows,
  actionData,
  setSearch,
  LIST_OF_FILTERS,
}) => {
  const [isAction, setIsAction] = useState(false);

  return (
    <div>
      <div className="flex mb-3 px-5 justify-between flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-4 justify-center">
          {selectedRows?.length > 0 && (
            <div className="action-container relative d-h-center">
              <button
                className="action-div d-h-center rounded-md"
                onClick={() => setIsAction(!isAction)}
              >
                {selectedRows?.length > 0 && (
                  <div className="w-4 h-4 rounded-full bg-blue-primary-200 flex items-center justify-center">
                    <span className=" text-white text-[10px] ">
                      {selectedRows.length}
                    </span>
                  </div>
                )}
                <span className="heading-400-12">Action</span>
                <span className="d-h-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="4"
                    viewBox="0 0 7 4"
                    fill="none"
                  >
                    <path
                      d="M3.77398 2.8153L1.42198 0.462296C1.33757 0.383389 1.22578 0.34041 1.11025 0.342448C0.994716 0.344487 0.884508 0.391382 0.802934 0.473217C0.721359 0.555052 0.674813 0.665408 0.673142 0.780944C0.671471 0.89648 0.714806 1.00814 0.79398 1.0923L3.46198 3.7583C3.54288 3.83887 3.65172 3.88517 3.76588 3.8876C3.88003 3.89002 3.99073 3.84837 4.07498 3.7713L6.75798 1.0943C6.80155 1.05357 6.83649 1.0045 6.86072 0.950001C6.88495 0.895504 6.89797 0.836693 6.89903 0.777062C6.90008 0.717431 6.88913 0.658196 6.86684 0.602879C6.84455 0.547561 6.81136 0.497289 6.76926 0.45505C6.72715 0.412811 6.67699 0.379466 6.62174 0.356998C6.56649 0.334529 6.5073 0.323396 6.44766 0.324258C6.38803 0.32512 6.32917 0.337962 6.2746 0.362019C6.22003 0.386075 6.17085 0.420856 6.12998 0.464296L3.77398 2.8153Z"
                      fill="black"
                    />
                  </svg>
                </span>
              </button>

              {isAction && (
                <div
                  className="fixed inset-0 "
                  onClick={() => setIsAction(!isAction)}
                ></div>
              )}

              {isAction && (
                <div className="action-option">
                  {actionData?.leftAction?.map((item, index) => (
                    <div
                      className="option-section d-h-between border-bottom-gray"
                      key={index}
                      onClick={() => {
                        item?.onClick();
                        setIsAction(false);
                      }}
                    >
                      <div className="heading-400-12">{item.title}</div>
                      <div className="action-option-icon">{item.icon}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <FilterButtons LIST_OF_FILTERS={LIST_OF_FILTERS} />
        </div>

        <TableSearchBar onChange={setSearch} placeholder={`Search`} />
      </div>
    </div>
  );
};

const TableSearchBar = ({ onChange, placeholder }) => {
  const debounceFn = debounce(handleDebounceFn, 500);

  function handleDebounceFn(val) {
    onChange?.(val);
  }

  const handleInputChange = (e) => {
    debounceFn(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        onChange={handleInputChange}
        placeholder={placeholder ? `${placeholder}` : 'Search'}
        className="border border-[#E0E0E0] w-full rounded-full py-2 text-sm pr-10 pl-4 focus:outline-none"
      />
      <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
        {searchIcon({ width: 20, height: 20, fill: '#424850' })}
      </span>
    </div>
  );
};

function FilterButtons({ LIST_OF_FILTERS }) {
  return (
    <>
      <div className="flex gap-2 items-center justify-center">
        {LIST_OF_FILTERS?.map((item, index) => {
          return item.type === 'button' ? (
            <button onClick={item.submitAction} className={item.className}>
              {item.title}
            </button>
          ) : (
            <FilterDropdown
              title={item.title}
              submitAction={item.submitAction}
              name={item.name}
              key={index}
              endpoint={item.endpoint}
              isClearAll={item.isClearAll}
            />
          );
        })}
      </div>
    </>
  );
}

// export const FilterDropdown = ({ title, submitAction, name }) => {
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const [search, setSearch] = useState("");
//   const [listOfOptions, setListOfOptions] = useState();
//   const [searchedListOfOptions, setSearchedListOfOptions] = useState();
//   const [selected, setSelected] = useState();

//   const getData = async () => {
//     try {
//       const getDefaultEndpoint = (name) =>
//         `v2/masters/search/${name}?limit=10000`;
//       getApi(getDefaultEndpoint(name), null, null).then((response) => {
//
//         setListOfOptions(response.data);
//         setSearchedListOfOptions(response.data);
//       });
//     } catch (error) {
//
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <>
//       <div className="relative">
//         <div
//           className="whitespace-nowrap rounded-full bg-gray-quaternary/10 hover:bg-[#E5F2FF]  px-4 py-2 cursor-pointer text-[13px] font-normal z-0 flex items-center gap-2 justify-center"
//           type="button"
//           onClick={() => {
//             setOpenDropdown(true);
//           }}
//         >
//           {title} {chevronDown({ width: 16, height: 16 })}
//         </div>
//         {openDropdown && (
//           <div
//             className="fixed inset-0 z-[5]"
//             onClick={() => {
//               setOpenDropdown(false);
//               setSelected(null);
//             }}
//           />
//         )}
//         {openDropdown && (
//           <div className="absolute top-7 left-0 max-w-sm w-[250px] bg-white   shadow-lg border z-10">
//             <div className="w-full px-4 py-2 text-[13px] border-b font-normal">
//               <input
//                 type="text input"
//                 placeholder="Search"
//                 className="border border-[#E0E0E0] w-full rounded-full py-1 text-sm pr-10 pl-4 focus:outline-none"
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setSearchedListOfOptions(
//                     listOfOptions.filter((item) =>
//                       item.label
//                         .toLowerCase()
//                         .includes(e.target.value.toLowerCase())
//                     )
//                   );
//                 }}
//               />
//             </div>
//             <div className="w-full overflow-y-scroll max-h-[200px] scrollbar">
//               {searchedListOfOptions?.map((item, index) => (
//                 <div
//                   className={cn(
//                     "w-full hover:bg-gray-quaternary/10 cursor-pointer px-4 py-2 text-[13px] font-normal flex items-center gap-2 justify-between",
//                     selected &&
//                       selected.value === item.value &&
//                       "bg-gray-quaternary/20 hover:bg-gray-quaternary/20"
//                   )}
//                   key={index}
//                   onClick={() => {
//                     setSelected(item);
//                   }}
//                 >
//                   {item?.label}{" "}
//                   {selected && selected.value === item.value && (
//                     <div className="w-5 h-5">
//                       {CheckIcon({
//                         className: "w-5 h-5 text-blue-primary-200",
//                       })}
//                     </div>
//                   )}
//                 </div>
//               ))}
//               {searchedListOfOptions?.length === 0 && (
//                 <div className="w-full hover:bg-gray-quaternary/10 cursor-pointer px-4 py-2 text-[13px]  font-normal flex items-center gap-2">
//                   No results found
//                 </div>
//               )}
//             </div>

//             <div className="w-full px-4 py-2 text-[13px] border-t font-normal flex items-center gap-2 justify-end">
//               <div
//                 className="cursor-pointer lg:min-w-fit h-6 lg:h-8 rounded-md text-gray-tertiary hover:bg-gray-quaternary/10 px-5 flex items-center justify-center text-[13px] font-normal gap-[10px] border border-gray-quaternary/10 w-fit"
//                 onClick={() => {
//                   setOpenDropdown(false);
//                   setSelected(null);
//                   submitAction(null);
//                 }}
//               >
//                 Clear
//               </div>
//               <div
//                 className="cursor-pointer lg:min-w-fit h-6 lg:h-8 rounded-md text-white bg-blue-primary-200 px-5 flex items-center justify-center text-[13px] font-normal border border-blue-primary-200 w-fit"
//                 onClick={() => {
//                   if (selected) {
//                     submitAction(selected);
//                     setOpenDropdown(false);
//                   }
//                 }}
//                 disabled={!selected}
//               >
//                 Apply
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

export const FilterDropdown = ({
  title,
  submitAction,
  name,
  endpoint,
  isClearAll,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [search, setSearch] = useState('');
  const [listOfOptions, setListOfOptions] = useState([]);
  const [searchedListOfOptions, setSearchedListOfOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isApplied, setIsApplied] = useState(false);
  const getData = async () => {
    try {
      const getDefaultEndpoint = (name) =>
        `v2/masters/search/${name}?limit=10000`;
      const response = await getApi(
        endpoint ? endpoint : getDefaultEndpoint(name),
        null,
        null
      );

      setListOfOptions(response.data);
      setSearchedListOfOptions(response.data);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleSelection = (item) => {
    const isSelected = selected.some(
      (selectedItem) => selectedItem.value === item.value
    );
    const newSelected = isSelected
      ? selected.filter((selectedItem) => selectedItem.value !== item.value)
      : [...selected, item];
    setSelected(newSelected);
  };

  const handleClear = () => {
    setSelected([]);
    setOpenDropdown(false);
    submitAction([]);
    setIsApplied(false);
  };

  const handleApply = () => {
    submitAction(selected);
    setOpenDropdown(false);
    setIsApplied(true);
  };
  useEffect(() => {
    if (!isApplied || isClearAll) {
      setSelected([]);
    }
  }, [openDropdown, isClearAll]);

  return (
    <>
      <div className="relative">
        <div
          className="whitespace-nowrap rounded-full bg-gray-quaternary/10 hover:bg-[#E5F2FF]  px-4 py-2 cursor-pointer text-[13px] font-normal z-0 flex items-center gap-2 justify-center"
          type="button"
          onClick={() => {
            setOpenDropdown(true);
          }}
        >
          {title} {chevronDown({ width: 16, height: 16 })}
        </div>
        {openDropdown && (
          <div
            className="fixed inset-0 z-[5]"
            onClick={() => {
              setOpenDropdown(false);
              setSearch('');
              setSearchedListOfOptions(listOfOptions);
            }}
          />
        )}
        {openDropdown && (
          <div className="absolute top-7 left-0 max-w-sm w-[250px] bg-white shadow-lg border z-10">
            <div className="w-full px-4 py-2 text-[13px] border-b font-normal">
              <input
                type="text"
                placeholder="Search"
                className="border border-[#E0E0E0] w-full rounded-full py-1 text-sm pr-10 pl-4 focus:outline-none"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSearchedListOfOptions(
                    listOfOptions.filter((item) =>
                      item.label
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    )
                  );
                }}
              />
            </div>
            <div className="w-full overflow-y-scroll max-h-[200px] scrollbar">
              {searchedListOfOptions.map((item, index) => (
                <div
                  className={cn(
                    'w-full hover:bg-gray-quaternary/10 cursor-pointer px-4 py-2 text-[13px] font-normal flex items-center gap-2 justify-between',
                    selected.some(
                      (selectedItem) => selectedItem.value === item.value
                    ) && 'bg-gray-quaternary/20 hover:bg-gray-quaternary/20'
                  )}
                  key={index}
                  onClick={() => toggleSelection(item)}
                >
                  {item.label}
                  {selected.some(
                    (selectedItem) => selectedItem.value === item.value
                  ) && (
                    <div className="w-5 h-5">
                      {CheckIcon({
                        className: 'w-5 h-5 text-blue-primary-200',
                      })}
                    </div>
                  )}
                </div>
              ))}
              {searchedListOfOptions.length === 0 && (
                <div className="w-full hover:bg-gray-quaternary/10 cursor-pointer px-4 py-2 text-[13px] font-normal flex items-center gap-2">
                  No results found
                </div>
              )}
            </div>
            <div className="w-full px-4 py-2 text-[13px] border-t font-normal flex items-center gap-2 justify-end">
              <div
                className="cursor-pointer lg:min-w-fit h-6 lg:h-8 rounded-md text-gray-tertiary hover:bg-gray-quaternary/10 px-5 flex items-center justify-center text-[13px] font-normal gap-[10px] border border-gray-quaternary/10 w-fit"
                onClick={handleClear}
              >
                Clear
              </div>
              <div
                className="cursor-pointer lg:min-w-fit h-6 lg:h-8 rounded-md text-white bg-blue-primary-200 px-5 flex items-center justify-center text-[13px] font-normal border border-blue-primary-200 w-fit"
                onClick={handleApply}
              >
                Apply
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DataTableAction;
