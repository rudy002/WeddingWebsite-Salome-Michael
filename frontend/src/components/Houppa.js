import translations from '../translation';
import WazeButton from './WazeIcon';

function Houppa(props) {

    const { lang } = props;
    const latitude = 31.912280048519317;
    const longitude = 34.80828788218417;

    return (
        <div className="Houppa">
            <p>{translations[lang].houppaContent1}</p>
            <h1>{translations[lang].date}</h1>
            <h3>{translations[lang].dateHebrew}</h3>
            <h3>{translations[lang].hour1}</h3>
            <h2>{translations[lang].placeHouppa}</h2>

            <WazeButton latitude={latitude} longitude={longitude} />
        </div>
    );

}

export default Houppa;
