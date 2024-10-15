import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const Dangky = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState(''); // State for re-typed password
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isPasswordHidden1, setIsPasswordHidden1] = useState(true);
  const navigation = useNavigation();

  const handleInputChange = inputText => {
    setPassword(inputText);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const handleInputChange1 = inputText => {
    setRetypePassword(inputText);
  };

  const togglePasswordVisibility1 = () => {
    setIsPasswordHidden1(!isPasswordHidden1);
  };

  const validateData = () => {
    if (!name || !email || !password || !retypePassword) {
      Alert.alert('Vui lòng không để trống');
      return false;
    }
    if (password !== retypePassword) {
      Alert.alert('Mật khẩu không trùng khớp nhau');
      return false;
    }
    return true;
  };
  const Signin = () => {
    navigation.navigate('Login');
  };
  const sendDataToAPI = async () => {
    try {
      if (!validateData()) return; // Validate data before sending to API
      const response = await axios.post('http://10.0.2.2:3000/users', {
        // Replace 'your-api-endpoint' with actual API endpoint
        name: name,
        email: email,
        password: password,
      });
      // Handle successful response from API
      console.log('DL lên API:', response.data);
      Alert.alert('Đăng ký thành công');
      // Redirect to login screen or any other screen
      navigation.navigate('Login');
    } catch (error) {
      // Handle error response from API
      console.error(error);
      Alert.alert('Đăng ký thất bại do lỗi.');
    }
  };

  return (
    <View style={st.khung}>
      <ScrollView>
        <View style={st.container}>
          {/* view ảnh */}
          <Image style={st.logo} source={require('./img/logo.png')} />
        </View>
        <View style={st.viewText1}>
          <Text style={st.text1}>Đăng ký</Text>
        </View>
        <View style={st.viewText2}>
          <Text style={st.text2}>Tạo tài khoản </Text>
        </View>
        <View style={{marginLeft: 20, marginRight: 20}}>
          <View style={st.khungTextInput}>
            <TextInput
              style={st.textInput}
              placeholder="Họ tên"
              placeholderTextColor="#828282"
              onChangeText={setName}
              value={name}
            />
            <TextInput
              style={[st.textInput, {marginTop: 10}]}
              placeholder="E-mail"
              placeholderTextColor="#828282"
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <View style={st.khungTextInput1}>
            <TextInput
              style={st.textInput}
              placeholder="Mật khẩu"
              placeholderTextColor="#828282"
              secureTextEntry={isPasswordHidden}
              onChangeText={handleInputChange}
              value={password}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={st.iconContainer}>
              <Icon
                name={isPasswordHidden ? 'eye' : 'eye-slash'}
                size={20}
                color="#828282"
              />
            </TouchableOpacity>
          </View>
          <View style={st.khungTextInput1}>
            <TextInput
              style={st.textInput}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor="#828282"
              secureTextEntry={isPasswordHidden1}
              onChangeText={handleInputChange1}
              value={retypePassword}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility1}
              style={st.iconContainer}>
              <Icon
                name={isPasswordHidden1 ? 'eye' : 'eye-slash'}
                size={20}
                color="#828282"
              />
            </TouchableOpacity>
          </View>
          <View style={st.vButton1}>
            <TouchableOpacity style={st.button1} onPress={sendDataToAPI}>
              <Text style={st.buttonText1}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{alignSelf: 'center', marginTop: 20}}>Hoặc</Text>
        <View style={st.login3}>
          <TouchableOpacity>
            <Image source={require('./img/logofb.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 50, width: 35, height: 35}}>
            <Image
              style={{width: 35, height: 35}}
              source={require('./img/logogg.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginTop: 5}}>
          <Text style={st.text3}>
            Tôi đã có tài khoản
            <Text style={{color: '#007537', margin: 20}} onPress={Signin}>
              Đăng nhập
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dangky;

const st = StyleSheet.create({
  khung: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 420,
    height: 170,
  },
  text1: {
    fontSize: 30,
    fontFamily: 'Poppins',
    color: 'black',

    fontWeight: 'bold',
  },
  viewText1: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewText2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text2: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#828282',
    lineHeight: 26,
    fontWeight: 'bold',
  },
  khungTextInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  khungTextInput1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textInput: {
    color: '#828282',
    borderColor: '#828282',
    borderWidth: 1,
    width: '100%',
    borderRadius: 8,
    paddingLeft: 15,
  },
  iconContainer: {
    position: 'absolute',
    top: 12,
    right: 10,
  },
  vButton1: {
    marginTop: 40,
  },
  vButton2: {
    marginTop: 10,
  },
  button1: {
    backgroundColor: '#007537',
    borderRadius: 5,
    justifyContent: 'center',
    height: 50,
  },
  button2: {
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    height: 50,
  },
  buttonText1: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 26,
    color: 'white',
    textAlign: 'center',
  },
  login3: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  text3: {color: '#828282', fontSize: 18, fontWeight: 'bold'},
});
