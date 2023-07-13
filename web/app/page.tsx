import { Info } from "./info";
import { Form } from "./form";
import Image from "next/image";
import Webkom from "../public/webkom-logo.png";

export default function Home() {
  return (
    <main
      id="content"
      className="flex min-h-screen flex-col gap-4 max-w-2xl w-full mx-auto md:py-24 py-10 md:px-0 px-4"
    >
      <div className="flex justify-center mb-5">
        <Image
          className="h-40 w-auto"
          src={Webkom}
          alt="Webkom logo"
          height={800}
          width={600}
          quality={100}
        />
      </div>

      <h1 id="info" className="text-3xl font-medium">
        Verv deg til Webkom
      </h1>

      <Info />

      <hr className="my-4" />

      <h2 id="form" className="text-2xl font-medium">
        Søk her!
      </h2>

      <Form />

      <hr className="my-4" />

      <h2 id="contact" className="text-2xl font-medium">
        Kontakt oss
      </h2>

      <p>
        Har du spørsmål om vervet eller søknadsprosessen? Ta kontakt med oss på{" "}
        <a
          className="text-blue-500 underline hover:no-underline"
          href="mailto:webkom-styret@echo.uib.no"
        >
          webkom-styret@echo.uib.no
        </a>
        .
      </p>

      <p>
        Sjekk oss ut på{" "}
        <a
          className="text-blue-500 underline hover:no-underline"
          href="https://github.com/echo-webkom"
        >
          GitHub
        </a>{" "}
        og{" "}
        <a
          className="text-blue-500 underline hover:no-underline"
          href="https://instagram.com/echo_webkom"
        >
          Instagram
        </a>
        .
      </p>

      <a
        className="text-blue-500 underline hover:no-underline mx-auto my-8"
        href="#top"
      >
        Til toppen
      </a>
    </main>
  );
}
