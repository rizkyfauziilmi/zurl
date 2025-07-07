import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const dayjsInstance = dayjs;

dayjsInstance.extend(relativeTime);
