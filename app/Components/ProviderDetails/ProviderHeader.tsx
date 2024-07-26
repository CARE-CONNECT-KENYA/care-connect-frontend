'use client'
import React from 'react';
import styles from '../../Styles/Singleprovider.module.css'

type ProviderHeaderProps = {
  provider: Provider;
  showFullBio: boolean;
  onReadMoreToggle: () => void;
};

const ProviderHeader: React.FC<ProviderHeaderProps> = ({ provider, showFullBio, onReadMoreToggle }) => {
  const truncateBio = (bio: string) => {
    const maxLength = 200;
    if (bio.length > maxLength && !showFullBio) {
      return bio.slice(0, maxLength) + '...';
    }
    return bio;
  };

  return (
    <div className={styles.TopDetails}>
      <div className={styles.TopLeft}>
        <img src={provider.profileImage} alt={provider.name} />
        <p>Working Hours: {provider.workingHours}</p>
      </div>
      <div className={styles.TopRight}>
        <h1>{provider.name}</h1>
        <div className={styles.ContacInfo}>
          <p className={styles.Phonenumber}>{provider.number}</p>
          <p><span>Email:</span> {provider.email}</p>
        </div>
        <div className={styles.ContacInfo}>
          <p><span>Location:</span> {provider.location}</p>
        </div>
        <p className={styles.bio}>
          {truncateBio(provider.bio)}{' '}
          <span onClick={onReadMoreToggle} className={styles.ReadMore}>
            {showFullBio ? 'Show less' : 'Read more'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProviderHeader;
