const RouteInformations = ({ routeInfo }) => {
  return (
    <div className="routes-information">
      <div className="p-4 pb-0">
        <div className="font-semibold text-2xl text-[#002850]">
          Route Information
        </div>
      </div>
      <div className="grid p-5 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
        {routeInfo.map((item, index) => (
          <div className="grid grid-cols-5 gap-4" key={index}>
            <div className="text-sm font-semibold col-span-2">{item.title}</div>{' '}
            <div className="text-sm font-medium col-span-3">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteInformations;
