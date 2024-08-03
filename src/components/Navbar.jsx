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
        <div className='flex justify-center items-end'>
          <img src={logo} className='h-10 w-auto' alt='tl logo'/>
          <h1 className='font-bold md:text-3xl text-xl font-sans text-[red] hover:text-[green]'>TL TECHNOLOGIES</h1>
        </div>
        <ul className='md:flex hidden h-fit w-fit gap-4 font-sans justify-between items-center'>
          <button className='p-1 border-b-2 border-transparent hover:border-black transition-all duration-500 ease-in-out text-sm font-bold text-red-500 w-fit text-center'>
            HOME
          </button>
          <button className='p-1 border-b-2 border-transparent hover:border-black transition-all duration-500 ease-in-out text-sm font-bold text-red-500 w-fit text-center'>
            ABOUT
          </button>
          <button className='p-1 border-b-2 border-transparent hover:border-black transition-all duration-500 ease-in-out text-sm font-bold text-red-500 w-fit text-center'>
            SERVICES
          </button>
          <button className='p-1 border-b-2 border-transparent hover:border-black transition-all duration-500 ease-in-out text-sm font-bold text-red-500 w-fit text-center'>
            CONTACT
          </button>
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
        className="  flex items-start justify-start flex-col text-stone-100 md:text-[110px] text-[40px] font-light drop-shadow-xl shadow-black"
      >
       <p>Careers</p> 
       <p className='text-start w-fit max-w-[800px] text-xl font-thin backdrop-blur-3xl bg-stone-100 bg-opacity-80' style={{fontFamily:'"Outfit", sans-serif'}}>
            we are looking for passionate candidates to join us in our mission. We value flat hierarchies, clear communication, and full ownership and responsibility
          </p> 
      </div>
      <div className={`absolute top-0 md:hidden left-0 w-full flex justify-center items-center p-4 bg-white h-full text-black z-40 transform transition-transform duration-300 ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <ul className='flex h-fit w-full gap-2 justify-between items-center'>
          <li className='p-1 border-b font-bold border-red-500 w-fit text-center'>Home</li>
          <li className='p-1 border-b font-bold border-red-500 w-fit text-center'>About</li>
          <li className='p-1 border-b font-bold border-red-500 w-fit text-center'>Services</li>
          <li className='p-1 border-b font-bold border-red-500 w-fit text-center'>Contact</li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
