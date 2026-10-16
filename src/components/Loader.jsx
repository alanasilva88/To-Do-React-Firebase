import { LoaderCircle } from "lucide-react";
export default function Loader() {
  return (
    <div className="loading-state" role="status">
      <LoaderCircle className="spin" size={30} />
      <p>Organizando tudo por aqui…</p>
    </div>
  );
}
