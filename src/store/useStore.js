import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";

const useStore = () => {
  const { store } = useContext(MobXProviderContext);
  return store;
};

export const useSchedules = () => {
  const { schedules } = useContext(MobXProviderContext);
  return schedules;
};
export default useStore;
