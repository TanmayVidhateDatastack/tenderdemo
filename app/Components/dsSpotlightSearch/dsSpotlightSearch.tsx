
'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import searchicon from "../../Icons/searchicon.svg";
import styles from "./dsSpotlightSearch.module.css"

interface SpotlightSearchProps {
  data: string[];
  onClose: () => void
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onkeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputId: string;
  label?: string;
  disable?: boolean
  spotlightId: string;
  className: string;
  customAttributes?: Record<string, string>;
}

const SpotlightSearch: React.FC<SpotlightSearchProps> = ({
  handleKeyUp,
  data,
  customAttributes,
  placeholder = "clt+k",
  disable,
  inputId,
  className,
}) =>
   {
  {
    const [isSearchOpen, setSearchOpen] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredResults, setFilteredResults] = useState<string[]>([]);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.key === 'k') {
          event.preventDefault();
          setSearchOpen((prev) => !prev);
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, []);


    useEffect(() => {
      if (searchTerm) {
        const results = data.filter(item =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredResults(results);
      } else {
        setFilteredResults([]);
      }
    }, [searchTerm, data]);




    return (
      <>
        {!isSearchOpen && (
          <Image src={searchicon} alt="addicon" onClick={() => setSearchOpen(true)} />

        )}
        {isSearchOpen && (

          <div>
            <div className={styles["input-wrapper"]}>
              <div className={`${styles.icon_left} ${styles.iconwrapper}`}>
                <div>
                </div>

                <Image src={searchicon} alt="addicon" onClick={() => setSearchOpen(true)} />
              </div>


              {isSearchOpen && (

                <div className={styles.overlay}  >

                  <input
                    type="text"
                    onClick={() => setSearchOpen(true)}
                    value={searchTerm}

                    onChange={(e) =>
                      setSearchTerm(e.target.value)

                    }
                    autoFocus
                    className={`${styles["custom-input"]}  ${className || ""}`}

                    onKeyUp={handleKeyUp}
                    disabled={disable}
                    onFocus={() => {
                      setIsFocused(true);
                    }}
                    onBlur={(e) => {
                      if (e.target.value.trim() == "")
                        setSearchOpen(false);
                    }}

                    placeholder={placeholder}

                    {...(customAttributes && {
                      ...Object.keys(customAttributes)?.reduce((acc, key) => {
                        acc[`data-${key}`] = customAttributes[key];
                        return acc;
                      }, {} as Record<string, string | number | boolean>),
                    })}
                    id={inputId}

                  />

                  <ul>
                    {filteredResults.map((result, index) => (
                      <li key={index}>{result}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
};
export default SpotlightSearch;











