import React from 'react';
import styles from '../../Styles/Filters.module.css';

type FiltersProps = {
  
  ratingRangeFilter: [number, number] | null;
  setRatingRangeFilter: React.Dispatch<React.SetStateAction<[number, number] | null>>;
  servicesFilter: string[];
  setServicesFilter: React.Dispatch<React.SetStateAction<string[]>>;
  handleClearFilters: () => void;
};

const Filters: React.FC<FiltersProps> = ({
  ratingRangeFilter,
  setRatingRangeFilter,
  servicesFilter,
  setServicesFilter,
  handleClearFilters,
}) => {
  return (
    <aside className={styles.sidebar}>
      <h3>I am Looking For ?</h3>
      
      <div>
        <h4>Popular Services</h4>
        <div className={styles.ServicesList}>
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
      </div>
      <div>
        <h4>Rating</h4>
        <select className={styles.RatingDPD}onChange={(e) => setRatingRangeFilter(e.target.value === '1-3' ? [1, 3] : [3, 5])}>
          <option value="">Select Rating</option>
          <option value="1-3">1-3</option>
          <option value="3-5">3-5</option>
        </select>
      </div>
      <button className={styles.clearFiltersButton} onClick={handleClearFilters}>
        Clear Filters
      </button>
    </aside>
  );
};

export default Filters;
