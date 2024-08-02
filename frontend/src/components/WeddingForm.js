import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import translations from '../translation';
import Button from '@mui/material/Button';
import axios from 'axios';

function WeddingForm(props) {
  const { lang, userDetails } = props;

  //deboguer

  const [invitePresentHouppa, setInvitePresentHouppa] = React.useState(0);
  const [invitePresentHenne, setInvitePresentHenne] = React.useState(0);
  const [invitePresentChabbat, setInvitePresentChabbat] = React.useState(0);
  const [message, setMessage] = React.useState(''); // État pour le message

  const handleInvitePresentHouppaChange = (event) => {
    setInvitePresentHouppa(event.target.value);
  };

  const handleInvitePresentHenneChange = (event) => {
    setInvitePresentHenne(event.target.value);
  };

  const handleInvitePresentChabbatChange = (event) => {
    setInvitePresentChabbat(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        'https://wedding-salome-michael.onrender.com/api/update-record',
        {
          recordId: userDetails.recordId,
          invitePresentHenne: invitePresentHenne, // Modifier le nom du champ
          invitePresentChabbat: invitePresentChabbat, // Modifier le nom du champ
          invitePresentHouppa: invitePresentHouppa, // Modifier le nom du champ
          MessageMarier: message, // Utiliser le message saisi dans le TextField
        }
      );

      console.log('ici cest response.data : ' + response.data);

      setMessage('');
    } catch (error) {
      console.error(error);
      setMessage(
        "Une erreur s'est produite lors de la mise à jour de l'enregistrement."
      );
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <div>
          <label htmlFor="invitePresentHouppa">
            {translations[lang].nbInviteHouppa}{' '}
          </label>
          <Select
            labelId="invitePresentHouppa"
            id="invitePresentHouppa"
            value={invitePresentHouppa}
            onChange={handleInvitePresentHouppaChange}
            label="Invité présent à la Houppa"
            sx={{ mb: 2 }}
          >
            {[...Array(8).keys()].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </div>

        {userDetails && userDetails.henne !== 0 && (
          <div>
            <label htmlFor="invitePresentHenne">
              {translations[lang].nbInviteHenne}{' '}
            </label>
            <Select
              labelId="invitePresentHenne"
              id="invitePresentHenne"
              value={invitePresentHenne}
              onChange={handleInvitePresentHenneChange}
              label={translations[lang].nbInviteHenne}
              sx={{ mb: 2 }}
            >
              {[...Array(8).keys()].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}

        {userDetails && userDetails.chabbat !== 0 && (
          <div>
            <label htmlFor="invitePresentChabbat">
              {translations[lang].nbInviteChabbat}{' '}
            </label>
            <Select
              labelId="invitePresentChabbat"
              id="invitePresentChabbat"
              value={invitePresentChabbat}
              onChange={handleInvitePresentChabbatChange}
              label="Invité présent au Chabbat"
              sx={{ mb: 2 }}
            >
              {[...Array(8).keys()].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}

        <TextField
          id="message"
          label={translations[lang].messageThanks}
          multiline
          rows={4}
          variant="outlined"
          value = {message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Valider
      </Button>
    </Box>
  );
}

export default WeddingForm;
