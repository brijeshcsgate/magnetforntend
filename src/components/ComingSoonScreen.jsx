const ComingSoon = '/assets/images/coming_soon.png';

export default function ComingSoonScreen() {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full bg-white shadow-md flex-grow overflow-auto h-[calc(100vh-71px)]">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={ComingSoon}
            alt="Logo"
            className="mb-8 h-40"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
            Coming Soon!
          </h1>
          <p className="text-center text-gray-tertiary text-lg md:text-xl lg:text-2xl mb-8">
            We are working on it...
          </p>
        </div>
      </div>
    </div>
  );
}
