import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

const products = [
  {
    id: '1',
    name: 'Pants',
    image: require('./images/pants.jpg'),
  },
  {
    id: '2',
    name: 'Shoe',
    image: require('./images/shoes.jpg'),
  },
  {
    id: '3',
    name: 'Shirt',
    image: require('./images/shirt.jpg'),
  },
];

const ProductItem = ({ item, onDelete, onBuy }) => {
  return (
    <View style={styles.productItem}>
      <Image style={styles.productImage} source={item.image} />
      <Text style={styles.productName}>{item.name}</Text>
      <TouchableOpacity style={[styles.productButton, { backgroundColor: '#9b59b6' }]} onPress={() => onDelete(item)}>
        <Text style={[styles.productButtonText, { color: 'white' }]}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.productButton, { backgroundColor: '#2c3e50' }]} onPress={() => onBuy(item)}>
        <Text style={[styles.productButtonText, { color: 'white' }]}>Buy</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProductList = ({ products, onDelete, onBuy }) => {
  const handleBuy = (product) => {
    onBuy(product);
  };

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductItem item={item} onDelete={onDelete} onBuy={handleBuy} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.productList}
    />
  );
};

const AddToCartScreen = ({ cart, onDelete }) => {
  return (
    <View style={styles.cartContainer}>
      <Text style={styles.cartTitle}>My Cart</Text>
      <ProductList products={cart} onDelete={onDelete} />
    </View>
  );
};

AddToCartScreen.propTypes = {
  cart: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleDelete = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  return (
    <>
      <View style={styles.container}>
        <ProductList products={products} onDelete={handleDelete} onBuy={addToCart} />
      </View>
      <AddToCartScreen cart={cart} onDelete={handleDelete} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  cartContainer: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6a0dad',
  },
  productList: {
    paddingBottom: 20,
  },
  productItem: {
    backgroundColor: '#1b1b1b',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: '#fff',
  },
  productButton: {
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  productButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddToCartScreen;
