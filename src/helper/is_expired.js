import { parseISO } from "date-fns";

function is_expired(ex_date) {
  const date = ex_date.split(" ");
  const parsed_date = parseISO(`${date[0]}T${date[1]}`);
  return Date.parse(parsed_date) < Date.now();
}

export default is_expired;
