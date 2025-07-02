import axios from "axios";

export const fetchMetroData = async () => {
    const response = await axios.get('https://metrotestapi.nowgray.live/api/v1/stations/getmaster');
    return response.data;
};

export const fetchSingleMetroData = async (id) => {
    const response = await axios.get(`https://metrotestapi.nowgray.live/api/v1/stations/getmasterstation/${id}`)
    return response.data;
}

export const GetFareDetailsByStatiion = async (id, payload) => {
    const response = await axios.post(`https://metrotestapi.nowgray.live/api/v1/stations/stationsbetweentwopoints/${id}`, payload)
    return response.data;
}