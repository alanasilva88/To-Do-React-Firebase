import { Link } from "react-router-dom";
import { CheckCheck } from "lucide-react";
export default function Rodape() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-brand">
          <CheckCheck size={20} />
          ToDoTask<span className="footer-tagline">Um passo de cada vez.</span>
        </span>
        <span>© {new Date().getFullYear()} · Alana Silva</span>
        <div>
          <Link to="/ajuda">Ajuda</Link>
          <Link to="/politicas">Privacidade</Link>
        </div>
      </div>
    </footer>
  );
}
