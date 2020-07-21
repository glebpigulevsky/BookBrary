import React, { useState } from 'react';
import Switch from 'react-switch';
import locales from '../../translations';

const Footer = ({ onLocalChange }) => {
  const [isEnglish, setIsEnglish] = useState(true);
  const [isLight, setIsLight] = useState(false);
  const [selectedLang, setSelectedLang] = useState('');
  const onChangeLang = (e) => {
    console.log(e);
    if (e) {
      setSelectedLang('EN');
    } else {
      setSelectedLang('RU');
    }

    setIsEnglish(!isEnglish);
  };

  return (
    <div className=' bg-primary'>
      <div className='row container'>
        <div className='col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white'>
          <div className='d-flex justify-content-between  align-items-center'>
            <div className='rights'>
              <p className='h6'>
                © All right Reversed:
                <a
                  className='text-white ml-2'
                  href='https://github.com/CasperCarver'
                  target='_blank'>
                  CasperCarver
                </a>
              </p>
            </div>
            <div className=' mb-1 d-flex  justify-content-between'>
              <div className='d-flex align-items-center'>
                <div className='form-group'>
                  <select
                    className='form-control'
                    id='lang'
                    value={localStorage.getItem('lang')}
                    onChange={(e) => {
                      onLocalChange(e.target.value);
                      localStorage.setItem('lang', e.target.value);
                    }}>
                    <option value={locales.EN}>En</option>
                    <option value={locales.RU}>Ru</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
