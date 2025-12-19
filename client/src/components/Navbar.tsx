import { motion } from "framer-motion";

const Navbar = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Navbar - Top Left Name */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-8 left-6 z-50 hidden md:block"
      >
       <button
  data-cursor="hide"
  onClick={() => scrollToSection("hero")}
  className="
    text-lg          /* ⬅️ Aumentato da text-xs a text-lg */
    md:text-xl       /* ⬅️ Nel desktop cresce ancora un po' */
    font-light       /* ⬅️ Elegante stile minimal */
    tracking-[0.25em] /* ⬅️ Spaziatura tipo logo */
    transition-opacity 
    hover:opacity-70
  "
  style={{ color: "hsl(var(--scroll-indicator))" }}
>
  BC
</button>
      </motion.div>
    </>
  );
};

export default Navbar;
