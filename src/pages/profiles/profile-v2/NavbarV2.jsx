
import React, { useContext, useState } from "react";;
import { scroller } from "react-scroll";
import { ContextAPI } from "../../../contextAPI/ContextProfileV2";

const NavbarV2 = ({ name, profileImage }) => {
  const { isScrolled, choosenColor, setIsScrolled } = useContext(ContextAPI);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionName) => {
    scroller.scrollTo(sectionName, {
      duration: 100,
      delay: 0,
      smooth: "easeInOutQuart",
    });
    setIsMenuOpen(false);
  };

  const changeNavOnScroll = () => {
    if (window.scrollY >= 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", changeNavOnScroll);
    return () => window.removeEventListener("scroll", changeNavOnScroll);
  }, []);

  const navBackgroundColor = isScrolled
    ? choosenColor || "bg-[#6d56c1]"
    : "bg-transparent";
  const menuItems = ['PROFILE', 'SERVICES', 'PRODUCTS', 'OFFERS', 'GALLERY', 'TESTIMONIALS', 'PAYMENTS'];

  return (
    <>
      <nav className={`fixed w-full z-50 ${navBackgroundColor} transition-colors duration-300`}>
        <div className="containerP2 mx-auto px-4">
          <div className="flex items-center py-3">
            <div className="flex justify-between items-center lg:hidden">
              <button
                className="text-white focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle navigation"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
           
              <div className="ml-4 flex items-center">
                <span className="text-white mr-2">{name}</span>
                <img
                  className="w-10 h-10 rounded-full"
                  src={profileImage}
                  alt="Profile"
                />
              </div>
            </div>
            <div className={`lg:flex 
             hidden flex-grow items-center `}>
              <ul className="flex flex-row ">
                {['PROFILE', 'SERVICES', 'PRODUCTS', 'OFFERS', 'GALLERY', 'TESTIMONIALS', 'PAYMENTS'].map((item) => (
                  <li key={item} className="nav-item" onClick={closeMenu}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`hidden lg:flex items-center ${isScrolled ? '' : 'invisible'}`}>
              <span className="text-white mr-2 font-bold">{name}</span>
              <img
                className="w-10 h-10 rounded-full"
                src={profileImage}
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Full-width mobile drawer */}
      <div
        className={`fixed inset-0 bg-black-800 bg-opacity-75 z-50 lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={closeMenu}
      >
        <div
          className={`fixed inset-y-0 left-0 w-full bg-white transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b" style={{ backgroundColor: 'grey' }}>
            <span className="text-xl font-bold">Menu</span>
            <button onClick={closeMenu} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col p-4 bg-black-800 bg-opacity-75" style={{ backgroundColor: 'grey' }}>
            {menuItems.map((item) => (
              <li key={item} className="mb-4">
                <button
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="w-full text-left px-3 py-2 text-sm uppercase font-bold text-gray-800 hover:bg-gray-100 rounded"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavbarV2;
