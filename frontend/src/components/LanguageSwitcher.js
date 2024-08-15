import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

const images = [
  {
    url: '/images/israel-flag.png',
    title: 'עברית',
    lang: 'he',
  },
  {
    url: '/images/france-flag.png',
    title: 'Français',
    lang: 'fr',
  },
];

// Composant styled pour le drapeau
const Flag = styled('img')(({ theme }) => ({
  width: 24,
  height: 24,
  marginRight: theme.spacing(1),
}));

export default function LanguageSwitcher({ lang, setLang }) {
  const handleChange = (event) => {
    setLang(event.target.checked ? 'fr' : 'he');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      {/* Label Hébreu avec drapeau */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Flag src={images[0].url} alt={images[0].title} />
        <Typography variant="subtitle1">{images[0].title}</Typography>
      </Box>

      {/* Switch MUI */}
      <Switch
        checked={lang === 'fr'}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'language switch' }}
      />

      {/* Label Français avec drapeau */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Flag src={images[1].url} alt={images[1].title} />
        <Typography variant="subtitle1">{images[1].title}</Typography>
      </Box>
    </Box>
  );
}
