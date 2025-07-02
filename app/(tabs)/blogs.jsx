import { Image, ScrollView, StyleSheet, Text } from 'react-native';

const blogs = () => {
    return (
        <ScrollView style={styles.container}>
            {/* Header Image */}


            {/* Blog Title */}
            <Text style={styles.heading}>Discover Delhi and calculate metro fare for Delhi</Text>

            {/* City Tag */}
            {/* <Text style={styles.city}>Delhi</Text> */}

            <Image
                source={{ uri: 'https://imgs.search.brave.com/Z4AiAL6HuLUXHQ-YUD6l3rOPVW02uG5bHPvHU0PReF8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudG9paW1nLmNv/bS9waG90by9tc2lk/LTU0NTU5MjEyLHdp/ZHRoLTk2LGhlaWdo/dC02NS5jbXM' }}
                style={styles.headerImage}
            />

            {/* Section Title */}
            <Text style={styles.subheading}>Delhi — Heart of Metros</Text>

            {/* Blog Content */}
            <Text style={styles.paragraph}>
                Delhi, often referred to as the heart of India, is a dynamic city located in northern India.
                It is known for its rich history, vibrant culture, and bustling markets.
            </Text>

            <Text style={styles.paragraph}>
                The city is home to numerous historical monuments and landmarks, making it a major cultural
                hub in the country. Delhi is also renowned for its diverse traditions, lively arts scene,
                and deep-rooted heritage. Visitors can explore iconic landmarks like the Red Fort, India
                Gate, and Qutub Minar, enjoy the serenity of Lodhi Gardens, or experience the energetic
                atmosphere of Connaught Place.
            </Text>

            <Text style={styles.paragraph}>
                The city’s culinary scene is equally impressive, offering a wide array of dining options
                from traditional North Indian cuisine to international flavors. Whether you're a history
                enthusiast, a shopping lover, or a foodie, Delhi has something for everyone. Its unique
                blend of old-world charm and modern urban life makes it a captivating destination worth
                exploring.
            </Text>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#eee',
    },
    headerImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 20,
        resizeMode: 'cover',
    },
    heading: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 6,
        color: '#222',
    },
    city: {
        fontSize: 16,
        fontWeight: '500',
        color: '#888',
        marginBottom: 12,
    },
    subheading: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 16,
        color: '#444',
        lineHeight: 24,
        marginBottom: 12,
    },
    fareHint: {
        fontSize: 15,
        color: '#666',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default blogs;
