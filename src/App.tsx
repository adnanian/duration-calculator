import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from "react-i18next";
import * as dt from './durationTools';
import InputRow from './components/InputRow';
import { Language, LanguageMap } from './lang';

const App = () => {
  const MIN_ROW_SIZE: number = 2, MAX_ROW_SIZE: number = 100;
  const { i18n, t } = useTranslation();
  // Array of durations, scales, and the operands.
  // Must first initialize to null so that id can increment.
  const [calculableArgs, setCalculableArgs] = useState<dt.CalcWrapper[]>(
    Array(MIN_ROW_SIZE).fill(null).map(() => new dt.CalcWrapper('+', new dt.Duration(0, 0, 0, 0)))
  );
  // Computed duration.
  const [durationResult, setDurationResult] = useState<dt.Duration>(new dt.Duration(0, 0, 0, 0));
  // calculable container components
  const calcContainers = calculableArgs.map((calcWrapper) => {
    return (
      <InputRow
        key={calcWrapper.id}
        calcWrapper={calcWrapper}
        onInputChange={handleCalculableChange}
      />
    )
  });


  // Initial language
  const [language, setLanguage] = useState<Language>(LanguageMap.ENGLISH);
  // List of all available languages for this application. See /src/public/i18n
  const languageOptions = Object.values(LanguageMap).map((language) => {
    return (
      <option key={language.code} value={language.code}>
        {language.nativeName}
      </option>
    );
  });

  // Event Listeners

  function handleCalculableChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    type DurationField = 'hours' | 'minutes' | 'seconds' | 'milliseconds';
    type ScaleField = 'value';
    const newWrappers = calculableArgs.map((cw) => {
      if (e.target.id.includes(cw.id.toString())) {
        
        const fieldName: string = e.target.id.substring(0, e.target.id.indexOf('-'));
        let newCW: dt.CalcWrapper = cw.clone();
        if (fieldName === 'operand') {
          const oldOperand = newCW.operand;
          newCW.operand = e.target.value as dt.Operand;
          if ((newCW.operand === '+' || newCW.operand === '-') && (oldOperand === '×' || oldOperand === '÷')) {
            newCW.durationCalculable = new dt.Duration(0, 0, 0, 0) as dt.Duration;
          } else if ((newCW.operand === '×' || newCW.operand === '÷') && (oldOperand === '+' || oldOperand === '-')) {
            newCW.durationCalculable = new dt.Scale(0) as dt.Scale;
          }
        } else {
          // console.log(newCW.durationCalculable instanceof dt.Duration);
          if (newCW.durationCalculable instanceof dt.Duration) {
            newCW.durationCalculable[fieldName as DurationField] = Number.parseInt(e.target.value);
          } else {
            console.log(newCW.durationCalculable instanceof dt.Scale);
            console.log(e.target.value);
            const scale = newCW.durationCalculable as dt.Scale;
            scale.value = Number.parseFloat(e.target.value);
            newCW.durationCalculable = scale;
          }
          console.log(newCW.durationCalculable);
        }
        return newCW;
      } else {
        return cw;
      }
    });
    setCalculableArgs(newWrappers);
  }

  function compute(): void {

  }

  /**
   * Sets the new language of the application and refreshes the page in that
   * language.
   * 
   * @param e the event.
   */
  function handleLanguageSelection(e: ChangeEvent<HTMLSelectElement>): void {
    const langCode = e.target.value;
    i18n.changeLanguage(langCode);
    setLanguage(LanguageMap[langCode]);
  };

  return (
    <main dir={language?.dir || "ltr"}>
      <select defaultValue={"en"} onChange={handleLanguageSelection}>
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
          {calcContainers}
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
  )
}

export default App;
