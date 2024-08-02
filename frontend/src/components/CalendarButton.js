import "./CalendarButton.css";
import React from 'react';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';

// Icône Google Calendar personnalisée
function CalendarIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M16 0h-1v2H9V0H8v2H6V0H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 18H4v-1h12v1zm0-3H4v-1h12v1zm0-3H4v-1h12v1zm4-4H4V3h16v2z"/>
        </SvgIcon>
    );
}

function CalendarButton({ eventTitle, eventDetails, startTime, endTime }) {
    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&details=${encodeURIComponent(eventDetails)}&dates=${startTime}/${endTime}`;

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<CalendarIcon />}
            onClick={() => window.open(calendarUrl, '_blank')}
            >
            Add to Calendar
        </Button>
    );
}

export default CalendarButton;
