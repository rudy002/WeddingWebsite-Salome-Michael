import WeddingForm from "./WeddingForm";

function Response(props) {

    const { lang, userDetails } = props;

  return (
    <div>
      <h1>Response</h1>
        <WeddingForm lang={lang} userDetails={props.userDetails} />
    </div>
  );
}

export default Response;