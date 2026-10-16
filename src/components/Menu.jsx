import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  LayoutDashboard,
  LogOut,
  Menu as MenuIcon,
  X,
  CircleHelp,
} from "lucide-react";
import toast from "react-hot-toast";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { logout } from "../firebase/auth";
import logo from "../assets/logo-todotask.png";
import ThemeToggle from "./ThemeToggle";
export default function Menu() {
  const usuario = useContext(UsuarioContext);
  const [aberto, setAberto] = useState(false);
  const [saindo, setSaindo] = useState(false);
  const navigate = useNavigate();
  async function sair() {
    setSaindo(true);
    try {
      await logout();
      setAberto(false);
      navigate("/login");
    } catch {
      toast.error("Falha ao sair. Tente novamente.");
    } finally {
      setSaindo(false);
    }
  }
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          to="/"
          aria-label="ToDoTask - início"
          onClick={() => setAberto(false)}
        >
          <img
            src={logo}
            alt="ToDoTask"
            className="brand-logo"
            width="2172"
            height="724"
          />
        </Link>
        <div className="header-controls">
          <ThemeToggle />
          <button
            className="icon-button mobile-toggle"
            onClick={() => setAberto(!aberto)}
            aria-expanded={aberto}
            aria-controls="main-nav"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          >
            {aberto ? <X /> : <MenuIcon />}
          </button>
        </div>
        <nav
          id="main-nav"
          className={"main-nav " + (aberto ? "is-open" : "")}
          aria-label="Principal"
        >
          <NavLink to="/" end onClick={() => setAberto(false)}>
            Início
          </NavLink>
          {usuario && (
            <NavLink to="/tarefas" onClick={() => setAberto(false)}>
              <LayoutDashboard size={17} />
              Minhas tarefas
            </NavLink>
          )}
          <NavLink to="/ajuda" onClick={() => setAberto(false)}>
            <CircleHelp size={17} />
            Ajuda
          </NavLink>
          {usuario ? (
            <>
              <span className="nav-user">
                <span className="avatar">
                  {(usuario.displayName || usuario.email || "U")
                    .charAt(0)
                    .toUpperCase()}
                </span>
                {usuario.displayName || "Minha conta"}
              </span>
              <button
                className="icon-button"
                onClick={sair}
                disabled={saindo}
                aria-label="Sair da conta"
              >
                <LogOut size={19} />
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setAberto(false)}>
                Entrar
              </NavLink>
              <Link
                className="button button-primary button-small"
                to="/cadastro"
                onClick={() => setAberto(false)}
              >
                Começar agora
                <ArrowUpRight size={17} />
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
