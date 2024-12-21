// src/components/CustomDropdown.tsx

import React, { useState, useRef, useEffect } from "react";
import { UrlCategories } from "@interfaces";

type CustomDropdownProps = {
  label: string;
  selectedCategory: UrlCategories;
  onSelectCategory: (category: UrlCategories) => void;
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  selectedCategory,
  onSelectCategory,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<HTMLLIElement[]>([]);

  // Convert enum to array of values
  const categories: UrlCategories[] = Object.values(UrlCategories);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation on the toggle button
  const handleButtonKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(0);
        break;
      case "ArrowUp":
        event.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(categories.length - 1);
        break;
      case "Escape":
        if (isOpen) {
          event.preventDefault();
          setIsOpen(false);
          setHighlightedIndex(-1);
        }
        break;
      default:
        break;
    }
  };

  // Handle keyboard navigation within options
  const handleOptionKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    index: number
  ) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev < categories.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : categories.length - 1
        );
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        onSelectCategory(categories[index]);
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        buttonRef.current?.focus();
        break;
      default:
        break;
    }
  };

  // Scroll into view when highlighted
  useEffect(() => {
    if (highlightedIndex >= 0 && optionsRef.current[highlightedIndex]) {
      optionsRef.current[highlightedIndex].scrollIntoView({
        block: "nearest",
      });
    }
  }, [highlightedIndex]);

  return (
    <div
      className="flex justify-center items-center space-x-5"
      ref={dropdownRef}
    >
      <label
        id="dropdown-label"
        htmlFor="custom-dropdown"
        className="block text-lg font-medium text-gray-200 mb-1"
      >
        {label}
      </label>
      <button
        type="button"
        className="inline-flex justify-between w-48 rounded-md border border-orange-400 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="dropdown-label"
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleButtonKeyDown}
        ref={buttonRef}
      >
        <span className="block truncate">{selectedCategory}</span>
        <svg
          className={`-mr-1 ml-2 h-5 w-5 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.353a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-labelledby="dropdown-label"
          tabIndex={-1}
          className="absolute z-10 mt-1 w-48 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm border border-orange-400"
        >
          {categories.map((category, index) => (
            <li
              key={category}
              id={`listbox-option-${category}`}
              role="option"
              aria-selected={selectedCategory === category}
              tabIndex={-1}
              ref={(el) => {
                if (el) optionsRef.current[index] = el;
              }}
              className={`cursor-default select-none relative py-2 pl-10 pr-4 ${
                highlightedIndex === index
                  ? "text-white bg-indigo-600"
                  : "text-gray-900"
              }`}
              onClick={() => {
                onSelectCategory(category);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              onKeyDown={(e) => handleOptionKeyDown(e, index)}
            >
              <span
                className={`block truncate ${
                  selectedCategory === category ? "font-medium" : "font-normal"
                }`}
              >
                {category}
              </span>

              {selectedCategory === category && (
                <span
                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                    highlightedIndex === index
                      ? "text-white"
                      : "text-indigo-600"
                  }`}
                >
                  <svg
                    className="h-5 w-5 text-orange-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 011.05.143l-8 10.5a.75.75 0 01-1.14.075l-4.5-4.5a.75.75 0 111.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
