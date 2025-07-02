import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Info = () => {
    const cards = [
        {
            id: 1,
            image: "https://www.nearbymetro.com/assets/lko1-tn0nYEHA.webp", // Replace with your own image
            text: 'Join Lucknow Metro Rail Corporation; Recruitment Open For 386 Executive, Non-Executive Posts',
        },
        {
            id: 2,
            image: "https://www.nearbymetro.com/assets/lko-2-RZ1mbVpr.webp", // Replace with your own image
            text: 'Lucknow Metro First From India To Get This International Award',
        },
        {
            id: 3,
            image: "https://www.nearbymetro.com/assets/metro_img-4vmvpSob.jpg",
            text: 'Pedestrian fatally struck by Metro train in South Los Angeles',
        },
        {
            id: 4,
            image: "https://media.assettype.com/freepressjournal/2025-05-12/opzffp8s/Untitled-design-2025-05-12T151947.390.jpg",
            text: 'Metro begins Tap-to-Exit pilot program at North Hollywood train station.',
        },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.cardContainer}>
                {cards.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.cardImage} />
                        <Text style={styles.cardText}>{item.text}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.infoHeading}>Interesting Facts about Lucknow Metro</Text>

                <Text style={styles.infoText}>• Lucknow Metro stands as a Mass Transit marvel catering to the urban landscape of Lucknow, Uttar Pradesh. It offers convenience, swiftness, affordability, and eco-consciousness as the pillars of its transportation ethos.</Text>

                <Text style={styles.infoText}>• The construction of the line commenced on September 27, 2014, marking the inception of its commercial service on September 5, 2017.</Text>

                <Text style={styles.infoText}>• The transformation saw the Lucknow Metro Rail Corporation (LMRC) rebranded as the Uttar Pradesh Metro Rail Corporation (UPMRC).</Text>

                <Text style={styles.infoText}>• The operational hours of Lucknow Metro commence at 6:00 AM with the first train, extending until 10:00 PM, marking the departure of the last train.</Text>

                <Text style={styles.infoText}>• LMRC has additionally facilitated complimentary RO drinking water, restroom facilities, as well as escalators and elevators at every station.</Text>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        padding: 12,
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: screenWidth / 2 - 18,
        backgroundColor: '#fff',
        marginBottom: 12,
        borderRadius: 10,
        elevation: 3,
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
    },
    cardText: {
        padding: 10,
        fontSize: 14,
        color: '#00796B',
        fontWeight: '600',
    },
    infoSection: {
        marginTop: 20,
    },
    infoHeading: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
        color: '#333',
    },
    infoText: {
        fontSize: 15,
        color: '#444',
        marginBottom: 10,
        lineHeight: 22,
        paddingLeft: 5,
    },

});

export default Info;
