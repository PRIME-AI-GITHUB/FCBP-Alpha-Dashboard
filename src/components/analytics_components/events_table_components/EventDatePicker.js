import React from 'react'
import { useState, useCallback } from 'react'
import { DatePicker } from "@shopify/polaris";

function EventDatePicker({sendDataToParent}) {

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    let start_date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [{month, year}, setDate] = useState({month: currentMonth, year: currentYear});
    const [selectedDates, setSelectedDates] = useState({
      start: start_date,
      end: new Date(Date.now()),
    });
  
    // date.sendData(date);
    // props.date(selectedDates)

    const handleMonthChange = useCallback(
      (month, year) => setDate({month, year}),
      [],
    );

    const handleDateChange = (data) => { 
      setSelectedDates(data);
      sendDataToParent(data);
    };
  
    return (
      <div>
      <DatePicker
        month={month}
        year={year}
        onChange={handleDateChange}
        onMonthChange={handleMonthChange}
        selected={selectedDates}
        allowRange
      />
      </div>
    );
  }

export default EventDatePicker