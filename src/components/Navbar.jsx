import React, { useState } from 'react';
import logo from '../img/Logotl.png'
import { CgDetailsMore } from "react-icons/cg";
import { IoClose } from "react-icons/io5";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="w-full md:h-fit p-2 sm:p-5 md:px-20 lg:px-32 h-fit relative bg-white bg-opacity-80 overflow-x-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://cdn.dribbble.com/userupload/6750829/file/original-78a9959381283af7f491c42b56ae496a.mp4" type="video/mp4" />
      </video>
      <div className='w-full flex justify-between items-center z-50 relative'>
        <div className='flex justify-center gap-2 items-end'>
          <img src={logo} className='h-10 w-auto' alt='tl logo'/>
          <h1 className='font-bold md:text-3xl text-xl  text-[red] '>TL TECHNOLOGIES</h1>
        </div>
        <ul className='md:flex hidden h-fit w-fit gap-4  justify-between items-center'>
        <a
                href="http://sangitl2020-001-site7.atempurl.com/index.html"
                target="_blank"
                className="p-1 border-b-2 border-transparent hover:border-[red] transition-all duration-500 ease-in-out text-sm font-bold  w-fit text-center"
              >
                HOME
              </a>
              <a
                href="http://sangitl2020-001-site7.atempurl.com/about.html"
                target="_blank"
                className="p-1 border-b-2 border-transparent hover:border-[red] transition-all duration-500 ease-in-out text-sm font-bold  w-fit text-center"
              >
                ABOUT
              </a>
              <a
                href="http://sangitl2020-001-site7.atempurl.com/products.html"
                target="_blank"
                className="p-1 border-b-2 border-transparent hover:border-[red] transition-all duration-500 ease-in-out text-sm font-bold  w-fit text-center"
              >
                SERVICES
              </a>
              <a
                href="http://sangitl2020-001-site7.atempurl.com/contact.html"
                target="_blank"
                className="p-1 border-b-2 border-transparent hover:border-[red] transition-all duration-500 ease-in-out text-sm font-bold  w-fit text-center"
              >
                CONTACT
              </a>
        </ul>
        <button onClick={toggleMenu} className='w-fit p-1 flex md:hidden sm:hidden bg-stone-200 z-50 text-red-400 rounded-lg'>
            {menuOpen?
            <IoClose/>
            :
            <CgDetailsMore />
            }
          
          
        </button>
      </div>
      <div
        style={{
          color: 'white',
          WebkitTextStroke: '1px black',
          WebkitTextFillColor: 'black',
        }}
        className="  flex items-start justify-start flex-col text-stone-100 md:text-[110px] text-[70px] font-light drop-shadow-xl shadow-black"
      >
       <p>Careers</p> 
       <p className='text-start w-fit max-w-[800px]   md:text-xl text-xs  font-thin backdrop-blur-3xl bg-stone-100 bg-opacity-40' style={{fontFamily:'"Outfit", sans-serif'}}>
            we are looking for passionate candidates to join us in our mission. We value flat hierarchies, clear communication, and full ownership and responsibility
          </p> 
      </div>
      <div className={`absolute top-0 md:hidden left-0 w-full flex justify-center items-center p-4 bg-white h-full text-black z-40 transform transition-all duration-500 ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <ul className='flex h-fit w-full gap-2 justify-between items-center'>
        <a
                href="http://sangitl2020-001-site7.atempurl.com/index.html"
                target="_blank"
                className="p-1 border-b-2 border-transparent hover:border-[red] transition-all duration-500 ease-in-out text-sm font-bold  w-fit text-center"
              >
                HOME
              </a>
              <a
                href="http://sangitl2020-001-site7.atempurl.com/about.html"
                target="_blank"
                className="p-1 border-b-2 border-transparent hover:border-[red] transition-all duration-500 ease-in-out text-sm font-bold  w-fit text-center"
              >
                ABOUT
              </a>
              <a
                href="http://sangitl2020-001-site7.atempurl.com/products.html"
                target="_blank"
                className="p-1 border-b-2 border-transparent hover:border-[red] transition-all duration-500 ease-in-out text-sm font-bold  w-fit text-center"
              >
                SERVICES
              </a>
              <a
                href="http://sangitl2020-001-site7.atempurl.com/contact.html"
                target="_blank"
                className="p-1 border-b-2 border-transparent hover:border-[red] transition-all duration-500 ease-in-out text-sm font-bold  w-fit text-center"
              >
                CONTACT
              </a>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
