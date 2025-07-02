import SearchableDropdown from "@/components/Dropdown";
import Loader from "@/components/Loader";
import AnimatedTabIcon from "@/components/ui/AnimatedTabIcon";
import { fetchSingleMetroData, GetFareDetailsByStatiion } from "@/services/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from '../../components/ui/IconSymbol';
import { ErrorMessage, formatTo12Hour } from "../../constants/config";


const useFareDetails = () => {
    return useMutation({
        mutationFn: ({ id, payload }) => GetFareDetailsByStatiion(id, payload),
    });
};

const Index = () => {
    const { name, id, bgColor } = useLocalSearchParams();
    const { data, isLoading } = useQuery(["singleMetro", id], () => fetchSingleMetroData(id));

    const [selectedFromStation, setSelectedFromStation] = useState(null);
    const [selectedToStation, setSelectedToStation] = useState(null);
    const [fareData, setFareData] = useState(null);

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


    const { mutateAsync, isLoading: isFareLoading } = useFareDetails();


    const handleFareDetails = async () => {
        if (selectedFromStation && selectedToStation) {
            try {
                const payload = {
                    startStationName: selectedFromStation.label,
                    endStationName: selectedToStation.label,
                };

                const response = await mutateAsync({ id, payload });
                console.log(response);

                setFareData(response)

            } catch (error) {
                ErrorMessage("Failed to fetch fare details");
                console.error(error);
            }
        } else {
            ErrorMessage("Please select both stations");
        }
    };


    const InfoRow = ({ label, value, color, icon }) => (
        <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color }]}>{label}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                <IconSymbol size={16} name={icon} color={color} />
                <Text style={[styles.infoValue, { color }]}>{value ?? '-'}</Text>
            </View>
        </View>
    );



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
                    <SearchableDropdown dynamicData={stationList}
                        onValueChange={(selectedItem) => {
                            setSelectedFromStation(selectedItem)
                        }}
                    />
                </View>

                <View style={styles.card}>
                    <Text style={[styles.label, { color: bgColor, paddingRight: 20 }]}>To</Text>
                    <SearchableDropdown dynamicData={stationList}
                        onValueChange={(selectedItem) => {
                            setSelectedToStation(selectedItem);
                        }}
                    />
                </View>

                <TouchableOpacity style={[styles.fareBtn, { backgroundColor: bgColor }]} onPress={handleFareDetails}>
                    <Text style={{ color: "#fff", fontSize: 16 }}>Get Fare</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.fareInfo}>
                {!fareData ? (
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
                ) : <ScrollView style={{ width: "100%" }}>
                    <View style={styles.fareCardWrapper}>
                        <View style={styles.fareCard}>
                            <InfoRow label="TOKEN FARE" value={fareData?.fare?.Fare_Value} color={bgColor} icon={"indian.rupee"} />
                            <InfoRow label="NUMBER OF INTERCHANGES" value={fareData?.interchanges} color={bgColor} icon={"arrow-right-arrow-left"} />
                            <InfoRow label="NUMBER OF STATION" value={fareData?.stationNames?.length} color={bgColor} icon={"circle.m"} />
                            <InfoRow label="METRO GO SMART CARD FARE" value={fareData?.fare?.Smart_Card_Fare} color={bgColor} icon={"smart-card"} />
                            <InfoRow label="TRAVEL TIME" value={fareData?.fare?.Travel_Time} color={bgColor} />
                            <InfoRow label="FIRST TRAIN TIMING" value={formatTo12Hour(fareData?.fare?.First_Metro)} color={bgColor} />
                            <InfoRow label="LAST TRAIN TIMING" value={formatTo12Hour(fareData?.fare?.Last_Metro)} color={bgColor} />
                        </View>

                        <View style={styles.stationList}>
                            <Text style={[styles.stationListTitle, { color: bgColor, borderColor: bgColor }]}>STATION SUMMARY</Text>

                            {fareData?.stationNames?.map((station, index) => {
                                let stationName = '';

                                if (Array.isArray(station)) {
                                    stationName = station[0];
                                } else if (typeof station === 'object' && station !== null) {
                                    stationName = station.Station_Name;
                                } else if (typeof station === 'string') {
                                    stationName = station;
                                }

                                return (
                                    <View key={index} style={styles.stationItem}>
                                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                            <IconSymbol name="circle.m" size={14} color={bgColor} />
                                            <Text style={[styles.stationText, { color: bgColor }]}>{stationName}</Text>
                                        </View>
                                        <IconSymbol name="arrow.down.full" size={14} color={bgColor} />
                                    </View>
                                );
                            })}
                        </View>


                    </View>
                </ScrollView>

                }



            </View>

            {(isLoading || isFareLoading) && <Loader />}

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
        paddingTop: 30,
        backgroundColor: "#fff",
        borderTopLeftRadius: 50,
        justifyContent: "flex-start",
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

    fareCardWrapper: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    fareCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        padding: 16,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 0.6,
        borderColor: "#eee",
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: "600",
        flex: 1,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: "600",
        textAlign: "right",
    },
    stationList: {
        marginTop: 20,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        borderRadius: 12,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        padding: 16,
    },

    stationListTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 10,
        borderBottomWidth: 1.2
    },

    stationItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
        gap: 6,
    },

    stationText: {
        fontSize: 15,
        fontWeight: "500",
        paddingVertical: 10,
        borderBottomWidth: 0.6,
        borderColor: "#eee",
    },



});

export default Index;
