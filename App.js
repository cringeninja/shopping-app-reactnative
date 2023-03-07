import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './ProfileScreen';
import AddToCartScreen from './AddToCartScreen';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const PRODUCTS = [
  { id: 1, name: 'Shirt', price: '20 PHP', source: require('./images/shirt.jpg') },
  { id: 2, name: 'Pants', price: '30 PHP', source: require('./images/pants.jpg') },
  { id: 3, name: 'Shoes', price: '50 PHP', source: require('./images/shoes.jpg') },
];

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [userName, setUserName] = useState('Paul');

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const cartCount = cartItems.length;

  return (
    <NavigationContainer>
          <Stack.Navigator
      initialRouteName="Products"
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: '#fff',
        headerTitleStyle: { ...styles.headerTitle, fontWeight: 'bold' }, // Add fontWeight property
        headerRight: () => <HeaderIcons cartCount={cartCount} />,
      }}
    >
      <Stack.Screen name="Products" options={{ title: 'ShoppingSpree' }}>
        {(props) => <ProductsScreen {...props} addToCart={addToCart} />}
      </Stack.Screen>
      <Stack.Screen name="Buy" component={BuyScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="AddToCart" component={AddToCartScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

function HeaderIcons({ cartCount }) {
  const navigation = useNavigation();

  return (
    <View style={styles.headerIcons}>
    <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('AddToCart')}>
      <Ionicons name="cart" size={32} color="#fff" />
      <View style={styles.cartCount}>
        <Text style={styles.cartCountText}>{cartCount}</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('Profile')}>
      <Ionicons name="person" size={32} color="#fff" />
    </TouchableOpacity>
  </View>
  
  );
}

function ProductsScreen({ navigation, addToCart }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Best Deals!</Text>
        {PRODUCTS.map((product) => (
          <TouchableOpacity key={product.id} style={styles.product} onPress={() => navigation.navigate('Buy', { product })}>
            <Image style={styles.productImage} source={product.source} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
            <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(product)}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
function BuyScreen({ route }) {
  const { product } = route.params;
  const [isBought, setIsBought] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{product.name}</Text>
      <Image source={product.source} style={styles.productImage} />
      <Text style={styles.price}>{product.price}</Text>
      {!isBought ? (
        <TouchableOpacity style={styles.buyButton} onPress={() => setIsBought(true)}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.success}>
          <Ionicons name="checkmark-circle-outline" size={64} color="#6a0dad" />
          <Text style={styles.successText}>Thank you for your purchase!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginHorizontal: 10,
  },
  header: {
    backgroundColor: '#000',
    borderBottomColor: '#6a0dad',
    borderBottomWidth: 1,
  },
  headerTitle: {
    color: '#6a0dad',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6a0dad',
  },
  product: {
    width: '80%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#6a0dad',
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: '#000',
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  productPrice: {
    fontSize: 16,
    marginVertical: 10,
    color: '#fff',
  },
  addToCartButton: {
    backgroundColor: '#6a0dad',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addToCartButtonText: {
    color: '#000',
    textAlign: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#fff',
  },
  buyButton: {
    backgroundColor: '#6a0dad',
    padding: 10,
    borderRadius: 5,
  },
  buyButtonText: {
    color: '#000',
    textAlign: 'center',
  },
  success: {
    alignItems: 'center',
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a0dad',
  },
  cartCount: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#6a0dad',
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    color: '#fff',
    fontSize: 12,
  },
});
