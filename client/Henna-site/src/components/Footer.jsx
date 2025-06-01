export default function Footer() {
  return (
    <footer id="contact" className="bg-[#a2ae73] text-sm py-14 rounded-t-2xl">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col items-center md:items-start max-w-md mx-auto md:mx-0">
          <h4 className="font-serif font-semibold text-lg mb-4">Contact Us</h4>
          <p className="font-mono mb-2 text-base">Email: hasnainandcompany00@gmail.com</p>
          <p className="font-mono text-base">Phone: +92 300 8620642</p>
        </div>
        <div className="flex flex-col items-center md:items-start max-w-md mx-auto md:mx-0">
          <h4 className="font-serif font-semibold text-lg mb-4">Social Links</h4>
          <p className="italic text-base text-gray-700">Coming Soon</p>
        </div>
      </div>
    </footer>
  );
}
