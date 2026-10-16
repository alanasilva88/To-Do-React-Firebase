import { Link } from "react-router-dom";
import { ArrowLeft, Compass, LayoutDashboard } from "lucide-react";
export default function NotFound() {
  return (
    <main className="not-found page-width">
      <div className="error-art" aria-hidden="true">
        <span>4</span>
        <Compass size={105} strokeWidth={1.2} />
        <span>4</span>
      </div>
      <span className="eyebrow">UM PEQUENO DESVIO NO CAMINHO</span>
      <h1>Essa página saiu da lista.</h1>
      <p>
        O endereço pode ter mudado ou não existir.
        <br />
        Vamos voltar para um lugar conhecido?
      </p>
      <div className="hero-actions">
        <Link className="button button-primary" to="/">
          <ArrowLeft size={18} />
          Voltar ao início
        </Link>
        <Link className="button button-secondary" to="/tarefas">
          <LayoutDashboard size={18} />
          Minhas tarefas
        </Link>
      </div>
    </main>
  );
}
