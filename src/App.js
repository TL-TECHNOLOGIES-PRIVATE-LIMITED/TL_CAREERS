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
import { FaHandPointRight } from "react-icons/fa";
import { LuClock } from "react-icons/lu";

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const [formData, setFormData] = useState({
    full_name: '',
    email_address: '',
    phone_number: '',
    linkedin_profile_url: '',
    years_of_experience: '',
    highest_educational_qualification: '',
    skills: '',
    salary_expectations: '',
    availability: '',
    reference_1: {
      name: '',
      email: '',
      phone_number: '',
      relationship: ''
    }
  });
  const openingsPositions = [
    {
      job_id: "RD001",
      title: "React Developer",
      location: "Remote",
      type: "Full-time",
      shift: "Day",
      icon: "<FaReact />",
      experience: "2+ years",
      educational_qualifications: "Bachelor's degree in Computer Science or related field",
      skills_required: ["React", "JavaScript", "HTML", "CSS"],
      responsibility: "Develop and maintain React applications.",
      details: "We are seeking an experienced React Developer to join our team. The ideal candidate will have a background in building web applications using React, JavaScript, HTML, and CSS.",
      salary_range: "$70,000 - $90,000",
      benefits: "Health insurance, Paid leave, 401(k)",
      application_deadline: "2024-12-31",
      application_process: "Submit your resume, LinkedIn profile URL, and salary expectations via email to careers@tltechnologies.net",
      job_posted_date: "2024-08-01",
      contact_information: "For more details, contact HR at hr@tltechnologies.net",
      company_culture: "At TL Technologies, we value innovation, collaboration, and a passion for excellence. Join us to be part of a dynamic team where your ideas and contributions are valued."
    },
    {
      job_id: "FSD002",
      title: "Full stack Developer",
      location: "Remote",
      type: "Full-time",
      shift: "Day",
      icon: "<FaCode />",
      experience: "1+ years",
      educational_qualifications: "Bachelor's degree in Computer Science or related field",
      skills_required: ["JavaScript", "Node.js", "React", "SQL"],
      responsibility: "Work on server-side logic and database management.",
      details: "We are seeking a Full stack Developer to join our team. You will work on both frontend and backend development tasks, and be responsible for building, testing, and deploying new features.",
      salary_range: "$80,000 - $100,000",
      benefits: "Health insurance, Paid leave, 401(k)",
      application_deadline: "2024-12-31",
      application_process: "Submit your resume, LinkedIn profile URL, and salary expectations via email to careers@tltechnologies.net",
      job_posted_date: "2024-08-01",
      contact_information: "For more details, contact HR at hr@tltechnologies.net",
      company_culture: "At TL Technologies, we value innovation, collaboration, and a passion for excellence. Join us to be part of a dynamic team where your ideas and contributions are valued."
    },
    {
      job_id: "FD003",
      title: "Flutter Developer",
      location: "Remote",
      type: "Full-time",
      shift: "Day",
      icon: "<SiFlutter />",
      experience: "1+ year",
      educational_qualifications: "Bachelor's degree in Computer Science or related field",
      skills_required: ["Flutter", "Dart", "UI/UX Design"],
      responsibility: "Design user interfaces and improve user experiences.",
      details: "Join our team as a Flutter Developer. You will be responsible for building high-quality, innovative, and fully performing mobile applications that comply with coding standards and technical design.",
      salary_range: "$75,000 - $95,000",
      benefits: "Health insurance, Paid leave, 401(k)",
      application_deadline: "2024-12-31",
      application_process: "Submit your resume, LinkedIn profile URL, and salary expectations via email to careers@tltechnologies.net",
      job_posted_date: "2024-08-01",
      contact_information: "For more details, contact HR at hr@tltechnologies.net",
      company_culture: "At TL Technologies, we value innovation, collaboration, and a passion for excellence. Join us to be part of a dynamic team where your ideas and contributions are valued."
    },
    {
      job_id: "GD004",
      title: "Graphic Designer",
      location: "Remote",
      type: "Full-time",
      shift: "Day",
      icon: "<SiAdobephotoshop />",
      experience: "1+ year",
      educational_qualifications: "Bachelor's degree in Graphic Design or related field",
      skills_required: ["Adobe Photoshop", "Illustrator", "InDesign"],
      responsibility: "Design user interfaces and improve user experiences.",
      details: "We are looking for a talented Graphic Designer to create amazing user experiences. The ideal candidate should have an eye for clean and artful design, possess superior UI skills and be able to translate high-level requirements into interaction flows and artifacts.",
      salary_range: "$60,000 - $80,000",
      benefits: "Health insurance, Paid leave, 401(k)",
      application_deadline: "2024-12-31",
      application_process: "Submit your resume, LinkedIn profile URL, and salary expectations via email to careers@tltechnologies.net",
      job_posted_date: "2024-08-01",
      contact_information: "For more details, contact HR at hr@tltechnologies.net",
      company_culture: "At TL Technologies, we value innovation, collaboration, and a passion for excellence. Join us to be part of a dynamic team where your ideas and contributions are valued."
    }
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
    const requiredFields = [
      'name', 'email', 'country', 'state', 'experience', 'linkedin', 'number', 'skills', 'position', 'education'
    ];
    const emptyFields = requiredFields.filter(field => !formData[field]?.trim());
  
    if (emptyFields.length > 0) {
      alert("Please fill in all required fields before submitting.");
      return;
    }
  
    // Prepare the form data to match the EmailJS template
    const templateParams = {
      full_name: formData.name,
      email_address: formData.email,
      phone_number: formData.number,
      linkedin_profile_url: formData.linkedin,
      address: formData.address || 'Not provided',
      job_title: selectedJobTitle,
      job_id: `ID-${selectedJobTitle.replace(/\s+/g, '-').toUpperCase()}`,
      years_of_experience: formData.experience,
      highest_educational_qualification: formData.education,
      skills: formData.skills,
      portfolio_upload: formData.portfolio_upload || 'Not provided',
      certifications_upload: formData.certifications_upload || 'Not provided',
      custom_question_1: formData.custom_question_1 || 'Not answered',
      custom_question_2: formData.custom_question_2 || 'Not answered',
      salary_expectations: formData.salary_expectations || 'Not provided',
      availability: formData.availability || 'Not provided',
      reference_name: formData.reference_name || 'Not provided',
      reference_contact: formData.reference_contact || 'Not provided',
      reference_relationship: formData.reference_relationship || 'Not provided',
      terms_conditions: formData.terms_conditions ? 'Yes' : 'No',
      background_check: formData.background_check ? 'Yes' : 'No'
    };
  
    // Send the form data using EmailJS
    emailjs.send('service_l0u1r2u', 'template_0y3wvy7', templateParams, 'xklh-Mc4JkQsNpiXm')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Application submitted successfully!');
      }, (err) => {
        console.error('FAILED...', err);
        alert('Failed to submit application. Please try again.');
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
          
      <main className="container mx-auto px-4 overflow-visible
      ">
        <div className="bg-white shadow rounded-lg">
          <div className="block md:hidden">
            {filteredPositions.map((position, index) => (
              <div key={index} className="border-b border-gray-200 p-4">
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-lg">{position.title}</div>
                  <button onClick={() => toggleDetails(index)} className='p-2 bg-stone-900 text-white rounded-full'>
                    {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                <div className="text-gray-600">
                  {expandedIndex === index && (
                    <div>
                      <p className='flex justify-center w-fit items-center gap-2'><FaHandPointRight className='text-red-400'/>{position.location}</p>
                      <p className='flex justify-center w-fit items-center gap-2'><LuClock className='text-red-400'/>{position.type}</p>
                      <p>{position.details}</p>
                      <button className='text-white bg-black px-2 py-1 rounded-lg'>Apply Now</button>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white font-sans divide-y divide-gray-200">
                {filteredPositions.map((position, index) => (
                  <React.Fragment key={index}>
                    <tr className={`${expandedIndex === index ? "scale-105 transition-all duration-300 bg-stone-200 ease-in-out rounded-lg" : "scale-100 ease-in-out transition-all duration-300"}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-2xl">{position.title}</td>
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
                        <td colSpan="4" className="px-6 py-4 whitespace-wrap">
                          <div className="text-cyan-600">{position.details}</div>
                          <div className="text-gray-600 mt-2">
                            <p><strong>Experience:</strong> {position.experience}</p>
                            <p><strong>Qualifications:</strong> {position.educational_qualifications}</p>
                            <p><strong>Skills Required:</strong> {position.skills_required.join(', ')}</p>
                            <p><strong>Responsibility:</strong> {position.responsibility}</p>
                            <p><strong>Salary Range:</strong><span className='text-red-400 font-bold'> {position.salary_range}</span></p>
                            <p><strong>Benefits:</strong> {position.benefits}</p>
                            <p><strong>Application Deadline:</strong> {position.application_deadline}</p>
                            <p><strong>Application Process:</strong> {position.application_process}</p>
                            <p> <span>
    For more details, contact HR at <a href="mailto:hr@tltechnologies.net" style={{ color: 'blue', textDecoration: 'underline' }}>hr@tltechnologies.net</a>
  </span></p>
                            <p><strong>Company Culture:</strong> {position.company_culture}</p>
                          </div>
                          <button className='text-white bg-black px-2 py-1 rounded-lg mt-2' onClick={() => handleButtonClick(position.title)} >Apply Now</button>
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
    <div className="bg-white p-6 max-w-xl h-[80%] overflow-y-scroll w-full bg-cover"
    //  style={{backgroundImage:"url('https://img.freepik.com/free-vector/old-paper-texture_1182-600.jpg?t=st=1722686626~exp=1722690226~hmac=44e59a46c9fecbde3cc937f94d58f93286ced2a38488ccbfca0d9a85d1ba4a16&w=740')"}}
     >
      <h2 className="text-2xl text-red-500 font-bold mb-4 font-sans ">Application for {selectedJobTitle}</h2>
      <p className='font-light'>
        Please ensure to add the relevant data. If any data is misleading or manipulated, 
        we can't proceed with the hiring process, as we don't like sorry.
      </p>      <form className="space-y-4 mt-4" onSubmit={handleSubmit} >
        {/* Personal Information */}
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
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
          <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">Email Address</label>
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
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
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
          <label htmlFor="linkedin_profile_url" className="block text-sm font-medium text-gray-700">LinkedIn Profile URL (optional)</label>
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
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address (optional)</label>
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
        <h3 className="text-lg font-semibold">Position Information</h3>
        <div>
          <label htmlFor="job_title" className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            id="job_title"
            name="job_title"
            value={selectedJobTitle}
            readOnly
            className="mt-1 block w-full border border-gray-300 bg-gray-100 rounded-lg shadow-sm p-2 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="job_id" className="block text-sm font-medium text-gray-700">Job ID</label>
          <input
            type="text"
            id="job_id"
            name="job_id"
            value={`ID-${selectedJobTitle.replace(/\s+/g, '-').toUpperCase()}`}
            readOnly
            className="mt-1 block w-full border border-gray-300 bg-gray-100 rounded-lg shadow-sm p-2 focus:outline-none"
          />
        </div>

        {/* Experience and Education */}
        <h3 className="text-lg font-semibold">Experience and Education</h3>
        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume/CV Upload</label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf,.doc,.docx"
            className="mt-1 block w-full border border-gray-300 bg-white rounded-lg shadow-sm p-2 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="cover_letter" className="block text-sm font-medium text-gray-700">Cover Letter Upload (optional)</label>
          <input
            type="file"
            id="cover_letter"
            name="cover_letter"
            accept=".pdf,.doc,.docx"
            className="mt-1 block w-full border border-gray-300 bg-white rounded-lg shadow-sm p-2 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="years_of_experience" className="block text-sm font-medium text-gray-700">Years of Experience</label>
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
          <label htmlFor="highest_educational_qualification" className="block text-sm font-medium text-gray-700">Highest Educational Qualification</label>
          <input
            type="text"
            id="highest_educational_qualification"
            name="highest_educational_qualification"
            placeholder="Your highest degree"
            value={formData.highest_educational_qualification}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>
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

        {/* Additional Documents */}
        <h3 className="text-lg font-semibold">Additional Documents</h3>
        <div>
          <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">Portfolio Upload</label>
          <input
            type="file"
            id="portfolio"
            name="portfolio"
            accept=".pdf,.doc,.docx"
            className="mt-1 block w-full border border-gray-300 bg-white rounded-lg shadow-sm p-2 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="certifications" className="block text-sm font-medium text-gray-700">Certifications Upload (optional)</label>
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
          <label htmlFor="custom_questions" className="block text-sm font-medium text-gray-700">Describe a challenging project you worked on</label>
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
          <label htmlFor="salary_expectations" className="block text-sm font-medium text-gray-700">Salary Expectations</label>
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
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability</label>
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
          <label htmlFor="reference_name" className="block text-sm font-medium text-gray-700">Reference Name</label>
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
          <label htmlFor="reference_contact" className="block text-sm font-medium text-gray-700">Reference Contact Information (email and phone number)</label>
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
          <label htmlFor="reference_relationship" className="block text-sm font-medium text-gray-700">Relationship to Reference</label>
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
        <h3 className="text-lg font-semibold">Submission Confirmation</h3>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms_conditions"
            name="terms_conditions"
            value={formData.terms_conditions}
            onChange={handleInputChange}
            className="h-4 w-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
          />
          <label htmlFor="terms_conditions" className="ml-2 block text-sm font-medium text-gray-700">Agree to Terms and Conditions</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="background_check"
            name="background_check"
            value={formData.background_check}
            onChange={handleInputChange}
            className="h-4 w-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
          />
          <label htmlFor="background_check" className="ml-2 block text-sm font-medium text-gray-700">Consent for background check (if applicable)</label>
        </div>

        {/* Review and Submit */}
        <h3 className="text-lg font-semibold">Review and Submit</h3>
        <p className="text-gray-600">Please review all entered information before submitting.</p>
        <button
          type="submit"
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
