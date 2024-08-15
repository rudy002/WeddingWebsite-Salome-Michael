import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
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

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 60, // Hauteur minimale réduite
  minWidth: 60,  // Largeur minimale réduite
  [theme.breakpoints.down('md')]: {
    minHeight: 50, // Hauteur pour écrans moyens
    minWidth: 50,
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: 40, // Hauteur pour petits écrans
    minWidth: 40,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '3px solid currentColor', // Ajustement des bordures pour survol
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'contain', // Ajuste l'image pour qu'elle soit entièrement visible
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

const Image = styled('span')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  [theme.breakpoints.down('md')]: {
    fontSize: '0.7rem', // Taille de police pour écrans moyens
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.5rem', // Taille de police pour petits écrans
  },
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 2, // Réduction de la hauteur de la marque
  width: 14, // Réduction de la largeur de la marque
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 7px)',
  transition: theme.transitions.create('opacity'),
}));

export default function LanguageSwitcher({ lang, setLang }) {
  const toggleLanguage = (selectedLang) => {
    setLang(selectedLang);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 1,
        minWidth: 250, // Largeur minimale ajustée
        width: '100%',
      }}
    >
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          onClick={() => toggleLanguage(image.lang)}
          sx={{
            height: 'auto', // Hauteur automatique en fonction du contenu
            width: 'auto',  // Largeur automatique en fonction du contenu
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 1,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
}
