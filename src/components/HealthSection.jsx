/* eslint-disable react/prop-types */


function HealthSection({ data, onChange, errors }) {
  return (
    <div>
      <div>
        <label>Exercise Frequency</label>
        <select name="frequency" value={data.frequency} onChange={(e) => onChange('frequency', e.target.value)}>
          <option value="">Select</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Rarely">Rarely</option>
        </select>
        {errors.healthFrequency && <span>{errors.healthFrequency}</span>}
      </div>
      <div>
        <label>Diet Preference</label>
        <select name="diet" value={data.diet} onChange={(e) => onChange('diet', e.target.value)}>
          <option value="">Select</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
        </select>
        {errors.healthDiet && <span>{errors.healthDiet}</span>}
      </div>
    </div>
  );
}

export default HealthSection;
