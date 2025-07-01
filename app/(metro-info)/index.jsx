import SearchableDropdown from "@/components/Dropdown";
import Loader from "@/components/Loader";
import AnimatedTabIcon from "@/components/ui/AnimatedTabIcon";
import { fetchSingleMetroData } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import { Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Index = () => {
    const { name, id, bgColor } = useLocalSearchParams();
    const { data, isLoading } = useQuery(["singleMetro", id], () => fetchSingleMetroData(id));

    const stationList = data?.map((station) => ({
        label: station.Station_Name,
        value: station.Station_Code,
    }));

    const handleShare = async () => {
        try {
            const metroUrl = `https://www.nearbymetro.com/metro/${id}/farecalculation/${name}`;

            const result = await Share.share({
                message: `Check out metro details and fare info for ${name} Metro 🚇 ${metroUrl}`,
            });

            if (result.action === Share.sharedAction) {
                console.log("Shared successfully");
            } else if (result.action === Share.dismissedAction) {
                console.log("Share dismissed");
            }
        } catch (error) {
            console.error("Error sharing:", error.message);
        }
    };


    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Fare Calculation of {name} metro
                </Text>
                <TouchableOpacity style={styles.backButton} onPress={handleShare}>
                    <AnimatedTabIcon icon="square.and.arrow.up" color={bgColor} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <View style={styles.card}>
                    <Text style={[styles.label, { color: bgColor }]}>From</Text>
                    <SearchableDropdown dynamicData={stationList} />
                </View>

                <View style={styles.card}>
                    <Text style={[styles.label, { color: bgColor, paddingRight: 20 }]}>To</Text>
                    <SearchableDropdown dynamicData={stationList} />
                </View>

                <TouchableOpacity style={[styles.fareBtn, { backgroundColor: bgColor }]}>
                    <Text style={{ color: "#fff", fontSize: 16 }}>Get Fare</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.fareInfo}>
                {!isLoading && (
                    <View style={styles.emptyStateContainer}>
                        <LottieView
                            source={require('../../assets/animations/noInfo.json')}
                            autoPlay
                            loop
                            style={styles.animation}
                        />
                        <Text style={[styles.infoText, { color: bgColor }]}>
                            Please select a station to get fare information
                        </Text>
                    </View>
                )}

            </View>

            {isLoading && <Loader />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        padding: 20,
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        flex: 1,
        marginRight: 10,
    },
    backButton: {
        borderRadius: 10,
        padding: 3,
        backgroundColor: "#fff",
    },
    content: {
        backgroundColor: "#fff",
        marginHorizontal: 10,
        marginVertical: 0,
        borderRadius: 10,
        padding: 10
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },

    fareInfo: {
        marginTop: 40,
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    fareBtn: {
        alignSelf: "flex-end",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 10
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },


    animation: {
        width: 200,
        height: 200,
    },
    infoText: {
        fontSize: 25,
        fontWeight: "600",
        color: "#00A693",
        textAlign: "center",
        lineHeight: 30,
    },


});

export default Index;
