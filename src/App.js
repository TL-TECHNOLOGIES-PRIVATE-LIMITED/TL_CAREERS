import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import './App.css'; // Ensure to include Tailwind's CSS
import Navbar from './components/Navbar';
import { FaChevronDown, FaChevronUp, FaLocationArrow, FaPhone, FaReact } from "react-icons/fa";
// import PositionCard from './components/PositionGrid';
import { SiFlutter, SiAdobephotoshop } from "react-icons/si";
import { FaCode } from "react-icons/fa";
import emailjs from 'emailjs-com';
import logo from './img/Logotl.png'
// import PositionGrid from './components/PositionGrid';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    state: '',
    experience: '',
    linkedin: '',
    number: '',
    skills: '',
    position: '',
    education: '',
  });

  const openingsPositions = [
    {
      title: "React Developer",
      location: "Remote",
      type: "Full-time",
      icon: <FaReact />,
      experience: "2+ years",
      responsibility: "Develop and maintain React applications.",
      details: "We are seeking an experienced React Developer to join our team. The ideal candidate will have a background in building web applications using React, JavaScript, HTML, and CSS."
    },
    {
      title: "Full stack Developer",
      location: "San Francisco, CA",
      type: "Full-time",
      icon: <FaCode />,
      experience: "1+ years",
      responsibility: "Work on server-side logic and database management.",
      details: "We are seeking a Full stack Developer to join our team. You will work on both frontend and backend development tasks, and be responsible for building, testing, and deploying new features."
    },
    {
      title: "Flutter Developer",
      location: "New York, NY",
      type: "Part-time",
      icon: <SiFlutter />,
      experience: "1+ year",
      responsibility: "Design user interfaces and improve user experiences.",
      details: "Join our team as a Flutter Developer. You will be responsible for building high-quality, innovative, and fully performing mobile applications that comply with coding standards and technical design."
    },
    {
      title: "Graphic Designer",
      location: "Remote",
      type: "Part-time",
      icon: <SiAdobephotoshop />,
      experience: "1+ year",
      responsibility: "Design user interfaces and improve user experiences.",
      details: "We are looking for a talented Graphic Designer to create amazing user experiences. The ideal candidate should have an eye for clean and artful design, possess superior UI skills and be able to translate high-level requirements into interaction flows and artifacts."
    },
    // Add more positions as needed
  ];
  const toggleDetails = (index) => {
    console.log("Toggling index:", index);
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const handleButtonClick = (title) => {
    setIsAnimating(true);
    setFormData({ ...formData, position: title });
    setSelectedJobTitle(title)
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsAnimating(false);
    }, 500); // Match this duration with your CSS transition duration
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
      // Check for empty fields
      const requiredFields = ['name', 'email', 'country', 'state', 'experience', 'linkedin', 'number', 'skills', 'position', 'education'];
      const emptyFields = requiredFields.filter(field => !formData[field].trim());
    
      if (emptyFields.length > 0) {
        alert("Please fill in all fields before submitting.");

        return;
      }
   
    
    emailjs.send('service_l0u1r2u', 'template_0y3wvy7', formData, 'xklh-Mc4JkQsNpiXm')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.error('FAILED...', err);
      });

    handleCloseModal(); // Optionally close the modal after submission
  };


  const filteredPositions = openingsPositions.filter((position) =>
    position.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
    className="w-full h-fit overflow-x-hidden flex flex-col justify-start items-center"
    style={{
      fontFamily: '"Outfit", sans-serif',
      // backgroundColor: '#FFDEE9',
      // backgroundImage: 'linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)'
    }}
  >
      <Navbar />

      <div className='flex flex-col items-center overflow-hidden flex-wrap p-2 sm:p-5 md:px-20 lg:px-32 py-10  w-full f-fit gap-6 '>
        <div className='w-full h-fit flex flex-col gap-4 relative overflow-hidden '>
        {/* <img src={logo} className='h-[400px] hidden md:block w-auto opacity-20 absolute top-[-60px] z-0  animation-spin  right-[-60px]'/> */}
          {/* <div className='rounded-full bg-white w-fit py-1 px-3 border-[2px] font-bold font-sans text-black border-red-500'>
            we are hiring
          // </div> */}
          {/* // <div style={{fontFamily:" 'Bebas Neue', sans-serif"}} className='md:text-[70px] text-[50px]  text-stone-950 text-opacity-80 font-semibold leading-tight'>
          //   Be part of our <span className=''>MIssion</span>
          // </div> */}
          {/* <p className='text-start w-fit max-w-[800px] text-xl font-semibold text-[#06b6d4' style={{fontFamily:'"Outfit", sans-serif'}}>
            <span className='text-black text-3xl' >"</span>
            we are looking for passionate candidates to join us in our mission. We value flat hierarchies, clear communication, and full ownership and responsibility
            <span className='text-black text-3xl'>"</span>
          </p> */}
          <div className='w-full flex justify-between items-center  gap-6 flex-wrap'>
            <h1 className='text-4xl w-fit font-light text-black  '>
              Opening Positions <span className="text-4xl text-red-500 ">{filteredPositions.length}</span>
            </h1>
            <div className='py-1 px-1 flex bg-stone-950 bg-opacity-5 z-30 justify-center items-center placeholder:text-red-600 text-red-600  border-[2px] text- rounded-full'>
              <input 
                type="text" 
                className=' bg-transparent px-6  outline-none w-[200px] md:w-[450px]' 

                placeholder='Search' 
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className='p-3 bg-black rounded-full text-white text-xl'>

              <CiSearch />
              </div>
            </div>
            <main className="container mx-auto px-4">
  <div className="bg-white shadow rounded-lg">
    <div className="block md:hidden">
      {filteredPositions.map((position, index) => (
        <div key={index} className="border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-lg">{position.title}</div>
            <button onClick={() => toggleDetails(index)} className='p-2 bg-stone-900 text-white rounded-full'>
              {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          <div className="text-gray-600">
            {expandedIndex === index && (
              <div>
                <p>{position.location}</p>
                <p>{position.type}</p>
                <p>{position.details}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
    <div className="hidden md:block">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white font-sans divide-y divide-gray-200">
          {filteredPositions.map((position, index) => (
            <React.Fragment key={index}>
              <tr className={`${expandedIndex === index ? "scale-105 transition-all duration-500 bg-stone-200" : " scale-100 transition-all duration-500"}`}>
                <td className="px-6 py-4 whitespace-nowrap text-2xl font-bold">{position.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{position.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">{position.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => toggleDetails(index)} className='p-2 bg-stone-900 text-white rounded-full'>
                    {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </td>
              </tr>
              {expandedIndex === index && (
                <tr>
                  <td colSpan="2" className="px-6 py-4 whitespace-wrap">
                    <div className="text-gray-600">{position.details}</div>
                  </td>
                  <td colSpan="2" className="px-6 py-4 whitespace-wrap">
                    <button className='text-white bg-black px-2 py-1 rounded-lg'>Apply Now</button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</main>

            {isModalOpen && (
      <div
      className="fixed inset-0 flex items-center justify-center bg-stone-950 bg-opacity-80 backdrop-blur-sm transition-opacity duration-500 ease-in-out"
      style={{ zIndex: 1000 }}
    >

          <div className="bg-white p-6  max-w-xl h-[80%] overflow-y-scroll w-full">
            <h2 className="text-2xl text-red-500 font-bold mb-4 font-sans">Apply for {selectedJobTitle} </h2>
            <p className='text-stone-500 font-semibold'>Please also apply using a professional email for better communication with our HR team when submitting your resume</p>
            <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 bg-white rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* State */}
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* Experience */}
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  placeholder="Years of experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* LinkedIn URL */}
              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/your-profile"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* Number */}
              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700">Number</label>
                <input
                  type="number"
                  id="number"
                  name="number"
                  placeholder="Your number"
                  value={formData.number}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* Skills */}
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
                <textarea
                  id="skills"
                  name="skills"
                  placeholder="Your skills"
                  rows="3"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                ></textarea>
              </div>

              {/* Position */}
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  placeholder="Position you're applying for"
                  value={selectedJobTitle}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                  readOnly
                />
              </div>

              {/* Education */}
              <div>
                <label htmlFor="education" className="block text-sm font-medium text-gray-700">Education</label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  placeholder="Your highest degree"
                  value={formData.education}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-3xl"
              >
                Submit
              </button>
            </form>
            <button
              type="button"
              onClick={handleCloseModal}
              className="mt-4 absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded-3xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
        </div>
        </div>
      </div>
{/* <InfiniteScroll/> */}
      <footer className="bg-stone-200 w-full flex  flex-col justify-center  text-black font-semibold  px-10 py-6 mt-10">
    <div className="container mx-auto flex flex-wrap justify-around  items-start">
        <div className="w-full md:w-fit h-full  text-center md:text-left">
            <h2 className="text-lg text-[red] font-bold mb-2 flex gap-2"><FaLocationArrow/> TL TECHNOLOGIES</h2>
            <p>Vilame 1st Floor, Laham Commercial Complex,<br/>DOTSPACE BUSINESS CENTER,<br/> Near Al Uthuman School Vetturoad,</p>
            <p>Near Asset Orchestra Rd, Kazhakkoottam,<br/> 
            Trivandrum, Kerala, 695585</p>
            
        </div>
        <div className="w-full md:w-fit h-full  text-center md:text-left">
            <h2 className="text-lg text-[red] font-bold mb-2">Quick Links</h2>
            <ul className='flex flex-col text-center justify-center items-center'>
               <a href='http://sangitl2020-001-site7.atempurl.com/index.html' target='_blank'  className='p-1 border-b-2 border-transparent hover:border-[red] transition-all duration-500 ease-in-out text-sm font-bold  w-fit text-center'>
            HOME
          </a>
          <a href='http://sangitl2020-001-site7.atempurl.com/about.html' target='_blank'  className='p-1 border-b-2 border-transparent hover:border-[red] transition-all duration-500 ease-in-out text-sm font-bold  w-fit text-center'>
            ABOUT
          </a>
          <a href='http://sangitl2020-001-site7.atempurl.com/products.html' target='_blank'  className='p-1 border-b-2 border-transparent hover:border-[red] transition-all duration-500 ease-in-out text-sm font-bold  w-fit text-center'>
            SERVICES
          </a>
          <a href='http://sangitl2020-001-site7.atempurl.com/contact.html' target='_blank'  className='p-1 border-b-2 border-transparent hover:border-[red] transition-all duration-500 ease-in-out text-sm font-bold  w-fit text-center'>
            CONTACT
          </a>
            </ul>
        </div>
        <div className="w-full md:w-fit h-full  text-center md:text-left">
            <h2 className="text-lg text-[red] font-bold mb-2">Follow Us</h2>
            <div className="flex justify-center flex-col md:justify-start gap-1">
                <a href="https://facebook.com" className="hover:text-gray-400">facebook</a>
                <a href="https://twitter.com" className="hover:text-gray-400">twitter</a>
                <a href="https://linkedin.com" className="hover:text-gray-400">linkrd-in</a>
                <a href="https://instagram.com" className="hover:text-gray-400">instagram</a>
                <a href="https://instagram.com" className="hover:text-gray-400">whatsapp</a>
            </div>
        </div>
        <div className="w-full md:w-fit h-fit  text-center md:text-center">
            <h2 className="text-lg text-[red] font-bold mb-2">Contact Us</h2>
            <div className="flex justify-center md:justify-start gap-1 flex-col">
            <a href="https://tel:+919061432814" className="">+91 9061432814</a>
            <a href="https://tel:+919778280507" className="">+91 9778280507</a>
            <a href="sangig@tltechnologies.net" className="">sangig@tltechnologies.net</a>
            



            </div>
        </div>
    </div>
    <div className="mt-6 border-t border-gray-700 pt-4 text-center">
        <p>&copy; 2024  copyright <span className='text-[red]'>TL TECHNOLOGIES</span> All rights reserved.</p>
    </div>
</footer>

    </div>
  );
}

export default App;
