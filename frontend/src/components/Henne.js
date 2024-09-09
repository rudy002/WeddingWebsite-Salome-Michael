import translations from '../translation';
import WazeButton from './WazeIcon';
import CalendarButton from './CalendarButton';

function Henne(props) {
  const { lang } = props;
  const latitude = 31.813827988755317;
  const longitude = 34.64155059785392;

  const startTime = '20241104T193000Z'; // 6 novembre 2024 à 19:30 UTC
  const endTime = '20241104T233000Z'; // Exemple de fin d'événement à 20:30 UTC

  return (
    <div className="Henne">
      {/* <p>{translations[lang].introductionHenne}</p>
      <h1>{translations[lang].dateHenne}</h1>
      <h3>{translations[lang].dateHebrewHenne}</h3>
      <h3>{translations[lang].hourHenne}</h3>
      <h3 style={{ marginBottom: '5px' }}>
        {translations[lang].introPlaceHenne}
      </h3>
      <h2 style={{ marginTop: '0' }}>{translations[lang].placeHenne}</h2> */}

      <div className="Henne-image">
        {lang === 'fr' ? (
          <img
            src="/images/HenneFR.jpeg"
            alt="Houppa en Français"
            style={{
              width: '98%',
              maxWidth: '500px',
              margin: '0 auto',
              marginBottom: '2px',
            }}
          />
        ) : (
          <img
            src="/images/HenneIL.jpeg"
            alt="Houppa en Hébreu"
            style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}
          />
        )}
      </div>

      <WazeButton latitude={latitude} longitude={longitude} />
      <CalendarButton
        eventTitle="Henne Salome & Michael"
        eventDetails="Join us for the celebration of Henne for Salomé and Michael. A night of joy and festivities awaits!"
        startTime={startTime}
        endTime={endTime}
      />
    </div>
  );
}

export default Henne;
