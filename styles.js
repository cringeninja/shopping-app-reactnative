import { StyleSheet } from 'react-native';

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
    color: '#fff',
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
    color: '#fff',
  },
  buyButton: {
    backgroundColor: '#6a0dad',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buyButtonText: {
    color: '#fff',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  success: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#fff',
  },
  cartCount: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#6a0dad',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCountText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;