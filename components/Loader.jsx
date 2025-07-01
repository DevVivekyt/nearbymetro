// components/Loader.js
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';

const Loader = () => {
    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <LottieView
                    source={require('../assets/animations/loader.json')}
                    autoPlay
                    loop
                    style={styles.animation}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)', // Optional dark backdrop
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    container: {
        height: 150,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
    },
    animation: {
        width: 200,
        height: 200,
    },
});

export default Loader;
