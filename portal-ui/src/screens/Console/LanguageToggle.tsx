import React from "react";
import Button from '@mui/material/Button'
import i18next from 'i18next'

//refactor to drop down if more than 2 languages are needed

const LanguageToggle = () => {
  return (
    <Button
    onClick={() => { 
        var lng = i18next.language === 'fr'? 'en': 'fr'
        i18next.changeLanguage(lng)
    }}
      color={"secondary"}
      variant="outlined"
      id="toggle"
      className="mt-1">
        {i18next.language === 'fr'? 'en': 'fr'}
      </Button>
  );
};

export default LanguageToggle;