import { useGlobalContext } from '@/constants/context/GlobalContext';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedTabIcon from './ui/AnimatedTabIcon';

const Header = () => {
    const router = useRouter();
    const { title, bgColor, setMetroId } = useGlobalContext();

    const [fadeAnim] = useState(new Animated.Value(0));
    const [translateYAnim] = useState(new Animated.Value(-20));

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: 'Check out metro details and news on NearbyMetro! 🚇 https://www.nearbymetro.com',
            });

            if (result.action === Share.sharedAction) {
                console.log('Shared successfully');
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed');
            }
        } catch (error) {
            console.error('Error sharing:', error.message);
        }
    };

    const handleBack = () => {
        setMetroId(null);
        router.back();
    };

    const safeColor = bgColor?.trim() ? bgColor : '#00A693';
    const isDefault = safeColor === '#00A693';

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Animated.View
                style={[
                    styles.header,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: translateYAnim }],
                    },
                ]}
            >
                <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                    <AnimatedTabIcon icon="train.side.front.car" color={safeColor} size={40} />
                    <Text style={[styles.text, { color: safeColor }]}>
                        {title || "All Station"}
                    </Text>
                </View>

                <TouchableOpacity
                    style={[styles.backButton, { backgroundColor: safeColor }]}
                    onPress={isDefault ? handleShare : handleBack}
                >
                    <AnimatedTabIcon
                        icon={safeColor === "#00A693" ? "square.and.arrow.up" : "chevron.left"}
                        color={'#fff'}
                    />
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    header: {
        padding: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    backButton: {
        borderRadius: 10,
        padding: 8,
    },
});

export default Header;
