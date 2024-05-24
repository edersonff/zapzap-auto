export const statusType = ["active", "inactive", "error", "pending"] as const;

export const statusLabels = {
  active: "Ativo",
  inactive: "Inativo",
  error: "Erro",
  pending: "Pendente",
};

export const statusColors = {
  active: "text-success",
  inactive: "text-[#7e7e7e]",
  error: "text-danger",
  pending: "text-warning",
};

export const statusColorsWithBg = {
  active: "bg-success text-success",
  inactive: "bg-[#7e7e7e] text-[#7e7e7e]",
  error: "bg-danger text-danger",
  pending: "bg-warning text-warning",
};
