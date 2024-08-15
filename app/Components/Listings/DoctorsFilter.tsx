import React from 'react';
import styles from '../../Styles/Filters.module.css';

type FiltersProps = {
  ratingRangeFilter: [number, number] | null;
  setRatingRangeFilter: React.Dispatch<React.SetStateAction<[number, number] | null>>;
  servicesFilter: string[];
  setServicesFilter: React.Dispatch<React.SetStateAction<string[]>>;
  genderFilter: string[];
  setGenderFilter: React.Dispatch<React.SetStateAction<string[]>>;
  handleClearFilters: () => void;
};

const Filters: React.FC<FiltersProps> = ({
  ratingRangeFilter,
  setRatingRangeFilter,
  servicesFilter,
  setServicesFilter,
  genderFilter,
  setGenderFilter,
  handleClearFilters,
}) => {
  return (
    <aside className={styles.sidebar}>
      <h3>I am Looking For ?</h3>

            {/* Gender Filter */}
            <div>
        <h4>Gender</h4>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={genderFilter.includes('Male')}
            onChange={() =>
              setGenderFilter(
                genderFilter.includes('Male')
                  ? genderFilter.filter(gender => gender !== 'Male')
                  : [...genderFilter, 'Male']
              )
            }
          />
          <span className="ml-2">Male</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={genderFilter.includes('Female')}
            onChange={() =>
              setGenderFilter(
                genderFilter.includes('Female')
                  ? genderFilter.filter(gender => gender !== 'Female')
                  : [...genderFilter, 'Female']
              )
            }
          />
          <span className="ml-2">Female</span>
        </label>
      </div>
      
      {/* Popular Services Filter */}
      <div>
        <h4>Popular Services</h4>
        <div className={styles.ServicesList}>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={servicesFilter.includes('Dentist')}
              onChange={() =>
                setServicesFilter(
                  servicesFilter.includes('Dentist')
                    ? servicesFilter.filter(service => service !== 'Dentist')
                    : [...servicesFilter, 'Dentist']
                )
              }
            />
            <span className="ml-2">Dentist</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={servicesFilter.includes('Pediatrician')}
              onChange={() =>
                setServicesFilter(
                  servicesFilter.includes('Pediatrician')
                    ? servicesFilter.filter(service => service !== 'Pediatrician')
                    : [...servicesFilter, 'Pediatrician']
                )
              }
            />
            <span className="ml-2">Pediatrician</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={servicesFilter.includes('Neurologist')}
              onChange={() =>
                setServicesFilter(
                  servicesFilter.includes('Neurologist')
                    ? servicesFilter.filter(service => service !== 'Neurologist')
                    : [...servicesFilter, 'Neurologist']
                )
              }
            />
            <span className="ml-2">Neurologist</span>
          </label>
        </div>
      </div>
      
      {/* Rating Filter */}
      <div>
        <h4>Rating</h4>
        <select
          className={styles.RatingDPD}
          onChange={(e) => setRatingRangeFilter(e.target.value === '1-3' ? [1, 3] : [3, 5])}
        >
          <option value="">Select Rating</option>
          <option value="1-3">1-3</option>
          <option value="3-5">3-5</option>
        </select>
      </div>
      

      
      {/* Clear Filters Button */}
      <button className={styles.clearFiltersButton} onClick={handleClearFilters}>
        Clear Filters
      </button>
    </aside>
  );
};

export default Filters;
