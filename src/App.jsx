import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Ajuda from "./pages/Ajuda";
import Rodape from "./components/Rodape";
import PoliticasPrivacidade from "./pages/PoliticasPrivacidade";
import NotFound from "./pages/NotFound";
import NovaTarefa from "./pages/NovaTarefa";
import Tarefas from "./pages/Tarefas";
import { Toaster } from "react-hot-toast";
import EditarTarefa from "./pages/EditarTarefa";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { UsuarioContext } from "./contexts/UsuarioContext";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUsuarioLogado(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <UsuarioContext.Provider value={usuarioLogado}>
        <BrowserRouter>
          <ScrollToTop />
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/ajuda" element={<Ajuda />} />
            <Route path="/politicas" element={<PoliticasPrivacidade />} />
            <Route path="/tarefas" element={<Tarefas />} />
            <Route path="/tarefas/adicionar" element={<NovaTarefa />} />
            <Route path="/tarefas/editar/:id" element={<EditarTarefa />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Rodape />
        </BrowserRouter>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--toast-bg)",
              color: "var(--toast-color)",
              border: "1px solid var(--line)",
            },
          }}
        />
      </UsuarioContext.Provider>
    </>
  );
}

export default App;
