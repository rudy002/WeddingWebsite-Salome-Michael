// routes.js

const express = require('express');
const router = express.Router();
const phoneCheckController = require('./controllers/phoneCheckController');
const updateRecordController = require('./controllers/updateRecordController'); // Assurez-vous que le chemin est correct

// Définir les routes pour gérer les invités
router.get('/check-phone', phoneCheckController.checkPhone);
router.patch('/update-record', updateRecordController.updateRecord); // Ajoutez cette ligne

module.exports = router;
