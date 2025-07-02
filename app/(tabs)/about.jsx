import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const about = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>WE ARE NOWGRAY.COM</Text>

            <Text style={styles.paragraph}>
                We are an expert team of IT solutions, providing software development, marketing, content writing and graphics designing at a very affordable price.
                Providing WordPress, Joomla, Magento website design, Desktop and mobile software development to Asian and American businesses since 2015.
            </Text>

            {/* About Image Placeholder */}
            <View style={styles.imageBox}>
                <Image
                    source={{ uri: 'https://www.nearbymetro.com/assets/About_Us-BnQkXYbN.png' }}
                    style={styles.aboutImage}
                />

            </View>

            <Text style={styles.subHeading}>
                We are a registered firm, known as Nowgray IT Services Pvt Ltd.
            </Text>

            <Text style={styles.paragraph}>
                For over 8 years, we have been creating high-performance websites, apps, and software that deliver ultimate digital experiences for financial services, insurance companies, nonprofits, and government agencies.
            </Text>

            <Text style={styles.sectionTitle}>Website Development</Text>
            <Text style={styles.paragraph}>
                Our web-development team uses the best-possible tools to ensure high traffic & engagement onto your web-site.
            </Text>

            <Text style={styles.sectionTitle}>Branding & Design</Text>
            <Text style={styles.paragraph}>
                As a leading Branding Company, we convert your virtual vision into reality with the help of some tailor-made high quality graphics & designs.
            </Text>

            <Text style={styles.sectionTitle}>Content Creation & Marketing</Text>
            <Text style={styles.paragraph}>
                An effective content marketing and development strategy allows you to bridge the gap between online and offline marketing initiatives, by creating a unanimous voice to tell your story.
            </Text>

            <Text style={styles.footer}>Powered and sponsored by Nowgray.com</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#eee',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 15,
        textAlign: 'center',
    },
    subHeading: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10,
        color: '#222',
    },
    paragraph: {
        fontSize: 15,
        color: '#555',
        lineHeight: 22,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 20,
        marginBottom: 6,
    },
    footer: {
        marginTop: 30,
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
    imageBox: {
        height: 180,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        borderRadius: 10,
    },
    imageText: {
        color: '#aaa',
        fontStyle: 'italic',
    },
    aboutImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginVertical: 20,
        resizeMode: 'cover',
        borderWidth: 0.6,
        borderColor: "#fff"
    },

});

export default about;
