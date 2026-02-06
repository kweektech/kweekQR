export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-6 shadow-xl border-b-4 border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          {/* Logo and Title - Centered */}
          <div className="flex items-center gap-4 group cursor-pointer transition-transform hover:scale-102">
            <div className="relative">
              <img 
                src="/logo.svg" 
                alt="KweekQR Logo" 
                className="w-14 h-14 drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300" 
              />
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold tracking-tighter leading-tight">
                <span className="text-white">Kweek</span>
                <span className="text-orange-300 ml-1">QR</span>
              </h1>
              <p className="text-xs font-medium text-white/80 mt-1 tracking-wide uppercase">Create • Download • Share</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
