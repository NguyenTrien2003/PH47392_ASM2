import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Lienhe = () => {
  const listLH = [
    {
      key: 1,
      tenchinhanh: 'Hà Nội',
      diachi: 'Địa chỉ: ngõ 234 phường xuân phương nam từ liêm hà nội',
      sdt: '0987654321',
    },
    {
      key: 2,
      tenchinhanh: 'Đà Nẵng',
      diachi:
        '149/3 Lê Đình Lý, Bình Thuận, Hải Châu, Đà Nẵng 550000, Việt Nam',
      sdt: '0987654321',
    },
    {
      key: 3,
      tenchinhanh: 'TP Hồ Chí Minh',
      diachi: '86-88 Đ. Cao Thắng, Quận 3, Thành phố Hồ Chí Minh, Việt Nam',
      sdt: '0987654321',
    },
    {
      key: 4,
      tenchinhanh: 'Cần Thơ',
      diachi: '2QM7+PVF, Hẻm 51, Phường An Khánh, Ninh Kiều, Cần Thơ, Việt Nam',
      sdt: '0987654321',
    },
  ];
  const renderItem = ({item}) => (
    <View style={st.box1}>
      <View style={st.boxT1}>
        <Text style={[st.textDefault, st.text1]}>
          Chi Nhánh {item.tenchinhanh}
        </Text>
        <Text style={[st.textDefault, st.text2]}>Địa Chỉ:{item.diachi}</Text>
        <Text style={[st.textDefault, st.text3]}>SDT: {item.sdt}</Text>
      </View>
    </View>
  );
  return (
    <View style={st.khung}>
      <Text style={st.headerText}>Liên hệ</Text>
      <FlatList
        style={st.flat}
        data={listLH}
        keyExtractor={item => item.key}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Lienhe;

const st = StyleSheet.create({
  khung: {
    backgroundColor: '#0C0F14',
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    marginTop: 20,
    fontSize: 30,
    color: 'white',
  },
  box1: {
    marginTop: 30,
    height: 200,
    borderColor: 'white',
    borderWidth: 1,
    marginLeft: 10,
    width: '95%',
  },
  boxT1: {
    flex: 1,
  },
  boxT2: {
    flex: 1,
  },
  textDefault: {
    color: 'white',
    fontSize: 20,
  },
  text1: {
    fontSize: 30,
    alignSelf: 'center',
  },
  flat: {
    flex: 1,
  },
  text2: {
    marginTop: 10,

    paddingLeft: 10,
    paddingRight: 10,
  },
  text3: {
    marginTop: 10,
    alignSelf: 'center',
  },
});
