import translations from '../translation';
import WazeButton from './WazeIcon';
import CalendarButton from './CalendarButton';

function Houppa(props) {
  const { lang } = props;
  const latitude = 31.912280048519317;
  const longitude = 34.80828788218417;

  const startTime = '20241106T193000Z'; // 6 novembre 2024 à 19:30 UTC
  const endTime = '20241106T233000Z'; // Exemple de fin d'événement à 20:30 UTC

  return (
    <div className="Houppa">
      <p>{translations[lang].houppaContent1}</p>
      <h1>{translations[lang].date}</h1>
      <h3>{translations[lang].dateHebrew}</h3>
      <h3>{translations[lang].hour1}</h3>
      <h3 style={{ marginBottom: '5px' }} className="placeHouppa">
        {translations[lang].introPLaceHouppa}
      </h3>
      <h2 style={{ marginTop: '0' }}>{translations[lang].placeHouppa}</h2>

      <WazeButton latitude={latitude} longitude={longitude} />
      <CalendarButton
        eventTitle="Houppa Salome & Michael"
        eventDetails="Join us for the celebration of Houppa for Salomé and Michael. A night of joy and festivities awaits!"
        startTime={startTime}
        endTime={endTime}
      />
    </div>
  );
}

export default Houppa;
