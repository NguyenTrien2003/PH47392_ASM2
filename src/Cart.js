import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

let url_api = 'http://10.0.2.2:3000/carts';

const Cart = () => {
  const [qty, setqty] = useState(1);
  const [isLoading, setisLoading] = useState(true);
  const [dsgh, setdsgh] = useState([]);
  const [productQty, setProductQty] = useState({});
  const navigation = useNavigation();

  const getListCart = async () => {
    try {
      const response = await fetch(url_api);
      const json = await response.json();
      setdsgh(json);
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
        getListCart();
      },
      [],
    );
    return unsubscribe;
  }, [navigation]);

  const removeItemCart = async item => {
    let url_delete_cart = `http://10.0.2.2:3000/carts/${item.id}`;
    fetch(url_delete_cart, {
      method: 'delete',
    })
      .then(res => {
        if (res.status == 200) {
          Alert.alert('sản phẩm đã được xóa khỏi giỏ hàng ');
          getListCart();
          return;
        }
      })
      .catch(ex => {
        console.log(ex);
      });
  };
  const handleQty = async (
    productId,
    hinhanh,
    name,
    gia,
    id_product,
    action,
  ) => {
    const selectedItem = dsgh.find(item => item.id === productId); // Tìm sản phẩm trong danh sách giỏ hàng dựa trên ID
    const currentQty = selectedItem.quantity; // Lấy ra quantity hiện tại của sản phẩm

    const newQty = currentQty + action; // Tính toán quantity mới sau khi cộng hoặc trừ

    if (newQty >= 1) {
      // Nếu quantity mới hợp lệ (lớn hơn hoặc bằng 1)
      try {
        const response = await fetch(
          `http://10.0.2.2:3000/carts/${productId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              hinhanh: hinhanh,
              name: name,
              gia: gia,
              quantity: newQty,
              id_product: id_product,
            }),
          },
        );

        if (response.status === 200) {
          // Nếu cập nhật thành công trên server, cập nhật lại state dsgh
          getListCart();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderProduct = ({item}) => {
    return (
      <View style={styles.itemList}>
        <View></View>
        <View style={styles.vAnh}>
          <Image
            source={{uri: item.hinhanh}}
            resizeMode="cover"
            style={styles.hinhanh}
          />
        </View>

        <View style={styles.vContent}>
          <View style={styles.v1}>
            <Text style={styles.text}>{item.name}</Text>
            <TouchableOpacity
              style={styles.xoa}
              onPress={() => removeItemCart(item)}>
              <Icon name="delete" size={23} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.text, styles.text1]}>{item.tenhang}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.text}>$ {item.gia}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 100,
                height: 'auto',
              }}>
              <TouchableOpacity
                style={styles.circle}
                onPress={() =>
                  handleQty(
                    item.id,
                    item.hinhanh,
                    item.name,
                    item.gia,
                    item.id_product,
                    -1,
                  )
                }>
                <Icon1 name="minus" size={16} color="black" />
              </TouchableOpacity>
              <Text style={{fontSize: 19, color: 'black', fontWeight: '700'}}>
                {productQty[item.id] || item.quantity}
              </Text>
              <TouchableOpacity
                style={styles.circle1}
                onPress={() =>
                  handleQty(
                    item.id,
                    item.hinhanh,
                    item.name,
                    item.gia,
                    item.id_product,
                    1,
                  )
                }>
                <Icon2 name="plus" color={'black'} size={22} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'white'}}>
      <Text
        style={[
          styles.text,
          {alignSelf: 'center', fontSize: 30, marginTop: 20},
        ]}>
        Giỏ hàng
      </Text>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={dsgh}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  itemList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  vAnh: {
    width: '27%',
    height: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hinhanh: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
    borderRadius: 20,
  },
  vContent: {
    width: '68%',
    height: 100,
    justifyContent: 'space-around',
  },
  v1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xoa: {
    padding: 5,
  },
  text: {
    fontSize: 22,
    fontWeight: '700',
    color: 'black',
  },
  text1: {
    fontSize: 13,
    fontWeight: '300',
    marginTop: 3,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle1: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
});
