import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCheck,
  Lightbulb,
  ListTodo,
  LoaderCircle,
  Save,
  Tags,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { addTarefa, getTarefa, updateTarefa } from "../firebase/tarefas";
import Loader from "./Loader";
export default function TarefaForm() {
  const usuario = useContext(UsuarioContext);
  const { id } = useParams();
  const editar = Boolean(id);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      titulo: "",
      descricao: "",
      dataConclusao: "",
      categoria: "Trabalho",
      concluido: false,
    },
  });
  const [carregada, setCarregada] = useState(null);
  const [erro, setErro] = useState(false);
  const [tentativa, setTentativa] = useState(0);
  useEffect(() => {
    if (!editar || !usuario) return;
    let ativo = true;
    setCarregada(null);
    setErro(false);
    getTarefa(id, usuario.uid)
      .then((tarefa) => {
        if (!ativo) return;
        if (!tarefa) {
          navigate("/tarefas", { replace: true });
          return;
        }
        reset(tarefa);
        setCarregada(usuario.uid + "/" + id);
      })
      .catch(() => {
        if (ativo) setErro(true);
      });
    return () => {
      ativo = false;
    };
  }, [editar, id, usuario, navigate, reset, tentativa]);
  async function salvar(data) {
    try {
      if (editar) await updateTarefa(id, data, usuario.uid);
      else await addTarefa({ ...data, idUsuario: usuario.uid });
      toast.success(
        editar ? "Tarefa atualizada!" : "Tarefa criada. Vamos em frente!",
      );
      navigate("/tarefas");
    } catch {
      toast.error("Não foi possível salvar a tarefa. Tente novamente.");
    }
  }
  if (!usuario) return <Navigate to="/login" replace />;
  if (editar && erro)
    return (
      <main className="page-width content-page">
        <div className="empty-state" role="alert">
          <AlertCircle />
          <h1>Não foi possível carregar a tarefa.</h1>
          <button
            className="button button-primary"
            onClick={() => setTentativa((v) => v + 1)}
          >
            Tentar novamente
          </button>
          <Link to="/tarefas">Voltar para tarefas</Link>
        </div>
      </main>
    );
  if (editar && carregada !== usuario.uid + "/" + id) return <Loader />;
  return (
    <main className="page-width content-page">
      <Link className="back-link" to="/tarefas">
        <ArrowLeft size={17} />
        Voltar para minhas tarefas
      </Link>
      <div className="page-heading">
        <div>
          <span className="eyebrow">UM PASSO MAIS PERTO</span>
          <h1>
            {editar
              ? "Ajuste os próximos passos."
              : "Toda conquista começa aqui."}
          </h1>
          <p>
            {editar
              ? "Atualize os detalhes e siga no seu ritmo."
              : "Tire uma ideia da cabeça e transforme em ação."}
          </p>
        </div>
      </div>
      <div className="task-form-layout">
        <form
          className="panel task-form"
          onSubmit={handleSubmit(salvar)}
          noValidate
        >
          <div className="panel-heading">
            <span className="feature-icon tone-0">
              <ListTodo size={22} />
            </span>
            <div>
              <h2>{editar ? "Editar tarefa" : "Nova tarefa"}</h2>
              <p>Os detalhes fazem a diferença.</p>
            </div>
          </div>
          <fieldset disabled={isSubmitting}>
            <div className="field">
              <label htmlFor="titulo">
                O que você precisa fazer? <span>*</span>
              </label>
              <input
                id="titulo"
                placeholder="Ex.: Preparar a apresentação do projeto"
                maxLength={200}
                aria-invalid={!!errors.titulo}
                aria-describedby={errors.titulo ? "titulo-error" : undefined}
                {...register("titulo", {
                  required: "Dê um título à sua tarefa.",
                  maxLength: 200,
                  validate: (v) => !!v.trim() || "Informe um título.",
                })}
              />
              {errors.titulo && (
                <small className="invalid" id="titulo-error">
                  {errors.titulo.message || "Use até 200 caracteres."}
                </small>
              )}
            </div>
            <div className="field">
              <label htmlFor="descricao">
                Descrição <span>*</span>
              </label>
              <textarea
                id="descricao"
                rows={5}
                maxLength={500}
                placeholder="Anote os detalhes que vão ajudar você a começar…"
                aria-invalid={!!errors.descricao}
                aria-describedby={
                  errors.descricao ? "descricao-error" : undefined
                }
                {...register("descricao", {
                  required: "Adicione uma descrição.",
                  maxLength: 500,
                  validate: (v) => !!v.trim() || "Informe uma descrição.",
                })}
              />
              {errors.descricao && (
                <small className="invalid" id="descricao-error">
                  {errors.descricao.message || "Use até 500 caracteres."}
                </small>
              )}
              <small className="field-hint">
                Até 500 caracteres. Deixe o próximo passo claro.
              </small>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="dataConclusao">
                  <CalendarDays size={16} />
                  Data de conclusão
                </label>
                <input
                  type="date"
                  id="dataConclusao"
                  {...register("dataConclusao")}
                />
                <small className="field-hint">
                  Opcional. Cada coisa no seu tempo.
                </small>
              </div>
              <div className="field">
                <label htmlFor="categoria">
                  <Tags size={16} />
                  Categoria
                </label>
                <select id="categoria" {...register("categoria")}>
                  {["Trabalho", "Estudos", "Projetos", "Lazer", "Outros"].map(
                    (c) => (
                      <option key={c}>{c}</option>
                    ),
                  )}
                </select>
              </div>
            </div>
            <label className="checkbox-panel">
              <input type="checkbox" {...register("concluido")} />
              <span>
                <strong>Já está concluída?</strong>
                <small>Marque para registrar mais uma conquista.</small>
              </span>
              <CheckCheck size={22} />
            </label>
            <div className="form-actions">
              <Link className="button button-secondary" to="/tarefas">
                Cancelar
              </Link>
              <button type="submit" className="button button-primary">
                {isSubmitting ? (
                  <LoaderCircle size={18} className="spin" />
                ) : (
                  <Save size={18} />
                )}
                {isSubmitting
                  ? "Salvando…"
                  : editar
                    ? "Salvar alterações"
                    : "Criar tarefa"}
              </button>
            </div>
          </fieldset>
        </form>
        <aside className="task-tip">
          <Lightbulb size={27} />
          <span className="eyebrow">UMA DICA PARA COMEÇAR</span>
          <h2>
            Pequena o suficiente
            <br />
            para dar o primeiro passo.
          </h2>
          <p>
            Uma tarefa clara é mais fácil de realizar. Use um verbo no título e
            divida grandes projetos em ações menores.
          </p>
          <div>
            <ArrowRight size={17} />
            Um passo de cada vez também é progresso.
          </div>
        </aside>
      </div>
    </main>
  );
}
