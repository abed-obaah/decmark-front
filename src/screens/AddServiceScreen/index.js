import { StyleSheet, Text, View } from 'react-native'
import { AppSafeAreaView, AppScrollView } from '../../components/AppViews';
import AppInput from '../../components/AppInput'
import AppButton from '../../components/AppButton';

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
        <AppInput 
          label="Description"
          multiline={true}
          numberOfLines={5}
        />
        <AppButton label="Post" />
      </AppScrollView>
    </AppSafeAreaView>
  )
}

export default AddServiceScreen;

const styles = StyleSheet.create({

})