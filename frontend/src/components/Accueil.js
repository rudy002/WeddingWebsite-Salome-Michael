import './Accueil.css';
import translations from '../translation';

function Accueil(props) {
  const { lang, userDetails } = props;
  console.log('component accueil : ', userDetails);

  if (!userDetails) {
    // Affiche un message ou rien du tout si userDetails est null
    return <div>Chargement des informations...</div>;
  }

  return (
    <div className="Accueil">
      <div className="container-nomInvite">
        <h2>
          {translations[lang].welcome} {userDetails.nameGuest}
        </h2>

        <hr className="divider" />
      </div>
      {/* <div className="parents">
        <div className="container-parent">
          <p>{translations[props.lang].parentNameHaddad}</p>
          <p>{translations[props.lang].grandParentHaddad}</p>
        </div>

        <div className="container-parent">
          <p>{translations[props.lang].parentNameBatach}</p>
        </div>
      </div> */}

      <div className="introduction">
        {/* <p>{translations[props.lang].introduction}</p> */}
        <h1 className="wedding-name">Salomé & Michael</h1>
      </div>

      {/* <div className="memory">
      <p>{translations[props.lang].memory}</p>
    </div>
    <div className="grandparents">
      <div className="container-grandparents">
        <p>{translations[props.lang].grandParentHaddad2}</p>
      </div>
      <div className="container-grandparents">
        <p>{translations[props.lang].grandParentBatach2}</p>
      </div>
      
    </div> */}

      <hr className="divider" />
    </div>
  );
}

export default Accueil;
