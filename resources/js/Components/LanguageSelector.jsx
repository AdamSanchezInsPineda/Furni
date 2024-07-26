import React, { useContext } from 'react';
import Select from 'react-select';
import { LanguageContext } from './LanguageContext';

const LanguageSelector = () => {
    const { selectedLanguage, changeLanguage } = useContext(LanguageContext);

    const languages = [
        { value: 'en', label: <img src="/images/languages/en.png" alt="English" className="w-8 h-8 inline-block" />},
        { value: 'es', label: <img src="/images/languages/es.png" alt="Spanish" className="w-8 h-8 inline-block" />},
    ];

    return (
        <Select
            value={selectedLanguage}
            onChange={changeLanguage}
            options={languages}
            className="w-26"
            components={{ IndicatorSeparator: () => null }}
            styles={{
                control: (provided) => ({
                    ...provided,
                }),
                singleValue: (provided) => ({
                    ...provided,
                    display: 'flex',
                    alignItems: 'center',
                }),
                option: (provided) => ({
                    ...provided,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem',
                }),
            }}
            isSearchable={false}
        />
    );
};

export default LanguageSelector;
