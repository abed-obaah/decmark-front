import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
;

export default IndividualFields = ({
  theme,
  toggleReferralID,
  setToggleReferralID,
  phoneNumber,
}) => {
  

  const [customerCode, setCustomerCode] = useState(null);
  const [dedicatedAccountId, setDedicatedAccountId] = useState("");

  const { userInfo } = useSelector((state) => state.auth)
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
          'Authorization': 'Bearer sk_live_b9f0ebe1da3834cc08b7e12ca8dc2cb5d7719b7c',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        const customerCode = responseData.data.customer_code;
        setCustomerCode(customerCode);
        console.log(responseData)
        console.log(customerCode)
        dispatch(registerUser({ ...inputs, customerCode }));
        createDedicatedAccount(customerCode);
      } else {
        console.error('Error creating Paystack customer:', responseData.message);
      }
    } catch (error) {
      console.error('Errored:', error);
    }
  };
  

  const createDedicatedAccount = async (customerCode) => {
    const url = 'https://api.paystack.co/dedicated_account';
    const data = {
      customer: customerCode, 
      preferred_bank: "wema-bank"
    };
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Authorization': 'Bearer sk_live_b9f0ebe1da3834cc08b7e12ca8dc2cb5d7719b7c',
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);
      const dedicatedAccountId = response.data.data.id;
      console.log(dedicatedAccountId);
      setDedicatedAccountId(dedicatedAccountId);
      // getDedicatedAccount(dedicatedAccountId);
      updateUserDetails(dedicatedAccountId);
    } catch (error) {
      console.error('Errors:', error.response ? error.response.data : error.message);
    }
  };

  
  const updateUserDetails = async (dedicatedAccountId) => {
    const userId = userInfo?.data?.id;
    const url = `https://api.decmark.com/v1/user/auth/users/${userId}`;
    const data = {
      dedicatedAccountId: dedicatedAccountId,
    };
  
    try {
      const response = await axios.put(url, data, {
        headers: {
          'Content-Type': 'application/json',
          // Add your authorization header here, if needed
          // 'Authorization': 'Bearer YOUR_TOKEN'
        },
      });
  
      if (response.status === 200) {
        console.log('User details updated successfully:', response.data);
        // Handle the successful response here
      } else {
        console.error('Failed to update user details:', response.data);
        // Handle the error response here
      }
    } catch (error) {
      console.error('Errory:', error.response ? error.response.data : error.message);
      // Handle the error here
    }
  };
  

  const getDedicatedAccount = async (dedicatedAccountId) => {
    if (!dedicatedAccountId) {
      console.log('No dedicated account ID provided');
      return;
    }
  
    const url = `https://api.paystack.co/dedicated_account/${dedicatedAccountId}`;
    const authorizationToken = 'Bearer sk_live_b9f0ebe1da3834cc08b7e12ca8dc2cb5d7719b7c';
  
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': authorizationToken,
          'Content-Type': 'application/json'
        }
      });
  
      console.log(response.data);
      // Handle the response data
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      // Handle the error
    }
  };



  const handleRegisterUser = () => {
    Keyboard.dismiss();
    const valid = handleValidateForm();
    if (valid) {
      dispatch(registerUser(inputs));
      createPaystackCustomer();
    }
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
