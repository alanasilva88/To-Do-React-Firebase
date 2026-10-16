import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./config";

const tarefasCol = collection(db, "tarefas");

function verificarUsuario(idUsuario) {
  if (!idUsuario || auth.currentUser?.uid !== idUsuario) {
    throw new Error("Usuario nao autorizado.");
  }
}

function camposTarefa(data) {
  return {
    titulo: data.titulo,
    descricao: data.descricao,
    dataConclusao: data.dataConclusao || "",
    concluido: Boolean(data.concluido),
    categoria: data.categoria,
  };
}

export async function addTarefa(data) {
  verificarUsuario(data.idUsuario);
  await addDoc(tarefasCol, {
    ...camposTarefa(data),
    idUsuario: data.idUsuario,
  });
}

export async function getTarefasUsuario(idUsuario) {
  verificarUsuario(idUsuario);
  const filtro = query(tarefasCol, where("idUsuario", "==", idUsuario));
  const snapshot = await getDocs(filtro);
  verificarUsuario(idUsuario);
  return snapshot.docs.map((documento) => ({
    ...documento.data(),
    id: documento.id,
  }));
}

// A verificacao no cliente complementa as regras de acesso do Firestore.
export async function getTarefa(id, idUsuario) {
  verificarUsuario(idUsuario);
  const snapshot = await getDoc(doc(tarefasCol, id));
  verificarUsuario(idUsuario);
  if (!snapshot.exists()) return null;
  const tarefa = snapshot.data();
  if (tarefa.idUsuario !== idUsuario) throw new Error("Tarefa nao autorizada.");
  return tarefa;
}

export async function deleteTarefa(id, idUsuario) {
  const tarefa = await getTarefa(id, idUsuario);
  if (!tarefa) throw new Error("Tarefa nao encontrada.");
  verificarUsuario(idUsuario);
  await deleteDoc(doc(tarefasCol, id));
}

export async function updateTarefa(id, data, idUsuario) {
  const tarefa = await getTarefa(id, idUsuario);
  if (!tarefa) throw new Error("Tarefa nao encontrada.");
  verificarUsuario(idUsuario);
  await updateDoc(doc(tarefasCol, id), camposTarefa(data));
}
