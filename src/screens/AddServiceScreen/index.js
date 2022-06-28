import { StyleSheet, Text, View } from 'react-native'
import { AppSafeAreaView, AppScrollView } from '../../components/AppViews';
import AppInput from '../../components/AppInput'
import AppButton from '../../components/AppButton';
import AppTextarea from '../../components/AppTextarea';

const AddServiceScreen = () => {
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
        <AppButton label="Post" />
      </AppScrollView>
    </AppSafeAreaView>
  )
}

export default AddServiceScreen;

const styles = StyleSheet.create({

})