const axios = require('axios');

// Controller for updating a record in Airtable
const updateRecord = async (req, res) => {
    const { recordId, invitePresentHouppa, invitePresentHenne, invitePresentChabbat, MessageMarier } = req.body; // Ajoutez les champs que vous souhaitez mettre à jour
    console.log('Record ID from controller:', recordId);

    try {
        // Faites une requête PATCH à Airtable pour mettre à jour l'enregistrement
        const response = await axios.patch(`https://api.airtable.com/v0/app47u6kE9RFEe6Ke/tblQ7UzdcK7JneN5A/${recordId}`, 
        {
            fields: {
                invitePresentHouppa,
                invitePresentHenne,
                invitePresentChabbat,
                MessageMarier
            }
        }, 
        {
            headers: {
                Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            },
        });

        const updatedRecord = response.data;
        console.log('Enregistrement mis à jour:', updatedRecord);

        res.json({ message: 'Enregistrement mis à jour avec succès', user: updatedRecord.fields });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour de l\'enregistrement.' });
    }
};

module.exports = {
    updateRecord,
};
