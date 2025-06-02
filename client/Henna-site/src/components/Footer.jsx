import React from "react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#a2ae73] text-sm py-10 rounded-t-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
        {/* Contact Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-full break-words">
          <h4 className="font-serif font-semibold text-lg mb-3">Contact Us</h4>
          <p className="font-mono mb-1 text-base">Email: hasnainandcompany00@gmail.com</p>
          <p className="font-mono text-base">Phone: +92 300 8620642</p>
        </div>

        {/* Social Links Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-full break-words">
          <h4 className="font-serif font-semibold text-lg mb-3">Social Links</h4>
          <p className="italic text-base text-gray-700">Coming Soon</p>
        </div>
      </div>
    </footer>
  );
}
