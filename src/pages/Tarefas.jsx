import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Plus,
  Search,
  SlidersHorizontal,
  ListTodo,
  CircleCheck,
  Clock3,
  CalendarDays,
  Pencil,
  Trash2,
  ArrowRight,
  AlertCircle,
  RotateCw,
  CheckCheck,
  Inbox,
} from "lucide-react";
import toast from "react-hot-toast";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { deleteTarefa, getTarefasUsuario } from "../firebase/tarefas";
import { formatarData } from "../utils/data";
import Loader from "../components/Loader";
export default function Tarefas() {
  const usuario = useContext(UsuarioContext);
  const [tarefas, setTarefas] = useState(null);
  const [dono, setDono] = useState(null);
  const [erro, setErro] = useState(false);
  const [tentativa, setTentativa] = useState(0);
  const [excluindo, setExcluindo] = useState(null);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("Todas");
  const [categoria, setCategoria] = useState("Todas");
  useEffect(() => {
    if (!usuario) return;
    let ativo = true;
    setTarefas(null);
    setDono(null);
    setErro(false);
    getTarefasUsuario(usuario.uid)
      .then((lista) => {
        if (ativo) {
          setTarefas(lista);
          setDono(usuario.uid);
        }
      })
      .catch(() => {
        if (ativo) setErro(true);
      });
    return () => {
      ativo = false;
    };
  }, [usuario, tentativa]);
  async function excluir(id) {
    if (
      excluindo ||
      !confirm("Excluir esta tarefa? Esta ação não pode ser desfeita.")
    )
      return;
    setExcluindo(id);
    try {
      await deleteTarefa(id, usuario.uid);
      setTarefas((lista) => lista?.filter((t) => t.id !== id) ?? null);
      toast.success("Tarefa excluída.");
    } catch {
      toast.error("Não foi possível excluir a tarefa.");
    } finally {
      setExcluindo(null);
    }
  }
  if (!usuario) return <Navigate to="/login" replace />;
  const lista = dono === usuario.uid ? tarefas || [] : [];
  const carregando = !tarefas || dono !== usuario.uid;
  const concluidas = lista.filter((t) => t.concluido).length;
  const progresso = lista.length
    ? Math.round((concluidas / lista.length) * 100)
    : 0;
  const normalizar = (texto) =>
    String(texto || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const filtradas = lista.filter(
    (t) =>
      (filtro === "Todas" ||
        (filtro === "Concluídas" ? t.concluido : !t.concluido)) &&
      (categoria === "Todas" || t.categoria === categoria) &&
      normalizar(t.titulo + " " + t.descricao).includes(normalizar(busca)),
  );
  return (
    <main className="page-width content-page dashboard">
      <div className="page-heading">
        <div>
          <span className="eyebrow">SEU ESPAÇO DE CLAREZA</span>
          <h1>
            Vamos dar o próximo passo
            {usuario.displayName
              ? ", " + usuario.displayName.split(" ")[0]
              : ""}
            ?
          </h1>
          <p>
            Um lugar para organizar os planos e celebrar o que já aconteceu.
          </p>
        </div>
        <Link className="button button-primary" to="/tarefas/adicionar">
          <Plus size={19} />
          Nova tarefa
        </Link>
      </div>
      <section className="stats-grid" aria-label="Resumo das tarefas">
        {[
          [ListTodo, "Total de tarefas", lista.length, "blue"],
          [Clock3, "Para fazer", lista.length - concluidas, "amber"],
          [CircleCheck, "Concluídas", concluidas, "green"],
        ].map(([Icon, label, total, tone]) => (
          <article className="stat-card" key={label}>
            <span className={"stat-icon " + tone}>
              <Icon size={23} />
            </span>
            <div>
              <span>{label}</span>
              <strong>{carregando ? "—" : total}</strong>
            </div>
          </article>
        ))}
        <article className="stat-card progress-stat">
          <div>
            <span>Seu progresso</span>
            <strong>{carregando ? "—" : progresso + "%"}</strong>
          </div>
          <div className="progress-track">
            <span style={{ width: progresso + "%" }} />
          </div>
          <small>Cada check faz a diferença.</small>
        </article>
      </section>
      <section className="tasks-section">
        <div className="tasks-title">
          <h2>
            Minhas tarefas <span>{carregando ? "—" : lista.length}</span>
          </h2>
          <span className="muted">Seu ritmo. Suas prioridades.</span>
        </div>
        <div className="task-toolbar">
          <div
            className="filter-tabs"
            role="group"
            aria-label="Filtrar por status"
          >
            {["Todas", "Pendentes", "Concluídas"].map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={filtro === f ? "selected" : ""}
                aria-pressed={filtro === f}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="task-search">
            <Search size={18} />
            <input
              aria-label="Buscar tarefas"
              placeholder="Buscar uma tarefa…"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <div className="category-filter">
            <SlidersHorizontal size={17} />
            <select
              aria-label="Filtrar por categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              {[
                "Todas",
                "Trabalho",
                "Estudos",
                "Projetos",
                "Lazer",
                "Outros",
              ].map((c) => (
                <option key={c} value={c}>
                  {c === "Todas" ? "Categorias" : c}
                </option>
              ))}
            </select>
          </div>
        </div>
        {erro ? (
          <div className="empty-state" role="alert">
            <AlertCircle size={34} />
            <h3>Algo interrompeu o caminho.</h3>
            <p>Não foi possível carregar suas tarefas. Vamos tentar de novo?</p>
            <button
              className="button button-secondary"
              onClick={() => setTentativa((v) => v + 1)}
            >
              <RotateCw size={17} />
              Tentar novamente
            </button>
          </div>
        ) : carregando ? (
          <Loader />
        ) : !filtradas.length ? (
          <div className="empty-state">
            <span className="empty-icon">
              <Inbox size={35} />
            </span>
            <h3>
              {lista.length
                ? "Nenhuma tarefa por aqui."
                : "Uma página em branco. Muitas possibilidades."}
            </h3>
            <p>
              {lista.length
                ? "Tente outra busca ou ajuste os filtros."
                : "Crie sua primeira tarefa e dê um pequeno passo em direção aos seus planos."}
            </p>
            {lista.length ? (
              <button
                className="button button-secondary"
                onClick={() => {
                  setBusca("");
                  setFiltro("Todas");
                  setCategoria("Todas");
                }}
              >
                Limpar filtros
              </button>
            ) : (
              <Link className="button button-primary" to="/tarefas/adicionar">
                Criar minha primeira tarefa
                <ArrowRight size={18} />
              </Link>
            )}
          </div>
        ) : (
          <div className="task-grid">
            {filtradas.map((t) => (
              <article
                key={t.id}
                className={"task-card " + (t.concluido ? "is-complete" : "")}
              >
                <div className="task-card-top">
                  <span
                    className={
                      "category-badge category-" + normalizar(t.categoria)
                    }
                  >
                    {t.categoria}
                  </span>
                  <span
                    className={
                      "task-status " + (t.concluido ? "complete" : "pending")
                    }
                  >
                    {t.concluido ? (
                      <CircleCheck size={14} />
                    ) : (
                      <Clock3 size={14} />
                    )}
                    {t.concluido ? "Concluída" : "Pendente"}
                  </span>
                </div>
                <h3>{t.titulo}</h3>
                <p>{t.descricao}</p>
                <div className="task-card-footer">
                  <span>
                    <CalendarDays size={15} />
                    {formatarData(t.dataConclusao)}
                  </span>
                  <div>
                    <Link
                      className="icon-button"
                      to={"/tarefas/editar/" + t.id}
                      aria-label={"Editar tarefa: " + t.titulo}
                      title="Editar"
                    >
                      <Pencil size={17} />
                    </Link>
                    <button
                      className="icon-button danger"
                      disabled={excluindo !== null}
                      onClick={() => excluir(t.id)}
                      aria-label={"Excluir tarefa: " + t.titulo}
                      title="Excluir"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <p className="dashboard-note">
        <CheckCheck size={17} />
        Você não precisa fazer tudo hoje. Só precisa começar.
      </p>
    </main>
  );
}
