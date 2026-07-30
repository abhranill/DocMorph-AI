import Button from "../ui/Button";
import Logo from "./Logo";
const navLinks = [
  "Convert",
  "PDF Tools",
  "AI Tools",
  "Pricing",
];

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white">
      {/* Logo */}
      <div>
  <Logo />
</div>

      {/* Navigation */}
      <div className="flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="hover:text-blue-600 transition"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Button */}
      <Button text="Get Started" />
    </nav>
  );
}

export default Navbar;