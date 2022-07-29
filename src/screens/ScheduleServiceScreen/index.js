import { AppSafeAreaView, AppScrollView } from '@components/AppViews';
import AppInput from '@components/AppInput'
import AppButton from '@components/AppButton';
import AppTextarea from '@components/AppTextarea';

export default ScheduleServiceScreen = () => {
  return (
    <AppSafeAreaView>
      <AppScrollView>
        <AppInput 
          label="Category"
        />
        <AppInput 
          label="Location"
        />
        <AppInput 
          label="Budget"
        />
        <AppInput 
          label="Duration (Hours)"
        />
        <AppTextarea 
          label="Description"
        />
        <AppButton label="Submit Request" />
      </AppScrollView>
    </AppSafeAreaView>
  )
}