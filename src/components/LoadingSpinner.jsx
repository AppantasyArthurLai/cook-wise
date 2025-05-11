import React from 'react';

/**
 * A reusable loading spinner component
 * @param {Object} props - Component props
 * @param {string} [props.size='md'] - Size of the spinner (sm, md, lg)
 * @param {string} [props.color='#E67E22'] - Primary color of the spinner border
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {JSX.Element} Spinner component
 */
const LoadingSpinner = ({ 
  size = 'md', 
  color = '#E67E22', 
  className = '' 
}) => {
  // Size mapping
  const sizeClasses = {
    sm: 'h-8 w-8 border-2',
    md: 'h-12 w-12 border-t-4 border-b-4',
    lg: 'h-16 w-16 border-t-4 border-b-4',
  };
  
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const style = { borderColor: color };
  
  return (
    <div 
      data-testid="loading-spinner"
      className={`animate-spin rounded-full ${sizeClass} ${className}`}
      style={style}
    />
  );
};

export default LoadingSpinner;
