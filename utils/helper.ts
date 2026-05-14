export const getDisableStatusOnExpiredDate = (
  createdAt: Date,
  expiredDay: number,
) => {
  const expiryDate = new Date(createdAt);
  expiryDate.setDate(expiryDate.getDate() + expiredDay);

  const now = new Date();

  return now.getTime() >= expiryDate.getTime();
};

export const getSerializeData = (data: any): any => {
  if (data === null || data === undefined) return data;

  // Handle Decimal
  if (Object.prototype.toString.call(data).slice(8, -1) === "Decimal") {
    return Number(data); // safest
  }

  // Handle Decimal
  if (typeof data == 'bigint') {
    return Number(data); // safest
  }

  // Handle Date
  if (data instanceof Date) {
    return data;
  }

  // Handle Array
  if (Array.isArray(data)) {
    return data.map(getSerializeData);
  }

  // Handle Object
  if (typeof data === "object") {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        getSerializeData(value),
      ]),
    );
  }

  // string, number, boolean
  return data;
};
