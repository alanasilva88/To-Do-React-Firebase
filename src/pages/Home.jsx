import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  CheckCheck,
  CalendarDays,
  Layers,
  MoveUpRight,
  Sparkles,
  Circle,
} from "lucide-react";
import { UsuarioContext } from "../contexts/UsuarioContext";
export default function Home() {
  const usuario = useContext(UsuarioContext);
  return (
    <main className="home-page">
      <section className="hero page-width">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="status-dot" />
            MENOS BAGUNÇA. MAIS CLAREZA.
          </span>
          <h1>
            Abra espaço
            <br />
            para o que
            <br />
            <span>realmente importa.</span>
          </h1>
          <p>
            Da primeira ideia ao último check. Organize suas tarefas, encontre
            seu ritmo e deixe o dia mais leve.
          </p>
          <div className="hero-actions">
            <Link
              className="button button-primary"
              to={usuario ? "/tarefas" : "/cadastro"}
            >
              {usuario ? "Ver minhas tarefas" : "Organizar meu dia"}
              <ArrowRight size={19} />
            </Link>
            <Link className="text-link" to="/ajuda">
              Conheça o ToDoTask
              <MoveUpRight size={16} />
            </Link>
          </div>
          <div className="hero-note">
            <CheckCheck size={18} />
            Simples de usar. Feito para a sua rotina.
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="floating-label">
            <Sparkles size={17} />
            Cada pequeno passo conta.
          </div>
          <div
            className="demo-board"
            aria-label="Exemplo ilustrativo de tarefas"
          >
            <div className="demo-top">
              <span>
                <span className="status-dot" />
                MEU ESPAÇO
              </span>
              <span>•••</span>
            </div>
            <h2>
              Um dia com propósito<span>Comece pelo que faz a diferença.</span>
            </h2>
            <div className="demo-progress">
              <span>Seu progresso</span>
              <strong>2 de 3 tarefas</strong>
              <div>
                <i />
              </div>
            </div>
            {[
              ["Planejar a semana", "Organização", true],
              ["Tirar uma ideia do papel", "Projetos", true],
              ["Reservar um tempo para mim", "Pessoal", false],
            ].map(([titulo, categoria, feito]) => (
              <div
                className={"demo-task " + (feito ? "done" : "")}
                key={titulo}
              >
                <span className="demo-check">
                  {feito ? <Check size={16} /> : <Circle size={17} />}
                </span>
                <div>
                  <strong>{titulo}</strong>
                  <small>{categoria}</small>
                </div>
              </div>
            ))}
            <div className="demo-bottom">
              <CalendarDays size={15} />
              Seu tempo, suas prioridades.
            </div>
          </div>
          <div className="floating-complete">
            <span>
              <CheckCheck size={25} />
            </span>
            <div>
              <strong>Mais foco. Menos peso.</strong>
              <small>Uma tarefa de cada vez.</small>
            </div>
          </div>
        </div>
      </section>
      <section className="features page-width">
        <div className="section-intro">
          <span className="eyebrow">SUA ROTINA, MAIS LEVE</span>
          <h2>O essencial para seguir em frente.</h2>
        </div>
        <div className="feature-grid">
          {[
            [
              Layers,
              "Tudo no seu lugar",
              "Trabalho, estudos ou projetos pessoais. Cada tarefa encontra seu espaço.",
            ],
            [
              CalendarDays,
              "Prioridades à vista",
              "Defina datas e enxergue o que precisa da sua atenção.",
            ],
            [
              CheckCheck,
              "Pequenas conquistas",
              "Acompanhe o que já concluiu e reconheça cada passo do caminho.",
            ],
          ].map(([Icon, titulo, texto], i) => (
            <article className="feature" key={titulo}>
              <span className={"feature-icon tone-" + i}>
                <Icon size={23} />
              </span>
              <h3>{titulo}</h3>
              <p>{texto}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
