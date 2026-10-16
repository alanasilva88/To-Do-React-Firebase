export function formatarData(valor) {
  if (!valor) return "Sem data";
  if (typeof valor !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(valor))
    return "Data invalida";
  const [ano, mes, dia] = valor.split("-").map(Number);
  const data = new Date(0);
  data.setFullYear(ano, mes - 1, dia);
  data.setHours(12, 0, 0, 0);
  if (
    data.getFullYear() !== ano ||
    data.getMonth() !== mes - 1 ||
    data.getDate() !== dia
  )
    return "Data invalida";
  return data.toLocaleDateString("pt-BR");
}
