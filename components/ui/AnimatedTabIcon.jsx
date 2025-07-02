import { StyleSheet, View } from 'react-native';
import { IconSymbol } from './IconSymbol.jsx';

const AnimatedTabIcon = ({ focused, icon, color, size = 28 }) => {
    const style = {
        opacity: focused ? 1 : 0.6,
        transform: [{ scale: focused ? 1.4 : 1 }],
    };

    return (
        <View style={[styles.iconWrapper, style]}>
            <IconSymbol size={size} name={icon} color={color} />
        </View>
    );
};

const styles = StyleSheet.create({
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AnimatedTabIcon;
