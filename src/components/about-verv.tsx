"use client";

import { useState } from "react";

const text = `Vi er veldig glade for å ønske alle nye studenter velkommen til echo. Echo er linjeforeningen
  for informatikk, og vi består av 7 unike undergrupper som dekker et bredt spekter av
  interesser og aktiviteter. Alle informatikk studenter er automatisk med i echo, men verv i
  echo betyr å være med i en av di 7 gruppene! Ved å ha verv i echo, får du muligheten til å
  være med på å skape et godt miljø for informatikkstudenter, arrangere forskjellige typer
  arrangementer og masse mer! Som medlem av Echo har du muligheten til å delta i spennende
  prosjekter, delta på sosiale arrangementer, og knytte verdifulle kontakter både faglig og
  sosialt.`;

export const AboutVerv = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const getDisplayedText = () => {
    if (isExpanded) {
      return text;
    }
    return text.split(" ").slice(0, 50).join(" ") + "...";
  };

  return (
    <div>
      <p>{getDisplayedText()}</p>
      <button
        onClick={toggleExpansion}
        className="mt-2 text-blue-500 hover:underline focus:outline-none"
      >
        {isExpanded ? "Vis mindre" : "Vis mer"}
      </button>
    </div>
  );
};
