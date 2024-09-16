import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from "react-i18next";
// import { BrowserRouter, Route, Routes as RouteList } from 'react-router-dom';
import Duration from './durationTools';
import InputRow from './components/InputRow';
import { Language, LanguageMap } from './lang';

function App() {
  const MIN_ROW_SIZE: number = 2;
  // const MAX_ROW_SIZE: number = 100;

  const { i18n, t } = useTranslation();

  const [durations, setDurations] = useState<Duration[]>(
    new Array(MIN_ROW_SIZE).fill(null).map(() => new Duration(0, 0, 0, 0))
  );

  const [durationResult, setDurationResult] = useState<Duration>(new Duration(0, 0, 0, 0));

  const [language, setLanguage] = useState<Language>(LanguageMap.ENGLISH);


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

  const handleSelection = (e: ChangeEvent<HTMLSelectElement>): void => {
    const langCode = e.target.value;
    i18n.changeLanguage(langCode);
    setLanguage(LanguageMap[langCode]);
  };

  const durationRows = durations.map((duration: Duration) => {
    return (
      <InputRow key={duration.id} duration={duration} onChange={handleChange} />
    );
  });

  const languageOptions = Object.values(LanguageMap).map((language) => {
    return (
      <option key={language.code} value={language.code}>
        {language.nativeName}
      </option>
    );
  });

  console.log(language?.dir);

  return (
    <main dir={language?.dir || "ltr"}>
      <select defaultValue={"en"} onChange={handleSelection}>
        {languageOptions}
      </select>
      <h1>{t("title")}</h1>
      <h2>{t("subtitle")}</h2>
      <table>
        <thead>
          <tr>
            <th>{t("hours")}</th>
            <th>{t("minutes")}</th>
            <th>{t("seconds")}</th>
            <th>{t("milliseconds")}</th>
            <th>{t("operation")}</th>
            <th>{t("scale")}</th>
          </tr>
        </thead>
        <tbody>
          {durationRows}
        </tbody>
      </table>
      <button onClick={compute}>{t("compute")}</button>
      <p>{t("result", {
        hours: durationResult.hours,
        minutes: durationResult.minutes,
        seconds: durationResult.seconds,
        milliseconds: durationResult.milliseconds
      })}</p>
    </main>
  );

}

export default App;
