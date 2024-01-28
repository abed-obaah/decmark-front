import React, { useEffect } from "react";
import AppButton from "@src/components/AppButton";
import AppInput from "@src/components/AppInput";
import { View, Keyboard } from "react-native";
import { SIZES } from "@src/constants/theme";
import { AntDesign } from "@expo/vector-icons";
import { MediumText } from "@src/components/AppText";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@src/redux/authSlice";
import { useNavigation } from "@react-navigation/native";
import useOnChange from "@src/hooks/forms/useOnChange";
import { resetAuth } from "@src/redux/authSlice";

export default IndividualFields = ({
  theme,
  toggleReferralID,
  setToggleReferralID,
  phoneNumber,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.auth);
  const { inputs, errors, handleError, handleChangeInput, handleValidateForm } =
    useOnChange({
      first_name: "",
      last_name: "",
      email: "",
      phone: "234" + phoneNumber,
      password: "",
      gender: "male",
      accept_terms: true,
    });

  useEffect(() => {
    if (success) {
      navigation.navigate("LogIn");
    }

    dispatch(resetAuth());
  }, [success, navigation, dispatch]);


  const createPaystackCustomer = async () => {
    const url = 'https://api.paystack.co/customer';
    const data = {
      email: inputs.email,
      first_name: inputs.first_name,
      last_name: inputs.last_name,
      phone: inputs.phone,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer sk_test_d15130cc5c9cbbc5878a676ec1a8e65606b94ff1',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);

      // If Paystack customer creation is successful, proceed with user registration
      if (response.ok) {
        const customerCode = responseData.data.customer_code;
        console.log('Customer Code:', customerCode);
        dispatch(registerUser({ ...inputs, customerCode }));
      } else {
        // Handle Paystack customer creation error
        console.error('Error creating Paystack customer:', responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleRegisterUser = () => {
    Keyboard.dismiss();
    const valid = handleValidateForm();
    if (valid) dispatch(registerUser(inputs));
    if (valid) createPaystackCustomer();
  };

  return (
    <>
      <AppInput
        label="First Name"
        error={errors.first_name}
        onFocus={() => handleError("first_name", null)}
        onChangeText={(value) => handleChangeInput("first_name", value)}
      />
      <AppInput
        label="Last Name"
        error={errors.last_name}
        onFocus={() => handleError("last_name", null)}
        onChangeText={(value) => handleChangeInput("last_name", value)}
      />
      <AppInput
        label="Email"
        autoCapitalize="none"
        error={errors.email}
        onFocus={() => handleError("email", null)}
        onChangeText={(value) => handleChangeInput("email", value)}
      />
      <AppInput
        label="Password"
        password
        error={errors.password}
        onFocus={() => handleError(null, "password")}
        onChangeText={(value) => handleChangeInput("password", value)}
      />

      <View style={{ marginTop: 20 }}>
        <View
          style={{
            fontSize: SIZES.md,
            paddingVertical: 2.5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign
            name={toggleReferralID ? "caretdown" : "caretright"}
            style={{
              color: theme.PRIMARY_TEXT_COLOR,
              fontSize: 13.5,
              marginRight: 3.5,
            }}
            onPress={() => setToggleReferralID(!toggleReferralID)}
          />
          <MediumText
            style={{ color: theme.PRIMARY_TEXT_COLOR }}
            onPress={() => setToggleReferralID(!toggleReferralID)}
          >
            Referral ID (Optional)
          </MediumText>
        </View>
        {toggleReferralID && <AppInput marginTop={5} />}
      </View>

      <AppButton label="Submit" onPress={handleRegisterUser} />
    </>
  );
};
