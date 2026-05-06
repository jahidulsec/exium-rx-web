export const getDisableStatusOnExpiredDate = (
  createdAt: Date,
  expiredDay: number,
) => {
  const expiryDate = new Date(createdAt);
  expiryDate.setDate(expiryDate.getDate() + expiredDay);

  const now = new Date();

  return now.getTime() >= expiryDate.getTime();
};