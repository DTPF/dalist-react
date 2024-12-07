import { useContext, useEffect } from 'react';
import UserContext from 'context/user/UserContext';
import { useTranslation } from 'react-i18next';
import './language.scss';

const languages = [
  { code: 'en', native: '🇬🇧' },
  { code: 'es', native: '🇪🇸' },
];

const Language = () => {
  const { i18n } = useTranslation();
  const { dbUser, changeLanguage: changeLanguageAPI } = useContext(UserContext);

  useEffect(() => {
    let isMounted = true;
    isMounted && i18n.changeLanguage(dbUser.appInfo.language);
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbUser.appInfo.language]);

  const handleTrans = (code: string) => {
    changeLanguageAPI({ language: code });
    i18n.changeLanguage(code);
    document.documentElement.setAttribute('lang', code);
  };

  return (
    <div className="language">
      {languages.map((lng) => {
        const { code, native } = lng;
        return (
          <div
            key={code}
            className={dbUser.appInfo.language === code ? 'active' : ''}
            onClick={() => handleTrans(code)}
          >
            {native}
          </div>
        );
      })}
    </div>
  );
};

export default Language;
