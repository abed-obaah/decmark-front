import { AppSafeAreaView, AppScrollView } from "@src/components/AppViews";
import AppInput from "@src/components/AppInput";
import AppButton from "@src/components/AppButton";
import AppTextarea from "@src/components/AppTextarea";

export default ScheduleServiceScreen = () => {
  return (
    <AppSafeAreaView>
      <AppScrollView>
        <AppInput label="Category" />
        <AppInput label="Location" />
        <AppInput label="Budget" />
        <AppInput label="Duration (Hours)" />
        <AppTextarea label="Description" />
        <AppButton label="Submit Request" />
      </AppScrollView>
    </AppSafeAreaView>
  );
};
