import Animated, {
    Easing,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { IconSymbol } from './IconSymbol.jsx';

const AnimatedTabIcon = ({ focused, icon, color, size = 28 }) => {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withTiming(focused ? 1.4 : 1, {
                        duration: 300,
                        easing: Easing.out(Easing.exp),
                    }),
                },
            ],
            opacity: withTiming(focused ? 1 : 0.6, {
                duration: 300,
                easing: Easing.out(Easing.exp),
            }),
        };
    });

    return (
        <Animated.View style={animatedStyle}>
            <IconSymbol size={size} name={icon} color={color} />
        </Animated.View>
    );
};

export default AnimatedTabIcon;
