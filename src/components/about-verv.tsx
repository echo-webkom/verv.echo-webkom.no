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
  }

  const getDisplayedText = () => {
    if (isExpanded) {
      return text;
    }
    return text.split(" ").slice(0, 50).join(" ") + '...';
  }

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
    // <h3 className="">
    //   Vi er veldig glade for å ønske alle nye studenter velkommen til echo. Echo er linjeforeningen
    //   for informatikk, og vi består av 7 unike undergrupper som dekker et bredt spekter av
    //   interesser og aktiviteter. Alle informatikk studenter er automatisk med i echo, men verv i
    //   echo betyr å være med i en av di 7 gruppene! Ved å ha verv i echo, får du muligheten til å
    //   være med på å skape et godt miljø for informatikkstudenter, arrangere forskjellige typer
    //   arrangementer og masse mer! Som medlem av Echo har du muligheten til å delta i spennende
    //   prosjekter, delta på sosiale arrangementer, og knytte verdifulle kontakter både faglig og
    //   sosialt.{" "}
    //   {showMore ? (
    //     <>
    //       <br />
    //       <br />
    //       <span>Her kan du lese mer om hva echo har å tilby og hvordan du kan bli med:</span>
    //       <br />
    //       <span>
    //         - Undergrupper: Vi har 7 undergrupper som dekker ulike interesser og aktiviteter. Du kan
    //         bli med i en eller flere av disse gruppene og delta i deres arrangementer og prosjekter.
    //       </span>
    //       <br />
    //       <span>
    //         - Arrangementer: Vi arrangerer både faglige og sosiale arrangementer gjennom hele året.
    //         Du kan delta på disse arrangementene og bli kjent med andre studenter.
    //       </span>
    //       <br />
    //       <span>
    //         - Kontaktnett: Som medlem av echo får du muligheten til å knytte verdifulle kontakter
    //         både faglig og sosialt. Du kan møte andre studenter, alumni og bedriftsrepresentanter.
    //       </span>
    //     </>
    //   ) : (
    //     <button onClick={() => setShowMore(true)}>Les mer</button>
    //   )}
    // </h3>
    // <div className="mx-auto w-1/2">
    //   <h1>Om verv</h1>
    //   <p>
    //     Verv er en viktig del av linjeforeningen. Det er gjennom verv at vi kan drive linjeforeningen og skape et godt miljø for studentene.
    //   </p>
    //   <p>
    //     Vervene er delt inn i to kategorier: undergrupper og hovedstyrer. Undergruppene er de som arrangerer arrangementer og aktiviteter for studentene, mens hovedstyrer er de som styrer linjeforeningen og sørger for at alt går som det skal.
    //   </p>
    //   <p>
    //     Hvis du har lyst til å engasjere deg i linjeforeningen, er verv en flott måte å gjøre det på. Du kan melde deg på verv når som helst, og vi vil alltid ha bruk for flere folk.
    //   </p>
    // </div>
  );
};
