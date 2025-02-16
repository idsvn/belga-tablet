export const getFormattedCurrentDate = () => {
  const now = new Date();

  // Extract date components
  const year = now.getFullYear();

  const month = String(now.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month

  const day = String(now.getDate()).padStart(2, '0'); // Ensure 2-digit day

  const hours = String(now.getHours()).padStart(2, '0'); // Ensure 2-digit hours

  const minutes = String(now.getMinutes()).padStart(2, '0'); // Ensure 2-digit minutes

  const seconds = String(now.getSeconds()).padStart(2, '0'); // No padding for seconds

  // Format: YYYY-MM-DDTHH:MM:S
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};
