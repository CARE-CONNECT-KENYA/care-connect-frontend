import React from 'react';
import styles from '../../Styles/Filters.module.css';

type FacilityFiltersProps = {
  ratingRangeFilter: [number, number] | null;
  setRatingRangeFilter: React.Dispatch<React.SetStateAction<[number, number] | null>>;
  servicesFilter: string[];
  setServicesFilter: React.Dispatch<React.SetStateAction<string[]>>;
  handleClearFilters: () => void;
};

const FacilityFilters: React.FC<FacilityFiltersProps> = ({
  ratingRangeFilter,
  setRatingRangeFilter,
  servicesFilter,
  setServicesFilter,
  handleClearFilters,
}) => {
  return (
    <aside className={styles.sidebar}>
      <h3>I am looking for?</h3>

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

export default FacilityFilters;
