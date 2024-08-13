import React from 'react';
import styles from '../../Styles/Filters.module.css';

type FiltersProps = {
  genderFilter: string | null;
  setGenderFilter: React.Dispatch<React.SetStateAction<string | null>>;
  ratingRangeFilter: [number, number] | null;
  setRatingRangeFilter: React.Dispatch<React.SetStateAction<[number, number] | null>>;
  servicesFilter: string[];
  setServicesFilter: React.Dispatch<React.SetStateAction<string[]>>;
  handleClearFilters: () => void;
};

const Filters: React.FC<FiltersProps> = ({
  genderFilter,
  setGenderFilter,
  ratingRangeFilter,
  setRatingRangeFilter,
  servicesFilter,
  setServicesFilter,
  handleClearFilters,
}) => {
  return (
    <aside className={styles.sidebar}>
      <h3>Filters</h3>
      <div>
        <h4>Gender</h4>
        <label>
          <input
            type="checkbox"
            checked={genderFilter === 'Male'}
            onChange={() => setGenderFilter(genderFilter === 'Male' ? null : 'Male')}
          />
          Male
        </label>
        <label>
          <input
            type="checkbox"
            checked={genderFilter === 'Female'}
            onChange={() => setGenderFilter(genderFilter === 'Female' ? null : 'Female')}
          />
          Female
        </label>
      </div>
      <div>
        <h4>Rating</h4>
        <select onChange={(e) => setRatingRangeFilter(e.target.value === '1-3' ? [1, 3] : [3, 5])}>
          <option value="">Select Rating</option>
          <option value="1-3">1-3</option>
          <option value="3-5">3-5</option>
        </select>
      </div>
      <div>
        <h4>Services</h4>
        <label>
          <input
            type="checkbox"
            checked={servicesFilter.includes('Dentist')}
            onChange={() => setServicesFilter(
              servicesFilter.includes('Dentist')
                ? servicesFilter.filter(service => service !== 'Dentist')
                : [...servicesFilter, 'Dentist']
            )}
          />
          Dentist
        </label>
        <label>
          <input
            type="checkbox"
            checked={servicesFilter.includes('Pediatrician')}
            onChange={() => setServicesFilter(
              servicesFilter.includes('Pediatrician')
                ? servicesFilter.filter(service => service !== 'Pediatrician')
                : [...servicesFilter, 'Pediatrician']
            )}
          />
          Pediatrician
        </label>
        <label>
          <input
            type="checkbox"
            checked={servicesFilter.includes('Neurologist')}
            onChange={() => setServicesFilter(
              servicesFilter.includes('Neurologist')
                ? servicesFilter.filter(service => service !== 'Neurologist')
                : [...servicesFilter, 'Neurologist']
            )}
          />
          Neurologist
        </label>
      </div>
      <button className={styles.clearFiltersButton} onClick={handleClearFilters}>
        Clear Filters
      </button>
    </aside>
  );
};

export default Filters;
