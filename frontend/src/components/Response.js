import WeddingForm from "./WeddingForm";

function Response(props) {

    const { lang, userDetails } = props;

  return (
    <div>
        <WeddingForm lang={lang} userDetails={props.userDetails} />
    </div>
  );
}

export default Response;