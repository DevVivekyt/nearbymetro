import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
    { label: 'Delhi Metro', value: 'delhi' },
    { label: 'Mumbai Metro', value: 'mumbai' },
    { label: 'Hyderabad Metro', value: 'hyderabad' },
    { label: 'Kolkata Metro', value: 'kolkata' },
];

const SearchableDropdown = ({ dynamicData, onValueChange }) => {
    const [value, setValue] = useState(null);

    return (
        <View style={styles.container}>
            <Dropdown
                style={styles.dropdown}
                data={dynamicData || data}
                search
                searchPlaceholder="Search metro..."
                labelField="label"
                valueField="value"
                placeholder="Select metro"
                value={value}
                onChange={item => {
                    setValue(item.value);
                    onValueChange?.(item);
                }}

            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1
    },
    dropdown: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
});

export default SearchableDropdown;
