export default function formatVND(value) {
  if (value === null || value === undefined) {
    return "";
  }

  const numberValue = Number(value);

  if (isNaN(numberValue)) {
    return "";
  }

  return numberValue.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
