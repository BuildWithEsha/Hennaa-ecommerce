import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <div className="bg-[#e6f7e2] min-h-screen px-6 md:px-20 py-4 flex flex-col justify-between scroll-smooth">
        <Header />
        <main className="flex-grow">
          <section
            data-aos="fade-up"
            className="flex flex-col md:flex-row items-center justify-center gap-18 p-8 mt-18 outline-1 outline-[#a2ae73] rounded-3xl shadow-xl shadow-[#7b845b] m-8"
          >
            <div
              className="flex flex-col text-center md:text-left text-[#5a6341] max-w-md"
              data-aos="fade-right"
            >
              <h1 className="text-2xl md:text-3xl font-bold mb-3">
                Celebrate Your Culture with Traditional Henna
              </h1>
              <p className="text-base md:text-lg leading-relaxed">
                Handmade with love, rooted in tradition, perfect for every celebration. Our henna brings heritage to your hands with beauty and care.
              </p>
            </div>

            <img
              src="/hands.png"
              alt="Henna Hands"
              className="w-40 md:w-64"
              data-aos="fade-left"
            />
          </section>

          <section
            id="about"
            data-aos="fade-up"
            className="text-center mt-25 px-4 md:px-20 mb-18"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-[#5a6341] mb-6">
              About Us
            </h2>
            <p className="max-w-3xl mx-auto text-gray-700 text-base md:text-lg leading-relaxed">
              At <strong>Henna</strong>, we are committed to preserving the rich cultural heritage of henna artistry. Our products are made using traditional methods and natural ingredients, ensuring a safe and authentic experience. Whether you're preparing for a wedding, a festival, or simply celebrating yourself, our henna is crafted to honor your roots and beautify your moments. 
              <br /><br />
              We believe in slow, mindful beauty. Every batch is handmade with love and precision, connecting generations through the language of art.
            </p>
          </section>
        </main>
      </div>

      <div id="contact">
        <Footer />
      </div>
    </>
  );
}
