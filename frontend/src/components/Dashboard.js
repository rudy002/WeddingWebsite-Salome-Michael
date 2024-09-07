import React, { useState } from 'react';
import './Dashboard.css';
import Houppa from './Houppa.js';
import Henne from './Henne.js';
import Response from './Response.js';
import translations from '../translation';
import Photos from './Photos.js';
import { ButtonGroup, Button, Box } from '@mui/material';

function Dashboard(props) {
  const { lang, userDetails } = props;

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const buttons = [
    <Button key="one">{translations[lang].buttonHouppa}</Button>,
    <Button key="two">{translations[lang].buttonHenne}</Button>,
    <Button key="three">{translations[lang].buttonChabbat}</Button>,
    <Button key="four">{translations[lang].buttonResponse}</Button>,
    <Button key="five">{translations[lang].buttonPhotos}</Button>,
  ];

  return (
    <div className="Dashboard">
      <div className="Tabs">
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
        >
          <ButtonGroup
            className="ButtonGroup"
            disableElevation
            size="large"
            aria-label="disable Large button group"
            variant="contained"
            sx={{ 
              '& .MuiButton-root': {
                backgroundColor: '#e3d5ca',
                color: 'black',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#d5bdaf', // une couleur plus foncée pour l'état survolé
                },
              }
            }}
          >
            <Button onClick={() => handleTabClick(1)} className="tab-name">
              {translations[lang].buttonHouppa}
            </Button>

            {userDetails && userDetails.henne !== 0 && (
              <Button onClick={() => handleTabClick(2)} className="tab-name">
                {translations[lang].buttonHenne}
              </Button>
            )}

            {userDetails && userDetails.chabbat !== 0 && (
              <Button onClick={() => handleTabClick(3)} className="tab-name">
                {translations[lang].buttonChabbat}
              </Button>
            )}

            <Button onClick={() => handleTabClick(4)} className="tab-name">
              {translations[lang].buttonResponse}
            </Button>

            <Button onClick={() => handleTabClick(5)} className="tab-name">
              {translations[lang].buttonPhotos}
            </Button>
          </ButtonGroup>
        </Box>
      </div>

      <div className="TabContent">
        {activeTab === 1 && <Houppa lang={props.lang} />}
        {activeTab === 2 && <Henne lang={props.lang} />}
        {activeTab === 3 && <div>Contenu du Tab 3</div>}
        {activeTab === 4 && (
          <div>
            <Response lang={props.lang} userDetails={props.userDetails} />
          </div>
        )}
        {activeTab === 5 && (
          <div>
            <Photos lang={props.lang} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
