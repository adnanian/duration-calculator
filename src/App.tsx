import React, { ChangeEvent, useState } from 'react';
import Duration from './Duration';

function App() {
  const MIN_ROW_SIZE: number = 2;
  const MAX_ROW_SIZE: number = 100;

  const [durations, setDurations] = useState<Duration[]>(
    new Array(MIN_ROW_SIZE).fill(null).map(() => new Duration(0, 0, 0, 0))
  );

  console.log(durations);
  console.log(Duration.idIncrement);


  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    type DurationField = 'hours' | 'minutes' | 'seconds' | 'milliseconds';

    const newDurations = durations.map((duration: Duration) => {
      if (e.target.id.includes(duration.id.toString())) {
        // Extract the field name from the ID
        const fieldName: string = e.target.id.substring(0, e.target.id.indexOf('-'));
        
        // Create a new Duration object with updated field
        const newDuration = { ...duration };
        
        // Use type assertion to ensure fieldName is a valid key of Duration
        newDuration[fieldName as DurationField] = Number(e.target.value);  // Assuming value needs to be a number
        
        return newDuration;
      } else {
        return duration;
      }
    });

    setDurations(newDurations);
  };

  const durationRows = durations.map((duration: Duration) => {
    return (
      <div key={duration.id}>
        <input
          id={`hours-${duration.id}`}
          type="number"
          min="0"
          step="1"
          value={duration.hours}
          onChange={handleChange}
        />
        <input
          id={`minutes-${duration.id}`}
          type="number"
          min="0"
          max="59"
          step="1"
          value={duration.minutes}
          onChange={handleChange}
        />
        <input
          id={`seconds-${duration.id}`}
          type="number"
          min="0"
          max="59"
          step="1"
          value={duration.seconds}
          onChange={handleChange}
        />
        <input
          id={`milliseconds-${duration.id}`}
          type="number"
          min="0"
          max="999"
          step="1"
          value={duration.milliseconds}
          onChange={handleChange}
        />
      </div>
    );
  })

  return (
    <main>
      <h1>Duration Calculator</h1>
      <h2>A simple tool to calculate your durations irrespective of time.</h2>
      <ul>
        {durationRows}
      </ul>
    </main>
  );
}

export default App;
