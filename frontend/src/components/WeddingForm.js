import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import translations from '../translation';
import LoadingButton from '@mui/lab/LoadingButton';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function WeddingForm(props) {
  const { lang, userDetails } = props;

  const [invitePresentHouppa, setInvitePresentHouppa] = React.useState(0);
  const [invitePresentHenne, setInvitePresentHenne] = React.useState(0);
  const [invitePresentChabbat, setInvitePresentChabbat] = React.useState(0);
  const [message, setMessage] = React.useState(''); // État pour le message
  const [willAttend, setWillAttend] = React.useState('oui'); // État pour la réponse à "Est-ce que vous viendrez ?"
  const [isLoading, setIsLoading] = React.useState(false);

  //pour le success de la validation
const [openSnackbar, setOpenSnackbar] = React.useState(false);
const [snackbarMessage, setSnackbarMessage] = React.useState('');


  const handleInvitePresentHouppaChange = (event) => {
    setInvitePresentHouppa(event.target.value);
  };

  const handleInvitePresentHenneChange = (event) => {
    setInvitePresentHenne(event.target.value);
  };

  const handleInvitePresentChabbatChange = (event) => {
    setInvitePresentChabbat(event.target.value);
  };

  const handleWillAttendChange = (event) => {
    const value = event.target.value;
    setWillAttend(value);
    if (value === 'non') {
      setInvitePresentHouppa(0);
      setInvitePresentHenne(0);
      setInvitePresentChabbat(0);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        'https://wedding-salome-michael.onrender.com/api/update-record',
        {
          recordId: userDetails.recordId,
          invitePresentHenne: invitePresentHenne,
          invitePresentChabbat: invitePresentChabbat,
          invitePresentHouppa: invitePresentHouppa,
          MessageMarier: message,
        }
      );

      setSnackbarMessage(translations[lang].successMessage);
      setOpenSnackbar(true);
      setMessage('');
    } catch (error) {
      console.error(error);
      setSnackbarMessage(translations[lang].failedMessage);
      setOpenSnackbar(true);
      setMessage(
        "Une erreur s'est produite lors de la mise à jour de l'enregistrement."
      );
    } finally {
      setIsLoading(false);
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
          <label htmlFor="willAttend">
            {translations[lang].willAttend}
          </label>
        <RadioGroup
          aria-label="willAttend"
          name="willAttend"
          value={willAttend}
          onChange={handleWillAttendChange}
          row
          sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}
          >
          <FormControlLabel value="oui" control={<Radio />} label={translations[lang].responseYES} />
          <FormControlLabel value="non" control={<Radio />} label={translations[lang].responseNO} />
        </RadioGroup>
        </div>
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
            disabled={willAttend === 'non'}
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
              disabled={willAttend === 'non'}
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
              disabled={willAttend === 'non'}
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
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>
      <LoadingButton
        variant='contained'
        color='primary'
        onClick={handleSubmit}
        loading={isLoading}
        loadingPosition="center"
        
      
      >
        {translations[lang].validation}
      </LoadingButton>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarMessage.includes('erreur') ? 'error' : 'success'}>
          
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default WeddingForm;
