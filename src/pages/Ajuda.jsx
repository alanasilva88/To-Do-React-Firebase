import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CircleHelp,
  ListPlus,
  Pencil,
  UserRoundPlus,
  CheckCheck,
} from "lucide-react";
export default function Ajuda() {
  return (
    <main className="page-width content-page help-page">
      <div className="center-heading">
        <span className="eyebrow">UM POUCO DE DIREÇÃO</span>
        <h1>Vamos simplificar as coisas.</h1>
        <p>Tudo o que você precisa para encontrar seu ritmo no ToDoTask.</p>
      </div>
      <div className="help-steps">
        {[
          [
            UserRoundPlus,
            "01",
            "Crie seu espaço",
            "Cadastre-se com e-mail e senha ou entre com a sua conta Google.",
          ],
          [
            ListPlus,
            "02",
            "Tire os planos do papel",
            "Crie uma tarefa, adicione os detalhes e escolha uma categoria.",
          ],
          [
            CheckCheck,
            "03",
            "Celebre cada passo",
            "Edite a tarefa para marcar como concluída e acompanhe seu progresso.",
          ],
        ].map(([Icon, n, t, d]) => (
          <article className="panel" key={n}>
            <div className="step-top">
              <span className="feature-icon tone-0">
                <Icon size={24} />
              </span>
              <span>{n}</span>
            </div>
            <h2>{t}</h2>
            <p>{d}</p>
          </article>
        ))}
      </div>
      <section className="faq-layout">
        <div>
          <span className="feature-icon tone-1">
            <CircleHelp size={24} />
          </span>
          <h2>Perguntas frequentes</h2>
          <p>Pequenas respostas para seguir com mais confiança.</p>
          <Link className="text-link" to="/tarefas">
            Ir para minhas tarefas
            <ArrowRight size={17} />
          </Link>
        </div>
        <div className="faq-list">
          {[
            [
              "Como organizo minhas tarefas?",
              "Use as categorias Trabalho, Estudos, Projetos, Lazer ou Outros. Na lista, você pode buscar pelo título ou descrição e filtrar por categoria e status.",
            ],
            [
              "Como marco uma tarefa como concluída?",
              "Clique no ícone de edição da tarefa, marque a opção Já está concluída? e salve. O resumo de progresso será atualizado na lista.",
            ],
            [
              "Preciso definir uma data?",
              "Não. A data é opcional: você pode organizar tarefas sem prazo e adicionar uma data depois.",
            ],
            [
              "Como altero ou excluo uma tarefa?",
              "Use o lápis para editar os detalhes ou a lixeira para excluir. A exclusão pede confirmação e não pode ser desfeita.",
            ],
            [
              "Posso acessar em outro dispositivo?",
              "Sim. Entre com a mesma conta para acessar suas tarefas no computador ou no celular.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <div className="help-banner">
        <BookOpen size={28} />
        <div>
          <h2>Organização é um hábito, não uma corrida.</h2>
          <p>
            Comece com uma tarefa simples. O resto vem um passo de cada vez.
          </p>
        </div>
        <Link to="/tarefas/adicionar" className="button button-primary">
          <Pencil size={17} />
          Criar uma tarefa
        </Link>
      </div>
    </main>
  );
}
