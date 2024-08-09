import './App.css';
import Dashboard from './components/Dashboard';
import React from 'react';
import Carousel from './components/Carousel';
import Accueil from './components/Accueil';
import translations from './translation';
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PopUp from './components/PopUp';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import LanguageSwitcher from './components/LanguageSwitcher';

import axios from 'axios';
import { useEffect } from 'react';


function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://wedding-salome-michael.onrender.com/api/data'); // Endpoint sur votre backend
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [showPopUp, setShowPopUp] = useState(true);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [existingPhone, setExistingPhone] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Vérifiez si existingPhone est true, ce qui signifie que le numéro de téléphone a été trouvé
    if (existingPhone) {
      // Fermez la popup en appelant la fonction handleClosePopUp
      handleClosePopUp();
    }
  }, [existingPhone]);

  const handlePhoneNumberChange = (event) => {
    const newPhoneNumber = event.target.value;

    if (!newPhoneNumber || newPhoneNumber.match(/^\d{1,10}$/)) {
      setPhoneNumber(newPhoneNumber);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // Vérifiez si le champ du numéro de téléphone est vide
      if (!phoneNumber) {
        console.log('Le numéro de téléphone est vide.');
        return;
      }

      // Faites une requête HTTP get vers votre backend pour vérifier le numéro de téléphone
      const response = await axios.get(
        `https://wedding-salome-michael.onrender.com/api/check-phone?phoneNumber=${phoneNumber}`
      );

      // Vérifiez la réponse de votre backend
      const data = response.data;
      setExistingPhone(data.found);

      if (response.status === 200 && data.found) {
        console.log('Numéro de téléphone trouvé :', data.found);
        console.log("Détails de l'utilisateur :", data.user);

        // Mettre à jour les détails de l'utilisateur avec les données reçues
        setUserDetails(data.user);
        // Fermez la popup
        handleClosePopUp();
      } else {
        console.log('Numéro de téléphone non trouvé :', data.message);
        
        setExistingPhone(false); // Assurez-vous de mettre à jour existingPhone à false
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de la vérification du numéro de téléphone :",error);
      setExistingPhone(false);
    } finally {
      setLoading(false); // Désactiver le chargement une fois la requête terminée (succès ou échec)
    }
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  const isMobile = window.innerWidth <= 768; // Exemple : considère que tout écran de 768 pixels de large ou moins est un mobile

  const [lang, setLang] = useState('fr');

  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === 'fr' ? 'he' : 'fr')); // Changez la langue de français à hébreu et vice versa
  };

  const theme = createTheme({
    direction: lang === 'he' ? 'rtl' : 'ltr', // Définissez la direction du texte en fonction de la langue
  });

  return (
    <div className="App">
      {showPopUp && (
        <PopUp>
          <div className="popup-content">
            <TextField
              required
              id="phone"
              label={translations[lang].phone}
              variant="outlined"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              // Vous pouvez ajouter des règles de validation ici si nécessaire
            />
            {existingPhone !== null && (
              <p className={existingPhone ? 'phone-found' : 'phone-not-found'}>
                {existingPhone
                  ? 'numero de telephone trouvé/מצאנו את הטלפון'
                  : 'numero de telephone non trouvé/טלפון לא נמצא'}
              </p>
            )}
          </div>
          <div className="validateButton-popup">
            <LoadingButton
              loading={loading}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              <span>Submit</span>
            </LoadingButton>
          </div>
        </PopUp>
      )}
      <header className="App-header">
        Salomé & Michael
        <br />
        סלומה  &  מיכאל
        <ThemeProvider theme={theme}>
          <div className="App">
            {/* Affichez le bouton Switch avec le texte correspondant à la langue actuelle */}
            <FormGroup
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ml: 10,
              }}
            >
              < LanguageSwitcher lang={lang} setLang={setLang} />
            </FormGroup>
          </div>
        </ThemeProvider>
      </header>
      {isMobile ? (
        <div className="component-container">
          <Carousel />
        </div>
      ) : (
        <div className="images-carousel">
          <img
            src="/images/photo1.jpeg"
            className="photo-side"
            alt="pic on side"
          />
          <img src="/images/logo.png" className="App-logo" alt="logo" />
          <img
            src="/images/photo3.jpeg"
            className="photo-side"
            alt="pic on side"
          />
        </div>
      )}

      <div className="main">
        <Accueil lang={lang} />
        <Dashboard lang={lang} userDetails={userDetails} />
      </div>
      <div className="footer"> © Crafted by Rudy Haddad </div>
    </div>
  );
}

export default App;
