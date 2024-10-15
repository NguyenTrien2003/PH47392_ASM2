import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

let url_api = 'http://10.0.2.2:3000/products';
let url_api_category = 'http://10.0.2.2:3000/categorys';

const ManHom = () => {
  const [selectedProduct, setSelectedProduct] = useState(null); // State lưu thông tin sản phẩm được chọn
  const [modalVisible, setModalVisible] = useState(false); // State quản lý trạng thái hiển thị modal
  const [isLoading, setisLoading] = useState(true);
  const [dssp, setdssp] = useState([]);
  const [isLoading1, setisLoading1] = useState(true);
  const [dscategory, setdscategory] = useState([]);
  const [numColumns, setnumColumns] = useState(1);

  const navigation = useNavigation();

  const getListCategory = async () => {
    try {
      const response = await fetch(url_api_category); //load dl

      const json = await response.json(); //chuyển dl thành json
      setdscategory(json); //đổ dl vào usestate
    } catch (error) {
      console.error(error);
    } finally {
      // kết thúc quá trình load dữ liệu, kể cả có lỗi cũng gọi vào lệnh này
      setisLoading1(false); // trạng thái không còn load nữa
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener(
      'focus',
      () => {
        // cập nhật giao diện ở đây
        getListPro();
        getListCategory();
      },
      [],
    );

    return unsubscribe;
  }, [navigation]);

  //
  const getListPro = async () => {
    try {
      const response = await fetch(`${url_api}`); //load dl

      const json = await response.json(); //chuyển dl thành json
      setdssp(json); //đổ dl vào usestate
    } catch (error) {
      console.error(error);
    } finally {
      // kết thúc quá trình load dữ liệu, kể cả có lỗi cũng gọi vào lệnh này
      setisLoading(false); // trạng thái không còn load nữa
    }
  };
  //

  //
  const renderCategory = ({item}) => {
    const limitedData = dssp.filter(product => product.id_category === item.id);
    return (
      <View key={item.id}>
        <Text style={st.text1}>{item.name}</Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            horizontal
            numColumns={numColumns}
            data={limitedData}
            keyExtractor={item => item.id}
            renderItem={renderProduct}
          />
        )}
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              color: 'orange',
              alignSelf: 'flex-end',
              marginRight: 20,
            }}>
            Xem thêm >>>
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderProduct = ({item}) => {
    return (
      <View style={st.itemPro}>
        <TouchableOpacity onPress={() => handleProductSelect(item)}>
          <View style={st.dsSP}>
            <View style={st.itemSP} key={item.id}>
              <View
                style={{
                  flex: 4,
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  width: '90%',
                  height: '100%',
                  marginTop: 10,
                }}>
                <Image style={st.hinhanhSP} source={{uri: item.hinhanh}} />
                <View style={st.infoSP}>
                  <Text style={st.textSP}>{item.name}</Text>
                  <Text style={st.textSmSP}>{item.tenhang}</Text>
                  <View
                    style={{
                      marginTop: 10,
                      width: '100%',
                      flex: 2,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={st.giaTien}>
                      <Text style={{color: '#D17842'}}>$</Text> {item.gia}
                    </Text>
                    <View style={st.vButton2}>
                      <TouchableOpacity
                        style={st.addSP}
                        onPress={() => addToCart({item})}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 25,
                            textAlign: 'center',
                            lineHeight: 26,
                          }}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const handleProductSelect = product => {
    setSelectedProduct(product); // Lưu thông tin sản phẩm được chọn vào state
    setModalVisible(true); // Mở modal
  };

  const closeModal = () => {
    setSelectedProduct(null); // Reset thông tin sản phẩm khi đóng modal
    setModalVisible(false); // Đóng modal
  };

  const [dscart, setdscart] = useState([]);

  // Hàm này sẽ gửi yêu cầu PUT để cập nhật số lượng của một sản phẩm trong giỏ hàng
  const updateCartItemQuantity = async (
    cartItemId,
    hinhanh,
    name,
    gia,
    newQuantity,
    id_product,
  ) => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/carts/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hinhanh: hinhanh,
          name: name,
          gia: gia,
          quantity: newQuantity,
          id_product: id_product,
        }),
      });

      if (response.status === 200) {
        // Nếu cập nhật thành công trên server, cập nhật lại state dscart
        getListCart();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getListCart = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/carts');
      const json = await response.json();
      setdscart(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getListCart();
  }, [navigation]); // Chỉ gọi getListCart một lần sau khi component được render

  const addToCart = async ({item}) => {
    const existingProductIndex = dscart.findIndex(
      cartItem => cartItem.id_product === item.id,
    );

    if (existingProductIndex !== -1) {
      // Sản phẩm đã có trong giỏ hàng, tăng quantity lên 1 đơn vị
      const updatedCart = [...dscart];
      updatedCart[existingProductIndex].quantity += 1;

      setdscart(updatedCart); // Cập nhật state dscart với phiên bản mới nhất của mảng giỏ hàng
      Alert.alert('Tăng số lượng trong giỏ hàng');

      // Cập nhật số lượng của sản phẩm trên server
      updateCartItemQuantity(
        updatedCart[existingProductIndex].id,
        updatedCart[existingProductIndex].hinhanh,
        updatedCart[existingProductIndex].name,
        updatedCart[existingProductIndex].gia,
        updatedCart[existingProductIndex].quantity,
        updatedCart[existingProductIndex].id_product,
      );
    } else {
      // Sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
      let ulePs = 'http://10.0.2.2:3000/carts';
      fetch(ulePs, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hinhanh: item.hinhanh,
          name: item.name,
          gia: item.gia,
          quantity: 1,
          id_product: item.id,
        }),
      })
        .then(res => {
          if (res.status == 201) {
            Alert.alert('Đã thêm vào giỏ hàng');
            // Sau khi thêm sản phẩm vào giỏ hàng thành công, load lại danh sách giỏ hàng
            getListCart();
            return;
          }
        })
        .catch(ex => {
          console.log(ex);
        });
    }
  };
  const handleAddToFavorite = async item => {
    try {
      let url_favorite = 'http://10.0.2.2:3000/favorites';
      const response = await fetch(url_favorite, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hinhanh: item.hinhanh,
          name: item.name,
          gia: item.gia,
          tenhang: item.tenhang,
          rate: item.rate,
          id_product: item.id,
        }),
      });

      // Kiểm tra phản hồi từ server
      if (response.status === 200 || response.status === 201) {
        ToastAndroid.show(
          'Thêm vào mục ưa thích thành công!',
          ToastAndroid.SHORT,
        );
      } else {
        ToastAndroid.show(
          'Thêm vào mục ưa thích không thành công. Vui lòng thử lại!',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Có lỗi xảy ra. Vui lòng thử lại!', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={st.khung}>
      <ScrollView>
        <View style={st.khung2}>
          <View>
            <Text style={st.text1}>Planta - toả sáng không gian nhà bạn</Text>
            <Image source={require('./img/slidetc.png')} />
          </View>
          <View style={{marginTop: 20}}>
            <TextInput
              style={st.inputSearch}
              placeholder="Find Your Plants..."
              placeholderTextColor="black"
            />
            <TouchableOpacity style={st.iconContainer}>
              <Icon name={'search'} size={20} color="#828282" />
            </TouchableOpacity>
          </View>

          <View>
            {isLoading1 ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                data={dscategory}
                keyExtractor={item => item.id}
                renderItem={renderCategory}
                nestedScrollEnabled={true}
              />
            )}
            <TouchableOpacity
              style={{
                width: 130,
                alignSelf: 'flex-end',
                marginRight: 20,
              }}
            />
          </View>
        </View>

        <Modal
          style={st.modal}
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => closeModal()}>
          <View style={st.modalContainer}>
            {/* Hiển thị thông tin chi tiết sản phẩm */}
            {selectedProduct && (
              <View style={st.modalContent}>
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <TouchableOpacity
                    style={st.buttonModal}
                    onPress={() => closeModal()}>
                    <Icon1 name="chevron-back" color="black" size={30} />
                  </TouchableOpacity>
                  <Text style={st.modalTitle}>Chi tiết sản phẩm</Text>
                </View>
                <ScrollView style={{width: '100%', height: '100%'}}>
                  <View
                    style={{width: '100%', height: 630, alignItems: 'center'}}>
                    <Image
                      style={st.hinhanhSPModal}
                      source={{uri: selectedProduct.hinhanh}}
                    />
                    <View style={{marginTop: 20, width: '100%', padding: 20}}>
                      <Text style={st.textGiaCT}>{selectedProduct.gia}</Text>
                      <Text style={st.textNameCT}>{selectedProduct.name}</Text>
                      <Text style={st.textTenHangCT}>
                        Size: {selectedProduct.tenhang}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={st.buttonUaThich}
                      onPress={() => handleAddToFavorite(selectedProduct)}>
                      <Icon1 name="heart" color={'white'} size={30} />
                      <Text style={{color: 'white', fontSize: 18}}>
                        Thêm vào ưa thích
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            )}
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default ManHom;

const st = StyleSheet.create({
  khung: {
    height: '100%',
    backgroundColor: '#F6F6F6',
  },
  heading: {
    flex: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text1: {
    marginLeft: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
  inputSearch: {
    paddingLeft: 50,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  iconContainer: {
    position: 'absolute',
    top: 12,
    left: 20,
  },
  scrollList: {
    marginTop: 30,
  },
  khung2: {
    padding: 5,
  },

  menuItemMid: {
    padding: 10,
    marginRight: 0,
  },
  menuTextMid: {
    color: '#828282',
    fontWeight: 'bold',
    fontSize: 18,
  },
  dsSP: {
    flexDirection: 'row',
  },
  itemSP: {
    margin: 10,
    backgroundColor: 'white',
    width: 180,
    height: 270,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hinhanhSP: {borderRadius: 10, width: '100%', height: '60%'},
  infoSP: {
    paddingTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '95%',
    alignSelf: 'center',
    height: '40%',
  },
  textSP: {
    color: 'black',
    fontSize: 18,
  },
  textSmSP: {
    color: 'black',
    fontSize: 13,
  },
  giaTien: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  addSP: {
    width: 30,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#007537',
  },
  viewTextMid: {},
  textMid: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#ffffff',
  },
  modalContainer: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    marginTop: 20,
    height: '90%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  textColor: {
    color: 'black',
  },
  hinhanhSPModal: {
    width: '90%',
    height: '50%',
  },
  buttonModal: {
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
    marginRight: 20,
    height: 30,
    width: 30,
    justifyContent: 'center',
  },
  textGiaCT: {
    fontSize: 40,
    color: '#007537',
  },
  textTenHangCT: {
    marginTop: 10,
  },
  textNameCT: {
    fontSize: 20,
    color: 'black',
  },
  buttonUaThich: {
    borderRadius: 10,
    backgroundColor: '#007537',
    flexDirection: 'row',
    width: '60%',
    marginTop: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
