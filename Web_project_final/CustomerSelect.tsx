import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { SelectOption, UserRole } from '../types';

interface CustomSelectProps {
  options: SelectOption[];
  value: UserRole;
  onChange: (value: UserRole) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: UserRole) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between w-full px-4 py-3 
          text-left bg-gray-50 rounded-lg border transition-all duration-200
          ${
            isOpen
              ? 'border-green-400 ring-1 ring-green-400 bg-white'
              : 'border-gray-300 hover:border-gray-400'
          }
        `}
      >
        <span className="text-gray-900 text-base">
          {selectedOption ? selectedOption.label : 'Select role...'}
        </span>
        <ChevronDown
          size={20}
          className={`text-gray-600 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-b-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="py-0">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`
                  px-4 py-3 cursor-pointer text-base transition-colors duration-150
                  ${
                    option.value === value
                      ? 'bg-gray-500 text-white font-medium' // Looking at image 2, selected item in dropdown is dark grey/white text
                      : 'text-gray-900 hover:bg-gray-100'
                  }
                `}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;