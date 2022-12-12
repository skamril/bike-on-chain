export function statusToString(status) {
  if (status == 0) {
    return "Inatif";
  }
  if (status == 1) {
    return "En vente";
  }
  if (status == 2) {
    return "En service";
  }
  if (status == 3) {
    return "Hors service";
  }
  if (status == 4) {
    return "Volé";
  }
}

export function statusToColor(status) {
  if (status == 0) {
    return "neutral";
  }
  if (status == 1) {
    return "warning";
  }
  if (status == 2) {
    return "success";
  }
  if (status == 3) {
    return "secondary";
  }
  if (status == 4) {
    return "error";
  }
}
