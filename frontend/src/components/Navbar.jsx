import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo2 from "../assets/logo2.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Analyze Transaction", path: "/analyze" },
  { name: "Live Monitor", path: "/monitor" },
  { name: "Model Insights", path: "/insights" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`animate-navbar fixed top-0 left-0 z-50 w-full bg-white transition-all duration-300 ${
        scrolled
          ? "border-b border-black shadow-sm"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 lg:px-10">

        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={logo2}
            alt="FraudLens AI Logo"
            className="h-14 w-14 rounded-xl object-contain"
          />

          <div className="leading-none">
            <h1 className="flex items-center text-xl font-bold tracking-tight sm:text-2xl">
              <span className="text-slate-900">FraudLens</span>
              <span className="text-orange-500">A</span>
              <span className="text-green-700">I</span>
            </h1>

            <p className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500 sm:block">
              Fraud Intelligence
            </p>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group relative py-6 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-orange-600"
                    : "text-slate-700 hover:text-orange-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  <span
                    className={`absolute bottom-3 left-1/2 h-[2px] -translate-x-1/2 bg-orange-500 transition-all duration-300 ${
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Mobile / Tablet Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-black bg-white text-slate-900 lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile / Tablet Menu */}
      {isOpen && (
        <div className="border-t border-black bg-white lg:hidden">
          <nav className="flex flex-col px-5 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `border-b border-slate-200 py-4 text-left text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-orange-600"
                      : "text-slate-800 hover:text-orange-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;