import { format } from "date-fns";

export const formatDateTime = (date: Date) => {
  return format(date, "dd LLL yyyy - h:mm aaa");
};

export const formatDateDB = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};
