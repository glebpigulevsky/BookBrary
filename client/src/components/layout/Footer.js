import React, { useState } from 'react';
import Switch from 'react-switch';

const Footer = () => {
  const [isEnglish, setIsEnglish] = useState(true);
  const [isLight, setIsLight] = useState(false);

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
                <span>Theme: </span>
                <Switch
                  checked={isEnglish}
                  onChange={(e) => setIsEnglish(!isEnglish)}
                  className='react-switch'
                  onColor='#86d3ff'
                  onHandleColor='#2693e6'
                  handleDiameter={20}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
                  activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
                  height={20}
                  width={48}
                />
              </div>
              <div className='ml-3 d-flex align-items-center'>
                <span>Lang: </span>
                <Switch
                  checked={isLight}
                  onChange={(e) => setIsLight(!isLight)}
                  className='react-switch'
                  onColor='#86d3ff'
                  onHandleColor='#2693e6'
                  handleDiameter={20}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
                  activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
                  height={20}
                  width={48}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
