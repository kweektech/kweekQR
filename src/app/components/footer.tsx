export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-black mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="rounded-2xl border border-white/30 bg-white/20 backdrop-blur-md px-6 py-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <img
                src="/logo.svg"
                alt="KweekTech"
                className="h-12 w-auto mb-3"
              />
              <h3 className="text-lg font-bold mb-4">KweekTech</h3>
              <p className="text-black text-sm">
                Créateurs innovants de solutions numériques pour votre succès.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contactez-Nous</h3>
              <ul className="space-y-2 text-sm text-black">
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">📞</span>
                  <a href="tel:+21629072208" className="hover:text-white transition">
                    +216 29 072 208
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">📱</span>
                  <a href="tel:+21658805779" className="hover:text-white transition">
                    +216 58 805 779
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✉️</span>
                  <a href="mailto:kweektechcontact@gmail.com" className="hover:text-white transition">
                    kweektechcontact@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Liens</h3>
              <ul className="space-y-2 text-sm text-black">
                <li>
                  <a href="https://www.kweektech.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                    www.kweektech.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/kweektech/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn KweekTech"
                    className="hover:text-white transition"
                  >
                    LinkedIn: KweekTech
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800/60 mt-8 pt-8">
            <div className="text-sm text-black flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p>© 2026 KweekQR - Powered by KweekTech. Tous droits réservés.</p>
              <p>Made with ❤️ en Tunisie</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
