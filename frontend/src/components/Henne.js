import translations from "../translation";
import WazeButton from "./WazeIcon";

function Henne(props) {

    const { lang } = props;
    const latitude = 31.813827988755317;
    const longitude = 34.64155059785392;

    return (
        <div className="Henne">
            
            <p>{translations[lang].introductionHenne}</p>
            <h1>{translations[lang].dateHenne}</h1>
            <h3>{translations[lang].dateHebrewHenne}</h3>
            <h3>{translations[lang].hourHenne}</h3>
            <h2>{translations[lang].placeHenne}</h2>
            <WazeButton latitude={latitude} longitude={longitude} />



            
        </div>
    );

}

export default Henne;