import React, { ChangeEvent, useState } from 'react';
// import { BrowserRouter, Route, Routes as RouteList } from 'react-router-dom';
import Duration from './durationTools';
import InputRow from './components/InputRow';
import ArabicMode from './lang-pages/ArabicMode';

function App() {
  const MIN_ROW_SIZE: number = 2;
  const MAX_ROW_SIZE: number = 100;

  const [durations, setDurations] = useState<Duration[]>(
    new Array(MIN_ROW_SIZE).fill(null).map(() => new Duration(0, 0, 0, 0))
  );

  const [durationResult, setDurationResult] = useState<Duration>(new Duration(0,0,0,0));

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    type DurationField = 'hours' | 'minutes' | 'seconds' | 'milliseconds';

    const newDurations = durations.map((duration: Duration) => {
      if (e.target.id.includes(duration.id.toString())) {
        // Extract the field name from the ID
        const fieldName: string = e.target.id.substring(0, e.target.id.indexOf('-'));
        
        // Create a new Duration object with updated field
        const newDuration = duration.clone();
        
        // Use type assertion to ensure fieldName is a valid key of Duration
        newDuration[fieldName as DurationField] = Number(e.target.value);  // Assuming value needs to be a number
        
        return newDuration;
      } else {
        return duration;
      }
    });
    setDurations(newDurations);
    console.log('Handlechange working.');
  };

  const compute = (): void => {
    setDurationResult(durations[0].minus(durations[1]));
  }

  const durationRows = durations.map((duration: Duration) => {
    return (
      <InputRow key={duration.id} duration={duration} onChange={handleChange}/>
    );
  })

  return (
    <main>
      <h1>Duration Calculator</h1>
      <h2>A simple tool to calculate your durations irrespective of time.</h2>
      <table>
        <thead>
          <tr>
            <th>Hours</th>
            <th>Minutes</th>
            <th>Seconds</th>
            <th>Milliseconds</th>
            <th>Operation</th>
            <th>Scale</th>
          </tr>
        </thead>
        <tbody>
          {durationRows}
        </tbody>
      </table>
      <button onClick={compute}>Compute</button>
      <p>Result: {durationResult.toReadable()}</p>
      <ArabicMode/>
    </main>
  );

}

export default App;
