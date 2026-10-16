import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useMatch, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCheck,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  UserRound,
  LoaderCircle,
  LogIn,
} from "lucide-react";
import toast from "react-hot-toast";
import { cadastrarUsuario, entrarGoogle, loginUsuario } from "../firebase/auth";

export default function AuthForm() {
  const cadastro = Boolean(useMatch("/cadastro"));
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [visivel, setVisivel] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const ocupado = isSubmitting || googleLoading;
  async function enviar(data) {
    try {
      if (cadastro)
        await cadastrarUsuario(data.nome.trim(), data.email.trim(), data.senha);
      else await loginUsuario(data.email.trim(), data.senha);
      toast.success("Bem-vindo ao ToDoTask!");
      navigate("/tarefas");
    } catch (erro) {
      toast.error(
        erro.code === "auth/email-already-in-use"
          ? "Este e-mail já está cadastrado."
          : cadastro
            ? "Não foi possível criar sua conta. Confira os dados e tente novamente."
            : "Não foi possível entrar. Confira seu e-mail e senha.",
      );
    }
  }
  async function google() {
    setGoogleLoading(true);
    try {
      await entrarGoogle();
      toast.success("Bem-vindo ao ToDoTask!");
      navigate("/tarefas");
    } catch {
      toast.error("Não foi possível entrar com Google. Tente novamente.");
    } finally {
      setGoogleLoading(false);
    }
  }
  return (
    <main className="auth-page page-width">
      <aside className="auth-story">
        <span className="eyebrow">
          <span className="status-dot" />
          SEU PRÓXIMO PASSO COMEÇA AQUI
        </span>
        <h1>
          Uma mente leve.
          <br />
          <span>Um dia com direção.</span>
        </h1>
        <p>
          Suas ideias merecem sair do papel. Dê a elas um lugar para começar.
        </p>
        <div className="auth-checklist">
          {[
            "Organize suas prioridades",
            "Acompanhe suas conquistas",
            "Abra espaço para o que importa",
          ].map((texto) => (
            <div key={texto}>
              <CheckCheck size={19} />
              {texto}
            </div>
          ))}
        </div>
        <div className="auth-quote">
          <span>01 / UM PASSO DE CADA VEZ</span>
          <p>
            Grandes planos começam
            <br />
            com pequenas tarefas.
          </p>
        </div>
      </aside>
      <section className="auth-card">
        <span className="feature-icon tone-0">
          <LogIn size={24} />
        </span>
        <h2>{cadastro ? "Crie seu espaço." : "Que bom ter você aqui."}</h2>
        <p>
          {cadastro
            ? "Comece a organizar uma rotina com mais clareza."
            : "Entre na sua conta e continue de onde parou."}
        </p>
        <form onSubmit={handleSubmit(enviar)} noValidate>
          <fieldset disabled={ocupado}>
            {cadastro && (
              <div className="field">
                <label htmlFor="nome">Seu nome</label>
                <div className="input-icon">
                  <UserRound size={18} />
                  <input
                    id="nome"
                    autoComplete="name"
                    placeholder="Como podemos chamar você?"
                    aria-invalid={!!errors.nome}
                    aria-describedby={errors.nome ? "nome-error" : undefined}
                    {...register("nome", {
                      required: "Informe seu nome.",
                      maxLength: 50,
                      validate: (v) => !!v.trim() || "Informe seu nome.",
                    })}
                  />
                </div>
                {errors.nome && (
                  <small className="invalid" id="nome-error">
                    {errors.nome.message || "Use até 50 caracteres."}
                  </small>
                )}
              </div>
            )}
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <div className="input-icon">
                <Mail size={18} />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@exemplo.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email", {
                    required: "Informe seu e-mail.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Informe um e-mail válido.",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <small className="invalid" id="email-error">
                  {errors.email.message}
                </small>
              )}
            </div>
            <div className="field">
              <label htmlFor="senha">Senha</label>
              <div className="input-icon">
                <LockKeyhole size={18} />
                <input
                  id="senha"
                  type={visivel ? "text" : "password"}
                  autoComplete={cadastro ? "new-password" : "current-password"}
                  placeholder={
                    cadastro ? "Pelo menos 6 caracteres" : "Sua senha"
                  }
                  aria-invalid={!!errors.senha}
                  aria-describedby={errors.senha ? "senha-error" : undefined}
                  {...register("senha", {
                    required: "Informe sua senha.",
                    minLength: {
                      value: 6,
                      message: "Use pelo menos 6 caracteres.",
                    },
                  })}
                />
                <button
                  className="password-toggle"
                  type="button"
                  aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setVisivel(!visivel)}
                >
                  {visivel ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.senha && (
                <small className="invalid" id="senha-error">
                  {errors.senha.message}
                </small>
              )}
            </div>
            <button className="button button-primary full-width" type="submit">
              {isSubmitting ? (
                <LoaderCircle className="spin" size={18} />
              ) : (
                <ArrowRight size={18} />
              )}
              {cadastro ? "Criar minha conta" : "Entrar na minha conta"}
            </button>
          </fieldset>
        </form>
        <div className="divider">
          <span>ou continue com</span>
        </div>
        <button
          className="button button-secondary full-width"
          disabled={ocupado}
          onClick={google}
        >
          {googleLoading ? (
            <LoaderCircle className="spin" size={18} />
          ) : (
            <span className="google-letter" aria-hidden="true">
              G
            </span>
          )}
          Google
        </button>
        <p className="auth-switch">
          {cadastro ? "Já tem uma conta?" : "Ainda não tem uma conta?"}{" "}
          <Link to={cadastro ? "/login" : "/cadastro"}>
            {cadastro ? "Entrar" : "Cadastre-se"}
          </Link>
        </p>
        <p className="auth-legal">
          Saiba como seus dados são usados em{" "}
          <Link to="/politicas">Privacidade</Link>.
        </p>
      </section>
    </main>
  );
}
