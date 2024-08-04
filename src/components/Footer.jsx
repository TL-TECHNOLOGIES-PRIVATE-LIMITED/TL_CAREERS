import React from 'react'
import { FaLocationArrow } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-stone-200 w-full flex  flex-col justify-center  text-black font-semibold  px-10 py-6 mt-10">
        <div className="container mx-auto flex flex-wrap justify-around  items-start">
          <div className="w-full md:w-fit h-full  text-center md:text-left">
            <h2 className="text-lg text-[red] font-bold mb-2 flex gap-2">
              <FaLocationArrow /> TL TECHNOLOGIES
            </h2>
            <p>
              Vilame 1st Floor, Laham Commercial Complex,
              <br />
              DOTSPACE BUSINESS CENTER,
              <br /> Near Al Uthuman School Vetturoad,
            </p>
            <p>
              Near Asset Orchestra Rd, Kazhakkoottam,
              <br />
              Trivandrum, Kerala, 695585
            </p>
          </div>
          <div className="w-full md:w-fit h-full  text-center md:text-left">
            <h2 className="text-lg text-[red] font-bold mb-2">Quick Links</h2>
            <ul className="flex flex-col text-center justify-center items-center">
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
          <div className="w-full md:w-fit h-full  text-center md:text-left">
            <h2 className="text-lg text-[red] font-bold mb-2">Follow Us</h2>
            <div className="flex justify-center flex-col md:justify-start gap-1">
              <a href="https://facebook.com" className="hover:text-gray-400">
                facebook
              </a>
              <a href="https://twitter.com" className="hover:text-gray-400">
                twitter
              </a>
              <a href="https://linkedin.com" className="hover:text-gray-400">
                linkrd-in
              </a>
              <a href="https://instagram.com" className="hover:text-gray-400">
                instagram
              </a>
              <a href="https://instagram.com" className="hover:text-gray-400">
                whatsapp
              </a>
            </div>
          </div>
          <div className="w-full md:w-fit h-fit  text-center md:text-center">
            <h2 className="text-lg text-[red] font-bold mb-2">Contact Us</h2>
            <div className="flex justify-center md:justify-start gap-1 flex-col">
              <a href="https://tel:+919061432814" className="">
                +91 9061432814
              </a>
              <a href="https://tel:+919778280507" className="">
                +91 9778280507
              </a>
              <a href="sangig@tltechnologies.net" className="">
                sangig@tltechnologies.net
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-700 pt-4 text-center">
          <p>
            &copy; 2024 copyright{" "}
            <span className="text-[red]">TL TECHNOLOGIES</span> All rights
            reserved.
          </p>
        </div>
      </footer>
  )
}

export default Footer