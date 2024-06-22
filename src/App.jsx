import { useState } from 'react';
import axios from 'axios';
import TechnologySection from './components/TechnologySection';
import HealthSection from './components/HealthSection';
import EducationSection from './components/EducationSection';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    technology: { language: '', experience: '' },
    health: { frequency: '', diet: '' },
    education: { qualification: '', field: '' },
    feedback: '',
    additional: ''
  });

  const [errors, setErrors] = useState({});
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [flag, setFlag] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSectionChange = (section, name, value) => {
    setFormData({
      ...formData,
      [section]: { ...formData[section], [name]: value }
    });
  };

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await axios.get(`https://6676b073145714a1bd728051.mockapi.io/api/v1/questions?topic=${topic}`);
      setAdditionalQuestions(response.data);
    } catch (error) {
      console.error("Error fetching additional questions", error);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.surveyTopic) newErrors.surveyTopic = 'Survey Topic is required';
    if (formData.surveyTopic === 'Technology') {
      if (!formData.technology.language) newErrors.technologyLanguage = 'Language is required';
      if (!formData.technology.experience) newErrors.technologyExperience = 'Experience is required';
      if(formData.technology.experience < 0) newErrors.technologyExperience = 'Experience must be greater than or equal to 0';
    }
    if (formData.surveyTopic === 'Health') {
      if (!formData.health.frequency) newErrors.healthFrequency = 'Frequency is required';
      if (!formData.health.diet) newErrors.healthDiet = 'Diet is required';
    }
    if (formData.surveyTopic === 'Education') {
      if (!formData.education.qualification) newErrors.educationQualification = 'Qualification is required';
      if (!formData.education.field) newErrors.educationField = 'Field is required';
    }
    if (formData.feedback.length < 50) newErrors.feedback = 'Feedback must be at least 50 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await fetchAdditionalQuestions(formData.surveyTopic);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Survey Form</h1>
        <div>
          <label>Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <span>{errors.fullName}</span>}
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Survey Topic</label>
          <select name="surveyTopic" value={formData.surveyTopic} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && <span>{errors.surveyTopic}</span>}
        </div>
        {formData.surveyTopic === 'Technology' && (
          <TechnologySection data={formData.technology} onChange={(name, value) => handleSectionChange('technology', name, value)} errors={errors} />
        )}
        {formData.surveyTopic === 'Health' && (
          <HealthSection data={formData.health} onChange={(name, value) => handleSectionChange('health', name, value)} errors={errors} />
        )}
        {formData.surveyTopic === 'Education' && (
          <EducationSection data={formData.education} onChange={(name, value) => handleSectionChange('education', name, value)} errors={errors} />
        )}
        <div>
          <label>Feedback</label>
          <textarea name="feedback" value={formData.feedback} onChange={handleChange} />
          {errors.feedback && <span>{errors.feedback}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
      {additionalQuestions.length > 0 && (
        <div>
          <h2>Additional Questions</h2>
          {additionalQuestions.map((
            question, index) => (
            <div key={index} className='additional'>
              <label>{question.text}</label>
              <input type="text" name='additional' value={formData.additional} onChange={handleChange} />
              <div>
                <button onClick={() => setFlag(!flag)}>{flag ? 'Hide Summary' :'Show Summary'}</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {flag && (
        <div>
          <h3>Form Summary</h3>
          <p><span className='summ'>Name: </span>{formData.fullName}</p>
          <p><span className='summ'>Email: </span>{formData.email}</p>
          <p><span className='summ'>Survey Report: </span>{formData.surveyTopic}</p>
          {formData.surveyTopic === 'Technology' && <p><span className='summ'>Favourite Programming Language: </span>{formData.technology.language}</p>}
          {formData.surveyTopic === 'Technology' && <p><span className='summ'>Years of Experience: </span>{formData.technology.experience}</p>}
          {formData.surveyTopic === 'Health' && <p><span className='summ'>Exercise Frequency: </span>{formData.health.frequency}</p>}
          {formData.surveyTopic === 'Health' && <p><span className='summ'>Diet Preference: </span>{formData.health.diet}</p>}
          {formData.surveyTopic === 'Education' && <p><span className='summ'>Highest Qualification: </span>{formData.education.qualification}</p>}
          {formData.surveyTopic === 'Education' && <p><span className='summ'>Field of Study: </span>{formData.education.field}</p>}
          <p><span className='summ'>Feedback: </span>{formData.feedback}</p>
          <h4>Additional Question:</h4>
          <p><span className='summ'>{additionalQuestions[0].text} </span> {'=>'} {formData.additional}</p>
        </div>
      )}
    </div>
  );
}

export default App;