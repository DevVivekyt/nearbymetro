import Toast from 'react-native-toast-message';

export const SuccessMessage = (message) => {
    Toast.show({
        type: 'success', // 'success' | 'error' | 'info'
        text1: message,
        position: "bottom"
    });
}

export const ErrorMessage = (message) => {
    Toast.show({
        type: 'error', // 'success' | 'error' | 'info'
        text1: message,
        position: "bottom" // or "bottom"

    });
}

export const InfoMessage = (message) => {
    Toast.show({
        type: 'info', // 'success' | 'error' | 'info'
        text1: message,
        position: "bottom"
    });
}

export const formatTo12Hour = (time24) => {
    if (!time24) return '-';
    const [hourStr, minute] = time24.split(':');
    let hour = parseInt(hourStr);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert 0 to 12
    return `${hour}:${minute} ${ampm}`;
};
