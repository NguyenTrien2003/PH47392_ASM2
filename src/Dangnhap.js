import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios'; // Import Axios library for making HTTP requests

const Dangnhap = () => {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [isPasswordHidden, setIsPasswordHidden] = useState(true); // State to toggle password visibility
  const navigation = useNavigation();

  // Function to handle input change for email
  const handleEmailChange = inputText => {
    setEmail(inputText);
  };

  // Function to handle input change for password
  const handlePasswordChange = inputText => {
    setPassword(inputText);
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  // const handleLogin = () =>{
  //     navigation.navigate('Home');
  // }
  const handleLogin = () => {
    // Validate email and password
    if (email.length == 0) {
      Alert.alert('Chưa nhập email!');
      return;
    }
    if (password.length == 0) {
      Alert.alert('Chưa nhập passwork!');
      return;
    }
    let url_check_login = 'http://10.0.2.2:3000/users?email=' + email;
    fetch(url_check_login)
      .then(res => {
        return res.json();
      })
      .then(res_login => {
        if (res_login.length != 1) {
          Alert.alert('Sai email hoặc lỗi trùng lặp dl');
          return;
        } else {
          let objU = res_login[0];
          if (objU.password != password) {
            Alert.alert('Sai password!');
            return;
          } else {
            Alert.alert('Đăng nhập thành công!');
            navigation.navigate('Home');
          }
        }
      });
  };

  // Function to navigate to the registration screen
  const navigateToRegister = () => {
    navigation.navigate('Signin');
  };

  return (
    <View style={st.khung}>
      <ScrollView>
        <View style={st.container}>
          <Image style={st.logo} source={require('./img/logo.png')} />
        </View>
        <View style={st.viewText1}>
          <Text style={st.text1}>Chào mừng đến Plantree !!</Text>
        </View>
        <View style={st.viewText2}>
          <Text style={st.text2}>Đăng nhập để tiếp tục</Text>
        </View>
        <View style={st.container2}>
          <View style={st.khungTextInput}>
            <TextInput
              style={st.textInput}
              placeholder="Nhập email hoặc số điện thoại"
              placeholderTextColor="#828282"
              onChangeText={handleEmailChange}
              value={email}
            />
          </View>
          <View style={st.khungTextInput1}>
            <TextInput
              style={st.textInput}
              placeholder="Mật khẩu"
              placeholderTextColor="#828282"
              secureTextEntry={isPasswordHidden}
              onChangeText={handlePasswordChange}
              value={password}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={st.iconContainer}>
              <Icon
                name={isPasswordHidden ? 'eye' : 'eye-slash'}
                size={25}
                color="#828282"
              />
            </TouchableOpacity>
          </View>
          <View style={st.vButton1}>
            <TouchableOpacity style={st.button1} onPress={handleLogin}>
              <Text style={st.buttonText1}>Sign In</Text>
            </TouchableOpacity>
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
        </View>
        <View style={st.viewText3}>
          <Text style={st.text3}>
            Bạn không có tài khoản?{' '}
            <Text style={{color: '#007537'}} onPress={navigateToRegister}>
              Tạo tài khoản
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default Dangnhap;

const st = StyleSheet.create({
  khung: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    marginLeft: 20,
    marginRight: 20,
  },
  logo: {
    width: 420,
    height: 280,
  },
  text1: {
    fontSize: 18,
    fontFamily: 'Poppins',
    color: '#FFFFFF',
    lineHeight: 26,
    fontWeight: 'bold',
  },
  viewText1: {
    flex: 1,
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
  login3: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  textInput: {
    color: '#828282',
    borderColor: '#828282',
    borderWidth: 1,
    width: '100%',
    borderRadius: 8,
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
  buttonText2: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 26,
    color: 'black',
    textAlign: 'center',
  },
  viewText3: {
    marginTop: 30,
    alignItems: 'center',
  },
  text3: {
    color: '#828282',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
