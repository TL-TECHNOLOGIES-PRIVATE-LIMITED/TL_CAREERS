import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./App.css"; // Ensure to include Tailwind's CSS
import Navbar from "./components/Navbar";
import {
  FaChevronDown,
  FaChevronUp,
  FaLocationArrow,
  FaPhone,
  FaReact,
} from "react-icons/fa";
// import PositionCard from './components/PositionGrid';
import { SiFlutter, SiAdobephotoshop } from "react-icons/si";
import { FaCode } from "react-icons/fa";
import emailjs from "emailjs-com";
import logo from "./img/Logotl.png";
// import PositionGrid from './components/PositionGrid';
import { FaHandPointRight } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import { Tooltip } from 'react-tooltip';
import { IoClose } from "react-icons/io5";
import Footer from "./components/Footer";
import openingsPositions from "./constant/positions";


function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    email_address: "",
    phone_number: "",
    linkedin_profile_url: "",
    years_of_experience: "",
    highest_educational_qualification: "",
    skills: "",
    salary_expectations: "",
    availability: "",
    reference_1: {
      name: "",
      email: "",
      phone_number: "",
      relationship: "",
    },
  });
  
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
    setSelectedJobTitle(title);
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

    // Prepare the form data to match the EmailJS template
    const templateParams = {
      full_name: formData.full_name,
      email_address: formData.email_address,
      phone_number: formData.phone_number,
      linkedin_profile_url: formData.linkedin_profile_url,
      address: formData.address || "Not provided",
      job_title: selectedJobTitle,
      job_id: `ID-${selectedJobTitle.replace(/\s+/g, "-").toUpperCase()}`,
      years_of_experience: formData.years_of_experience,
      highest_educational_qualification:
        formData.highest_educational_qualification,
      skills: formData.skills,
      portfolio_upload: formData.portfolio_upload || "Not provided",
      certifications_upload: formData.certifications_upload || "Not provided",
      custom_question_1: formData.custom_question_1 || "Not answered",
      custom_question_2: formData.custom_question_2 || "Not answered",
      salary_expectations: formData.salary_expectations || "Not provided",
      availability: formData.availability || "Not provided",
      reference_name: formData.reference_1 || "Not provided",
      reference_contact: formData.reference_contact || "Not provided",
      reference_relationship: formData.reference_relationship || "Not provided",
      terms_conditions: formData.terms_conditions ? "Yes" : "No",
      background_check: formData.background_check ? "Yes" : "No",
    };

    // Send the form data using EmailJS
    emailjs
      .send(
        "service_l0u1r2u",
        "template_0y3wvy7",
        templateParams,
        "xklh-Mc4JkQsNpiXm"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Application submitted successfully!");
        },
        (err) => {
          console.error("FAILED...", err);
          alert("Failed to submit application. Please try again.");
        }
      );

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

{/* Nav bar component */}

      <Navbar />

      <div className="flex flex-col items-center overflow-hidden flex-wrap p-2 sm:p-5 md:px-20 lg:px-32 py-10  w-full f-fit gap-6 ">
        <div className="w-full h-fit flex flex-col gap-4 relative overflow-hidden ">
       
          <div className="w-full flex justify-between items-center  gap-6 flex-wrap">
            <h1 className="text-4xl w-fit font-light text-black  ">
              Opening Positions{" "}
              <span className="text-4xl text-red-500 ">
                {filteredPositions.length}
              </span>
            </h1>
            <div className="py-1 px-1 flex w-full md:w-fit bg-stone-950 h-fit bg-opacity-5 z-30 justify-center items-center placeholder:text-red-600 text-red-600  border-[2px] text- rounded-full">
              <input
                type="text"
                className=" bg-transparent px-6  outline-none w-full md:w-[450px]"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="p-2 bg-black rounded-full text-white text-xl">
                <CiSearch />
              </div>
            </div>

            <main
              className="container mx-auto px-2 overflow-visible
      "
            >
              <div className="bg-white  rounded-lg">
                <div className="block md:hidden">
                  {filteredPositions.map((position, index) => (
                    <div key={index} className="border-b border-gray-600 p-4">
                      <div className={`${
                              expandedIndex === index
                                ? "scale-105 transition-all flex duration-500 text-2xl bg-stone-300 border ease-in-out rounded-lg"
                                : "scale-100 ease-in-out flex transition-all duration-500"
                            } text-xl   justify-between border-b-2  p-2` }>
                        <div >
                          {position.title}
                        </div>
                        <button
                          onClick={() => toggleDetails(index)}
                          className={`${
                            expandedIndex === index
                              ? "bg-white  "
                              : " bg-stone-900"
                          } p-2  text-xs text-white rounded-full transition-all duration-500 ease-in-out` }
                        >
                         
                            <FaChevronUp className={`${
                              expandedIndex === index
                                ? "flex hover:animate-bounce "
                                : "hidden"
                            } transition-all duration-500 ease-in-out   text-black ` }/>
                         
                            <FaChevronDown className={`${
                              expandedIndex === index
                                ? "hidden "
                                : " flex hover:animate-bounce "
                            }transition-all duration-500 ease-in-out ` }/>
                         
                        </button>
                      </div>
                      <div className="text-stone-600  mt-3">
                        {expandedIndex === index && (
                          <div className="text-xs">
                            
                            <p>
                                    <span className="text-black font-normal text-md">Experience:</span>{" "}
                                    {position.experience}
                                  </p>
                                  <p>
                                    <span className="text-black font-normal text-md">Qualifications:</span>{" "}
                                    {position.educational_qualifications}
                                  </p>
                                  <p>
                                    <span className="text-black font-normal text-md">Skills Required:</span>{" "}
                                    {position.skills_required.join(", ")}
                                  </p>
                                  <p>
                                    <span className="text-black font-normal text-md">Responsibility:</span>{" "}
                                    <>{position.responsibility}</>
                                  </p>
                                  <p>
                                    <span className="text-black font-normal text-md">Salary Range:</span>
                                    <span className="text-red-400 font-bold">
                                      {" "}
                                      {position.salary_range}
                                    </span>
                                  </p>

                                  <p>
                                    <span className="text-black font-normal text-md">Application Deadline:</span>{" "}
                                    {position.application_deadline}
                                  </p>
                                 

                                
                                  <p className="">
                                    <span className="text-black font-normal text-md">Benefits:</span>{" "}
                                      Health insurance,Paid leave,401(k)
                                  </p>

                                  <p className="mt-2">
                                    
                                    @ <span className="text-[red]">TL Technologies</span> , we value innovation, collaboration, and a passion for excellence. Join us to be part of a dynamic team where your ideas and contributions are valued.
                                  </p>
                                  <p className="flex justify-between flex-wrap mt-3 items-end gap-2">
                                  <button
                                    className="text-white bg-black px-2 hover:px-4 transition-all duration-300 py-1 rounded-full mt-2"
                                    onClick={() =>
                                      handleButtonClick(position.title)
                                    }
                                  >
                                    Apply Now
                                  </button>
                                  <p>
                                    {" "}
                                    <span>
                                      For more details, contact HR at{" "}
                                      <a
                                        href="mailto:hr@tltechnologies.net"
                                        className="text-red-500"
                                        style={{
                                          color: "blue",
                                          textDecoration: "underline",
                                        }}
                                      >
                                        hr@tltechnologies.net
                                      </a>
                                    </span>
                                  </p>
                                </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hidden md:block overflow-x-visibe">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Position
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white font-sans divide-y divide-gray-200"   style={{fontFamily:'"Outfit", sans-serif'}}>
                      {filteredPositions.map((position, index) => (
                        <React.Fragment key={index}>
                          <tr
                            className={`${
                              expandedIndex === index
                                ? "scale-105 transition-all duration-300 px-4 bg-stone-200 ease-in-out rounded-md"
                                : "scale-100 ease-in-out transition-all duration-300"
                            }`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-2xl">
                              {position.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {position.location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {position.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                          onClick={() => toggleDetails(index)}
                          className={`${
                            expandedIndex === index
                              ? "bg-white  "
                              : " bg-stone-900"
                          } p-2  text-xs text-white rounded-full transition-all duration-500 ease-in-out` }
                        >
                         
                            <FaChevronUp className={`${
                              expandedIndex === index
                                ? "flex hover:animate-bounce "
                                : "hidden"
                            } transition-all duration-500 ease-in-out   text-black ` }/>
                         
                            <FaChevronDown className={`${
                              expandedIndex === index
                                ? "hidden "
                                : " flex hover:animate-bounce "
                            }transition-all duration-500 ease-in-out ` }/>
                         
                        </button>
                            </td>
                          </tr >
                          {expandedIndex === index && (
                            <tr >
                              <td
                                colSpan="2"
                                className={` px-6 py-4 whitespace-wrap transition-all  duration-500 ease-in-out${expandedIndex===index ? 'translate-y-0 opacity-100 h-0' : '-translate-y-full opacity-0 h-fit'  }`}
                                style={{fontFamily:'"Outfit", sans-serif'}}
                              >
                                <div className="text-cyan-900 text-xl ">
                                  {position.details}
                                </div>
                                <div className="text-gray-600 mt-2" >
                                  <p>
                                    <span className="text-black font-normal text-lg">Experience:</span>{" "}
                                    {position.experience}
                                  </p>
                                  <p>
                                    <span className="text-black font-normal text-lg">Qualifications:</span>{" "}
                                    {position.educational_qualifications}
                                  </p>
                                  <p>
                                    <span className="text-black font-normal text-lg">Skills Required:</span>{" "}
                                    {position.skills_required.join(", ")}
                                  </p>
                                  <p>
                                    <span className="text-black font-normal text-lg">Responsibility:</span>{" "}
                                    <>{position.responsibility}</>
                                  </p>
                                  <p>
                                    <span className="text-black font-normal text-lg">Salary Range:</span>
                                    <span className="text-red-400 font-bold">
                                      {" "}
                                      {position.salary_range}
                                    </span>
                                  </p>

                                  <p>
                                    <span className="text-black font-normal text-lg">Application Deadline:</span>{" "}
                                    {position.application_deadline}
                                  </p>
                                 

                                
                                  <p className="flex">
                                    <span className="text-black font-normal text-lg">Benefits:</span>{" "}
                                    <div className="px-3">
                                      Health insurance,Paid leave,401(k)
                                    </div>{" "}
                                  </p>

                                  <p className="mt-2">
                                    
                                    @ <span className="text-[red]">TL Technologies</span> , we value innovation, collaboration, and a passion for excellence. Join us to be part of a dynamic team where your ideas and contributions are valued.
                                  </p>

                                  <p className="font-normal text-xl mt-3  text-black">
                                    {" "}
                                    Submit your resume, LinkedIn profile URL, and salary expectations via email to 
                                    <a
                                        href="mailto:careers@tltechnologies.net"
                                        className="text-red-500"
                                        style={{
                                          color: "blue",
                                          textDecoration: "underline",
                                        }}
                                      >
                                       {" "} careers@tltechnologies.net
                                      </a>
                                  </p>
                                </div>
                                <p className="flex justify-between flex-wrap mt-6 items-end gap-2">
                                  <button
                                    className="text-white bg-black px-2 hover:px-4 transition-all duration-300 py-1 rounded-full mt-2"
                                    onClick={() =>
                                      handleButtonClick(position.title)
                                    }
                                  >
                                    Apply Now
                                  </button>
                                  <p>
                                    {" "}
                                    <span>
                                      For more details, contact HR at{" "}
                                      <a
                                        href="mailto:hr@tltechnologies.net"
                                        className="text-red-500"
                                        style={{
                                          color: "blue",
                                          textDecoration: "underline",
                                        }}
                                      >
                                        hr@tltechnologies.net
                                      </a>
                                    </span>
                                  </p>
                                </p>
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
               <div
                 className="bg-white p-6 max-w-xl h-[80%] overflow-y-scroll  w-full bg-cover relative "
               >
                 <h2 className="text-2xl text-red-500 font-bold mb-4 font-sans ">
                   Application for {selectedJobTitle}
                 </h2>
                 <p className="font-light">
                   Please ensure to add the relevant data. If any data is misleading or manipulated, we can't proceed with the hiring process, as we don't like sorry.
                 </p>
                 <form className="space-y-4 mt-4 " onSubmit={handleSubmit} style={{fontFamily:'"Outfit", sans-serif'}}>
                   {/* Personal Information */}
                   <h3 className="text-lg font-semibold">
                     Personal Information
                   </h3>
                   <div>
                     <label
                       htmlFor="full_name"
                       className="block text-sm font-medium text-gray-700"
                       data-tooltip-id="full_name_tooltip"
                     >
                       Full Name
                     </label>
                     <Tooltip  style={{backgroundColor:"blue"}} id="full_name_tooltip" place="top" effect="solid">
                       Enter your full name as it appears on official documents.
                     </Tooltip>
                     <input
                       type="text"
                       id="full_name"
                       name="full_name"
                       placeholder="John Doe"
                       value={formData.full_name}
                       onChange={handleInputChange}
                       className="mt-1 block w-full border border-gray-300 bg-white rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                     />
                   </div>
                   <div>
                     <label
                       htmlFor="email_address"
                       className="block text-sm font-medium text-gray-700"
                       data-tooltip-id="email_address_tooltip"
                     >
                       Email Address
                     </label>
                     <Tooltip  style={{backgroundColor:"blue"}} id="email_address_tooltip" place="top" effect="solid">
                       Enter your email address where we can contact you.
                     </Tooltip>
                     <input
                       type="email"
                       id="email_address"
                       name="email_address"
                       placeholder="example@example.com"
                       value={formData.email_address}
                       onChange={handleInputChange}
                       className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                     />
                   </div>
                   <div>
                     <label
                       htmlFor="phone_number"
                       className="block text-sm font-medium text-gray-700"
                       data-tooltip-id="phone_number_tooltip"
                     >
                       Phone Number
                     </label>
                     <Tooltip  style={{backgroundColor:"blue"}} id="phone_number_tooltip" place="top" effect="solid">
                       Enter your contact phone number.
                     </Tooltip>
                     <input
                       type="text"
                       id="phone_number"
                       name="phone_number"
                       placeholder="Your phone number"
                       value={formData.phone_number}
                       onChange={handleInputChange}
                       className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                     />
                   </div>
                   <div>
                     <label
                       htmlFor="linkedin_profile_url"
                       className="block text-sm font-medium text-gray-700"
                       data-tooltip-id="linkedin_profile_url_tooltip"
                     >
                       LinkedIn Profile URL (optional)
                     </label>
                     <Tooltip  style={{backgroundColor:"blue"}} id="linkedin_profile_url_tooltip" place="top" effect="solid">
                       Enter your LinkedIn profile URL (optional).
                     </Tooltip>
                     <input
                       type="url"
                       id="linkedin_profile_url"
                       name="linkedin_profile_url"
                       placeholder="https://linkedin.com/in/your-profile"
                       value={formData.linkedin_profile_url}
                       onChange={handleInputChange}
                       className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                     />
                   </div>
                   <div>
                     <label
                       htmlFor="address"
                       className="block text-sm font-medium text-gray-700"
                       data-tooltip-id="address_tooltip"
                     >
                       Address (optional)
                     </label>
                     <Tooltip  style={{backgroundColor:"blue"}} id="address_tooltip" place="top" effect="solid">
                       Enter your current address (optional).
                     </Tooltip>
                     <input
                       type="text"
                       id="address"
                       name="address"
                       placeholder="Your address"
                       value={formData.address}
                       onChange={handleInputChange}
                       className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                     />
                   </div>
       
                   {/* Position Information */}
                   <h3 className="text-lg font-semibold">
                     Position Information
                   </h3>
                   <div>
                     <label
                       htmlFor="job_title"
                       className="block text-sm font-medium text-gray-700"
                       data-tooltip-id="job_title_tooltip"
                     >
                       Job Title
                     </label>
                     <Tooltip  style={{backgroundColor:"blue"}} id="job_title_tooltip" place="top" effect="solid">
                       This is the job title you are applying for.
                     </Tooltip>
                     <input
                       type="text"
                       id="job_title"
                       name="job_title"
                       value={selectedJobTitle}
                       readOnly
                       className="mt-1 block w-full border border-gray-300 bg-gray-100 rounded-lg shadow-sm p-2 focus:outline-none"
                     />
                   </div>
                
       
                   {/* Experience and Education */}
                   <h3 className="text-lg font-semibold">
                     Experience and Education
                   </h3>
                   <div>
                     <label
                       htmlFor="resume"
                       className="block text-sm font-medium text-gray-700"
                       data-tooltip-id="resume_tooltip"
                     >
                       Resume/CV Upload
                     </label>
                     <Tooltip  style={{backgroundColor:"blue"}} id="resume_tooltip" place="top" effect="solid">
                       Upload your resume or CV in PDF or Word format.
                     </Tooltip>
                     <input
                       type="file"
                       id="resume"
                       name="resume"
                       accept=".pdf,.doc,.docx"
                       className="mt-1 block w-full border border-gray-300 bg-white rounded-lg shadow-sm p-2 focus:outline-none"
                     />
                   </div>
                   <div>
                     <label
                       htmlFor="cover_letter"
                       className="block text-sm font-medium text-gray-700"
                       data-tooltip-id="cover_letter_tooltip"
                     >
                       Cover Letter Upload (optional)
                     </label>
                     <Tooltip  style={{backgroundColor:"blue"}} id="cover_letter_tooltip" place="top" effect="solid">
                       Upload your cover letter (optional).
                     </Tooltip>
                     <input
                       type="file"
                       id="cover_letter"
                       name="cover_letter"
                       accept=".pdf,.doc,.docx"
                       className="mt-1 block w-full border border-gray-300 bg-white rounded-lg shadow-sm p-2 focus:outline-none"
                     />
                   </div>
                   <div>
                     <label
                       htmlFor="years_of_experience"
                       className="block text-sm font-medium text-gray-700"
                       data-tooltip-id="years_of_experience_tooltip"
                     >
                       Years of Experience
                     </label>
                     <Tooltip  style={{backgroundColor:"blue"}} id="years_of_experience_tooltip" place="top" effect="solid">
                       Enter the number of years of professional experience you have.
                     </Tooltip>
                     <input
                       type="text"
                       id="years_of_experience"
                       name="years_of_experience"
                       placeholder="Years of experience"
                       value={formData.years_of_experience}
                       onChange={handleInputChange}
                       className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                     />
                   </div>
                   <div>
                     <label
                       htmlFor="highest_degree"
                       className="block text-sm font-medium text-gray-700"
                       data-tooltip-id="highest_degree_tooltip"
                     >
                       Highest Degree
                     </label>
                     <Tooltip  style={{backgroundColor:"blue"}} id="highest_degree_tooltip" place="top" effect="solid">
                       Enter your highest level of education.
                     </Tooltip>
                     <input
                       type="text"
                       id="highest_degree"
                       name="highest_degree"
                       placeholder="Your highest degree"
                       value={formData.highest_degree}
                       onChange={handleInputChange}
                       className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                     />
                   </div>
       
                   {/* Skills */}
                   <h3 className="text-lg font-semibold">Skills</h3>
                   <div>
                     <label
                       htmlFor="skills"
                       className="block text-sm font-medium text-gray-700"
                       data-tooltip-id="skills_tooltip"
                     >
                       Your Skills
                     </label>
                     <Tooltip  style={{backgroundColor:"blue"}} id="skills_tooltip" place="top" effect="solid">
                       List your skills relevant to the position.
                     </Tooltip>
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
       
                   {/* Additional Information */}
                   <h3 className="text-lg font-semibold">Additional Information</h3>
                   <div>
                     <label
                       htmlFor="portfolio"
                       className="block text-sm font-medium text-gray-700"
                       data-tooltip-id="portfolio_tooltip"
                     >
                       Portfolio Upload (optional)
                     </label>
                     <Tooltip  style={{backgroundColor:"blue"}} id="portfolio_tooltip" place="top" effect="solid">
                       Upload a portfolio file (optional).
                     </Tooltip>
                     <input
                       type="file"
                       id="portfolio"
                       name="portfolio"
                       accept=".pdf,.doc,.docx"
                       className="mt-1 block w-full border border-gray-300 bg-white rounded-lg shadow-sm p-2 focus:outline-none"
                     />
                   </div>
                   <div>
                     <label
                       htmlFor="certifications"
                       className="block text-sm font-medium text-gray-700"
                       data-tooltip-id="certifications_tooltip"
                     >
                       Certifications Upload (optional)
                     </label>
                     <Tooltip  style={{backgroundColor:"blue"}} id="certifications_tooltip" place="top" effect="solid">
                       Upload your certifications (optional).
                     </Tooltip>
                     <input
                       type="file"
                       id="certifications"
                       name="certifications"
                       accept=".pdf,.doc,.docx"
                       className="mt-1 block w-full border border-gray-300 bg-white rounded-lg shadow-sm p-2 focus:outline-none"
                     />
                   </div>
       
                   {/* Questions */}
                   <h3 className="text-lg font-semibold">Questions</h3>
                   <div>
                     <label
                       htmlFor="custom_questions"
                       className="block text-sm font-medium text-gray-700"
                       data-tooltip-id="custom_questions_tooltip"
                     >
                       Describe a challenging project you worked on
                     </label>
                     <Tooltip  style={{backgroundColor:"blue"}} id="custom_questions_tooltip" place="top" effect="solid">
                       Describe a challenging project you worked on.
                     </Tooltip>
                     <textarea
                       id="custom_questions"
                       name="custom_questions"
                       placeholder="Your answer"
                       rows="3"
                       value={formData.custom_questions}
                       onChange={handleInputChange}
                       className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                     ></textarea>
                   </div>
                   <div>
                     <label
                       htmlFor="salary_expectations"
                       className="block text-sm font-medium text-gray-700"
                       data-tooltip-id="salary_expectations_tooltip"
                     >
                       Salary Expectations
                     </label>
                     <Tooltip  style={{backgroundColor:"blue"}} id="salary_expectations_tooltip" place="top" effect="solid">
                       Enter your expected salary.
                     </Tooltip>
                     <input
                       type="text"
                       id="salary_expectations"
                       name="salary_expectations"
                       placeholder="Your salary expectations"
                       value={formData.salary_expectations}
                       onChange={handleInputChange}
                       className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                     />
                   </div>
                   <div>
                     <label
                       htmlFor="availability"
                       className="block text-sm font-medium text-gray-700"
                       data-tooltip-id="availability_tooltip"
                     >
                       Availability
                     </label>
                     <Tooltip  id="availability_tooltip" place="top" effect="solid">
                       Select the date you are available to start.
                     </Tooltip>
                     <input
                       type="date"
                       id="availability"
                       name="availability"
                       value={formData.availability}
                       onChange={handleInputChange}
                       className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                     />
                   </div>
       
                   {/* References */}
                   <h3 className="text-lg font-semibold">References</h3>
                   <div>
                     <label
                       htmlFor="reference_name"
                       className="block text-sm font-medium text-gray-700"
                       data-tooltip-id="reference_name_tooltip"
                     >
                       Reference Name
                     </label>
                     <Tooltip  id="reference_name_tooltip" place="top" effect="solid">
                       Enter the name of your reference.
                     </Tooltip>
                     <input
                       type="text"
                       id="reference_name"
                       name="reference_name"
                       placeholder="Reference name"
                       value={formData.reference_name}
                       onChange={handleInputChange}
                       className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                     />
                   </div>
                   <div>
                     <label
                       htmlFor="reference_contact"
                       className="block text-sm font-medium text-gray-700"
                       data-tooltip-id="reference_contact_tooltip"
                     >
                       Reference Contact Information (email and phone number)
                     </label>
                     <Tooltip  id="reference_contact_tooltip" place="top" effect="solid">
                       Provide contact information for your reference (email and phone number).
                     </Tooltip>
                     <input
                       type="text"
                       id="reference_contact"
                       name="reference_contact"
                       placeholder="Reference email and phone number"
                       value={formData.reference_contact}
                       onChange={handleInputChange}
                       className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                     />
                   </div>
                   <div>
                     <label
                       htmlFor="reference_relationship"
                       className="block text-sm font-medium text-gray-700"
                       data-tooltip-id="reference_relationship_tooltip"
                     >
                       Relationship to Reference
                     </label>
                     <Tooltip  id="reference_relationship_tooltip" place="top" effect="solid">
                       Describe your relationship with the reference.
                     </Tooltip>
                     <input
                       type="text"
                       id="reference_relationship"
                       name="reference_relationship"
                       placeholder="Relationship with reference"
                       value={formData.reference_relationship}
                       onChange={handleInputChange}
                       className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                     />
                   </div>
       
                   {/* Submission Confirmation */}
                   <h3 className="text-lg font-semibold">
                     Submission Confirmation
                   </h3>
                   <div className="flex items-center">
                     <input
                       type="checkbox"
                       id="terms_conditions"
                       name="terms_conditions"
                       value={formData.terms_conditions}
                       onChange={handleInputChange}
                       className="h-4 w-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                     />
                     <label
                       htmlFor="terms_conditions"
                       className="ml-2 block text-sm font-medium text-gray-700"
                       data-tooltip-id="terms_conditions_tooltip"
                     >
                       Agree to Terms and Conditions
                     </label>
                     <Tooltip  style={{backgroundColor:"blue"}} id="terms_conditions_tooltip" place="top" effect="solid">
                       You must agree to the terms and conditions to proceed.
                     </Tooltip>
                   </div>
                
                   <div className="flex justify-end">
                     <button
                       type="submit"
                       className=" bg-blue-700 text-white py-2 px-4 rounded-full hover:px-6 transition-all duration-300 ease-in-out"
                     >
                       Submit Application
                     </button>
                   </div>
                 </form>
                   <button   type="button"
                       onClick={handleCloseModal} className='w-fit p-1 absolute top-[20px] right-[20px] text-2xl z-50 bg-stone-200  text-red-400 rounded-lg'>
            <IoClose/>
          </button>
               </div>
             </div>
            )}
          </div>
        </div>
      </div>
      {/* <InfiniteScroll/> */}
      <Footer/>
    </div>
  );
}

export default App;
