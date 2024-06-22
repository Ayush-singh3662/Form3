/* eslint-disable react/prop-types */

function TechnologySection({ data, onChange, errors }) {
  return (
    <div>
      <div>
        <label>Favorite Programming Language</label>
        <select name="language" value={data.language} onChange={(e) => onChange('language', e.target.value)}>
          <option value="">Select</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="C#">C#</option>
        </select>
        {errors.technologyLanguage && <span>{errors.technologyLanguage}</span>}
      </div>
      <div>
        <label>Years of Experience</label>
        <input type="number" name="experience" value={data.experience} onChange={(e) => onChange('experience', e.target.value)} />
        {errors.technologyExperience && <span>{errors.technologyExperience}</span>}
      </div>
    </div>
  );
}

export default TechnologySection;