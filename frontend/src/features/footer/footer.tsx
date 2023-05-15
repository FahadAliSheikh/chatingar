import React from "react";
import { useNavigate } from "react-router-dom";

export function Footer() {
  let year = new Date().getFullYear();
  const navigate = useNavigate();
  return (
    <footer className="bg-pink-500 text-xl text-white " id="footer">
      <section className="mx-auto flex max-w-4xl flex-col p-4 sm:flex-row sm:justify-between">
        {/* <address>
          <h2>Acme Rocket-Powered Products, Inc.</h2>
          555 Astro Way
          <br />
          Fairfield, New Jersey 12345-5555
          <br />
          Email:
          <a href="mailto:inquiries@acmerockets.com">
            Inquires@AcmeRockets.com
          </a>
          <br />
          Phone: <a href="tel:+15555555555">(555) 555-5555</a>
        </address> */}
        <nav className="flex flex-col gap-2 md:flex py-5" aria-label="footer">
          <a href="/safety" className="hover:opacity-90">
            SAFETY
          </a>
          {/* <a href="#" className="hover:opacity-90">
            PRIVACY
          </a>
          <a href="#" className="hover:opacity-90">
            Cookies POLICY
          </a> */}
          <a href="/frequely-asked" className="hover:opacity-90">
            FAQs
          </a>
          <a href="/contact" className="hover:opacity-90">
            CONTACT US
          </a>
        </nav>
        <div className="flex flex-col sm:gap-2">
          <p className="text-right">
            Copyright &copy; <span id="year">{year}</span>
          </p>
          <p className="text-right">All Rights Reserved</p>
        </div>
      </section>
    </footer>
  );
}
