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
  minHeight: 80, // Hauteur minimale
  minWidth: 80,  // Largeur minimale
  [theme.breakpoints.down('md')]: {
    minHeight: 60,
    minWidth: 60,
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: 50,
    minWidth: 50,
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
      border: '4px solid currentColor',
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
  // Les dimensions de l'image sont déterminées par le conteneur
});

const Image = styled('span')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  [theme.breakpoints.down('md')]: {
    fontSize: '0.75rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.6rem',
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
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
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
        minWidth: 300,
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
