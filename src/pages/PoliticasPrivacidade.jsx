import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  Database,
  Fingerprint,
  CircleHelp,
} from "lucide-react";
export default function PoliticasPrivacidade() {
  return (
    <main className="page-width content-page privacy-page">
      <Link className="back-link" to="/">
        <ArrowLeft size={17} />
        Voltar ao início
      </Link>
      <div className="center-heading">
        <span className="feature-icon tone-1">
          <ShieldCheck size={28} />
        </span>
        <span className="eyebrow">CLAREZA TAMBÉM É CUIDADO</span>
        <h1>Sobre seus dados.</h1>
        <p>Entenda as informações utilizadas para o ToDoTask funcionar.</p>
      </div>
      <div className="privacy-notice">
        <CircleHelp size={20} />
        <p>
          Esta página descreve o funcionamento atual da aplicação. A política de
          privacidade completa e os canais de atendimento ainda precisam ser
          definidos pelo responsável pelo serviço.
        </p>
      </div>
      <div className="privacy-sections">
        {[
          [
            Fingerprint,
            "Sua conta",
            "O acesso usa o Firebase Authentication. Ao se cadastrar, você informa nome, e-mail e senha, ou utiliza sua conta Google para entrar.",
          ],
          [
            Database,
            "Suas tarefas",
            "Título, descrição, categoria, data e status são armazenados no Cloud Firestore e associados ao identificador da sua conta. A exclusão de tarefas está disponível na própria lista.",
          ],
          [
            ShieldCheck,
            "Acesso às informações",
            "A aplicação consulta as tarefas associadas à sua conta. A proteção no banco depende das regras de acesso publicadas no projeto Firebase.",
          ],
          [
            CircleHelp,
            "Controles disponíveis",
            "Você pode editar e excluir suas tarefas ou sair da conta pelo menu. A exclusão da conta e solicitações sobre dados ainda não possuem um fluxo de atendimento nesta aplicação.",
          ],
        ].map(([Icon, t, p]) => (
          <section className="panel" key={t}>
            <span className="feature-icon tone-0">
              <Icon size={23} />
            </span>
            <div>
              <h2>{t}</h2>
              <p>{p}</p>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
