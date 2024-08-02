const axios = require('axios');

const Invite = require('../model/inviteModel');
const phone = require('../model/inviteModel');

// Controller for phoneCheck
const checkPhone = async (req, res) => {
    const { phoneNumber, nameGuest, henne, chabbat, recordId} = req.query;

    try {
        // Faites une requête à votre base de données Airtable pour obtenir les enregistrements correspondant au numéro de téléphone
        const response = await axios.get(`https://api.airtable.com/v0/app47u6kE9RFEe6Ke/tblQ7UzdcK7JneN5A?filterByFormula={phoneNumber}='${phoneNumber}'`, {
            headers: {
                Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
            },
        });

        // Vérifiez si des enregistrements ont été trouvés
        const records = response.data.records;
        const isPhoneNumberFound = records && records.length > 0;
        
        if (isPhoneNumberFound) {
            console.log('Numéro de téléphone trouvé backend');
            const recordId = records[0].id; // Récupérez le recordId du premier enregistrement trouvé
            console.log('Record ID:', recordId);
            const record = records[0].fields;  // Supposons que le premier enregistrement trouvé est celui souhaité
            const nameGuest = record.nameGuest;  // Assurez-vous que le champ 'nameGuest' existe dans Airtable
            const henne = record.henne;   // Assurez-vous que le champ 'henne' existe dans Airtable
            const chabbat = record.chabbat;   // Assurez-vous que le champ 'chabbat' existe dans Airtable
            console.log('Nom de l\'invité:', nameGuest);
            
            res.json({ found: true, user: { nameGuest, henne, chabbat, phoneNumber, recordId } });
        } else {
            // Si le numéro de téléphone n'est pas trouvé, ajoutez un nouvel enregistrement
            console.log('Numéro de téléphone non trouvé, ajout d\'un nouvel enregistrement');

            
            res.json({ found: false, message: 'Numéro de téléphone non trouvé' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la recherche du numéro de téléphone.' });
    }
};

module.exports = {
    checkPhone,
};
