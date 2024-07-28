import './Photos.css';
import translations from '../translation';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';

function Photos(props) {
  const { lang } = props;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const handleFileChange = (event) => {
    const filesArray = Array.from(event.target.files);
    const filesWithPreview = filesArray.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedFiles(filesWithPreview);
  };

  const handleUpload = async () => {
    setIsLoading(true); // Activer l'indicateur de chargement
    try {
      // Créez un objet FormData pour envoyer les fichiers sélectionnés
      const formData = new FormData();
      selectedFiles.forEach((fileObj) => {
        formData.append('files', fileObj.file);
      });
  
      // Envoyez les fichiers à votre backend pour les uploader sur Google Drive
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Files uploaded successfully:', response.data);
      setIsLoading(false); // Désactiver l'indicateur de chargement
    } catch (error) {
      console.error('Error uploading files:', error);
      setIsLoading(false);
    }
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <div className="Photos">
      <h1 className="text-photos">{translations[lang].textPhotos1}</h1>
      <h1 className="text-photos">{translations[lang].textPhotos2}</h1>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        className="button-upload"
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          multiple
          on
          onChange={handleFileChange}
        />
      </Button>
      <Box mt={2} mb={2}>
        <Button
          variant="contained"
          onClick={handleUpload}
          className="button-download"
        >
          Download
        </Button>
      </Box>
      {/* Afficher les vignettes des fichiers sélectionnés */}
      {selectedFiles.length > 0 && (
        <Grid container spacing={2} className="photos-grid">
          {selectedFiles.map((fileObj, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={fileObj.preview}
                  alt={`File preview ${index}`}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default Photos;
