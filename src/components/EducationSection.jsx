/* eslint-disable react/prop-types */


function EducationSection({ data, onChange, errors }) {
  return (
    <div>
      <div>
        <label>Highest Qualification</label>
        <select name="qualification" value={data.qualification} onChange={(e) => onChange('qualification', e.target.value)}>
          <option value="">Select</option>
          <option value="High School">High School</option>
          <option value="Bachelor's">Bachelor&apos;s</option>
          <option value="Master's">Master&apos;s</option>
          <option value="PhD">PhD</option>
        </select>
        {errors.educationQualification && <span>{errors.educationQualification}</span>}
      </div>
      <div>
        <label>Field of Study</label>
        <input type="text" name="field" value={data.field} onChange={(e) => onChange('field', e.target.value)} />
        {errors.educationField && <span>{errors.educationField}</span>}
      </div>
    </div>
  );
}

export default EducationSection;