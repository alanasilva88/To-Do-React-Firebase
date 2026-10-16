import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";

const preferenceKey = "todotask-theme";

export default function ThemeToggle() {
  const [tema, setTema] = useState(
    () => document.documentElement.dataset.theme || "light",
  );
  const escolhaLocal = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    function acompanharSistema() {
      let salvo;
      try {
        salvo = localStorage.getItem(preferenceKey);
      } catch {
        /* Storage may be unavailable. */
      }
      if (!escolhaLocal.current && salvo !== "light" && salvo !== "dark") {
        const proximo = media.matches ? "dark" : "light";
        document.documentElement.dataset.theme = proximo;
        setTema(proximo);
      }
    }
    function sincronizar(event) {
      if (event.key !== preferenceKey && event.key !== null) return;
      escolhaLocal.current = false;
      const proximo =
        event.newValue === "dark" || event.newValue === "light"
          ? event.newValue
          : media.matches
            ? "dark"
            : "light";
      document.documentElement.dataset.theme = proximo;
      setTema(proximo);
    }
    media.addEventListener("change", acompanharSistema);
    window.addEventListener("storage", sincronizar);
    return () => {
      media.removeEventListener("change", acompanharSistema);
      window.removeEventListener("storage", sincronizar);
    };
  }, []);

  function alternar() {
    const proximo = tema === "dark" ? "light" : "dark";
    escolhaLocal.current = true;
    document.documentElement.dataset.theme = proximo;
    setTema(proximo);
    try {
      localStorage.setItem(preferenceKey, proximo);
    } catch {
      /* Keep the theme for this session. */
    }
  }

  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      onClick={alternar}
      aria-label={tema === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      title={tema === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
    >
      {tema === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
