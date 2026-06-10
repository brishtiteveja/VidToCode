import { motion } from "framer-motion";
import { NavTheme } from "../hooks/useSectionTheme";
import { navItemVariants, easeOutExpo } from "../lib/animations";

interface NavigationProps {
  theme: NavTheme;
  visible: boolean;
}

const navLinks = ["Products", "About", "Sustainability", "Journal"];

export default function Navigation({ theme, visible }: NavigationProps) {
  const isLight = theme === "light";

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-5 flex items-center justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: easeOutExpo }}
    >
      {/* Logo */}
      <motion.a
        href="#"
        className={`font-display italic text-2xl transition-colors duration-300 ${
          isLight ? "text-white" : "text-floema-dark"
        }`}
        variants={navItemVariants}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        custom={0}
      >
        Floema
      </motion.a>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-1">
        {navLinks.map((link, i) => (
          <motion.a
            key={link}
            href="#"
            className={`nav-link ${isLight ? "nav-link--light" : "nav-link--dark"}`}
            variants={navItemVariants}
            initial="hidden"
            animate={visible ? "visible" : "hidden"}
            custom={(i + 1) * 0.08}
          >
            {link}
          </motion.a>
        ))}

        {/* Language Toggle */}
        <motion.button
          className={`nav-link ${isLight ? "nav-link--light" : "nav-link--dark"} ml-2`}
          variants={navItemVariants}
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
          custom={0.5}
        >
          EN
        </motion.button>
      </div>

      {/* Mobile menu button */}
      <motion.button
        className={`md:hidden flex flex-col gap-1.5 p-2 transition-colors duration-300`}
        variants={navItemVariants}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        custom={0.2}
      >
        <span
          className={`block w-5 h-[1.5px] transition-colors duration-300 ${
            isLight ? "bg-white" : "bg-floema-dark"
          }`}
        />
        <span
          className={`block w-5 h-[1.5px] transition-colors duration-300 ${
            isLight ? "bg-white" : "bg-floema-dark"
          }`}
        />
      </motion.button>
    </motion.nav>
  );
}
