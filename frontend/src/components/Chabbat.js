import translations from '../translation';
import WazeButton from './WazeIcon';
import CalendarButton from './CalendarButton';
import './Houppa.css'; // Utilise le même fichier CSS pour les styles

function Chabbat(props) {
  const { lang } = props;
  const latitude = 31.771163354490934; // Modifie si nécessaire
  const longitude = 34.62097222340009; // Modifie si nécessaire

  // Définir les horaires pour le Chabbat (à ajuster selon les besoins)
  const startTime = '20241108T153000Z'; // 8 novembre 2024 à 15:30 UTC
  const endTime = '20241109T190000Z'; // 9 novembre 2024 à 19:00 UTC

  return (
    <div className="Chabbat">
      {' '}
      {/* Utilise la même classe pour le conteneur */}
      <div className="chabbat-image">
        {lang === 'fr' ? (
          <img
            src="/images/ChabbatFR.jpeg" // Assure-toi que le nom du fichier est correct
            alt="Chabbat en Français"
            style={{
              width: '98%',
              maxWidth: '500px',
              margin: '0 auto',
              marginBottom: '8px',
            }}
          />
        ) : (
          <img
            src="/images/ChabbatIL.jpeg" // Assure-toi que le nom du fichier est correct
            alt="Chabbat en Hébreu"
            style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}
          />
        )}
      </div>
      <WazeButton latitude={latitude} longitude={longitude} />
      <CalendarButton
        eventTitle="Chabbat Salome & Michael"
        eventDetails="Join us for the celebration of Chabbat for Salomé and Michael. A night of joy and festivities awaits!"
        startTime={startTime}
        endTime={endTime}
      />
    </div>
  );
}

export default Chabbat;
