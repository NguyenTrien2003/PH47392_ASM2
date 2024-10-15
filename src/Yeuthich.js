/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

let url_api = 'http://10.0.2.2:3000/favorites';
const Yeuthich = () => {
  const [isLoading, setisLoading] = useState(true);
  const [dsyt, setdsyt] = useState([]);
  const navigation = useNavigation();

  const getListFav = async () => {
    try {
      const response = await fetch(url_api);
      const json = await response.json();
      setdsyt(json);
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener(
      'focus',
      () => {
        // cập nhật giao diện ở đây
        getListFav();
      },
      [dsyt],
    );

    return unsubscribe;
  }, [dsyt, navigation]);

  const removeFavorite = item => {
    let url_remove_favorite = `http://10.0.2.2:3000/favorites/${item.id}`;
    fetch(url_remove_favorite, {
      method: 'delete',
    })
      .then(res => {
        if (res.status == 200) {
          ToastAndroid.show('Xoá thành công!', ToastAndroid.SHORT);
          getListFav();
          return;
        }
      })
      .catch(ex => {
        console.log(ex);
      });
  };

  const handleRemoveFavorite = item => {
    Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn xóa?', [
      {
        text: 'Không',
        style: 'cancel', // Nút này sẽ có style đặc biệt để biểu thị là nút hủy
      },
      {
        text: 'Có',
        onPress: () => removeFavorite(item),
      },
    ]);
  };
  const renderProduct = ({item}) => {
    return (
      <View style={st.listFavorite} key={item.id}>
        <View style={st.viewHinhAnh}>
          <Image style={st.hinhanh} source={{uri: item.hinhanh}} />
          <View style={st.infoCoBanSP}>
            <View
              style={{
                padding: 10,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View style={st.textSP}>
                <Text style={st.text2}>{item.name}</Text>
                <Text style={st.text3}>{item.gia}</Text>
                <Text style={st.text3}>{item.tenhang}</Text>
              </View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  height: 40,
                }}
                onPress={() => handleRemoveFavorite(item)}>
                <Icon1
                  name="heart-dislike-circle-outline"
                  color={'white'}
                  size={40}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={st.khungngoai}>
      <View style={st.khung}>
        <View style={st.heading}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Text style={st.text1}>Favorites</Text>
          </View>
        </View>
        <View style={st.body}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={dsyt}
              renderItem={renderProduct}
              keyExtractor={item => item.id}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Yeuthich;

const st = StyleSheet.create({
  khungngoai: {
    width: '100%',
    height: 'auto',
  },
  khung: {
    height: '100%',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  heading: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '7%',
  },
  text1: {
    color: 'black',
    fontSize: 25,
    justifyContent: 'center',
    fontWeight: 'bold',
    lineHeight: 30,
  },
  body: {
    height: '98%',
  },
  listFavorite: {
    flexDirection: 'column',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#cccccc',
    marginBottom: 30,
    marginTop: 0,
    overflow: 'hidden',
  },
  viewHinhAnh: {
    width: '100%',
    height: '100%',
  },
  hinhanh: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: 485,
    resizeMode: 'cover',
  },
  infoCoBanSP: {
    position: 'absolute',
    bottom: 0,
    height: '30%',
    width: '100%',
    padding: 0,
    backgroundColor: '#000000A6',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flexDirection: 'row',
  },
  textSP: {
    flex: 6,
    marginLeft: 15,
    marginTop: 10,
  },
  text2: {color: 'white', fontSize: 22, fontWeight: 'bold'},
  text3: {
    color: '#AEAEAE',
    fontSize: 16,
  },
  viewStar: {
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 30,
  },
  text4: {
    color: 'white',
    fontSize: 25,
    lineHeight: 30,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  text5: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#828282',
  },
  thanhphan: {
    width: '40%',
    marginLeft: 27,
    marginBottom: 10,
  },
  tp1: {
    flex: 1, // Tự điều chỉnh tỷ lệ chiều cao theo yêu cầu
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  tp2: {
    flex: 0.7, // Tự điều chỉnh tỷ lệ chiều cao theo yêu cầu
    backgroundColor: '#141921',
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'center',
  },
  tp3: {
    flex: 0.8,
    // Tự điều chỉnh tỷ lệ chiều cao theo yêu cầu
    backgroundColor: '#141921',
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'center',
  },
  tp4: {
    flex: 0.8,
    // Tự điều chỉnh tỷ lệ chiều cao theo yêu cầu
    backgroundColor: '#141921',
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'center',
  },
  infoSP: {},
  viewTextInfo: {
    paddingLeft: 30,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  text6: {
    color: '#ffffff',
  },
  text7: {
    color: '#AEAEAE',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
