import { useEffect } from "react";
import axios from "axios";

const TestFetch = () => {
    useEffect(() => {
        const fetchData = async () => {
            console.time("API Call");
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/test");
                console.log("Response Data:", response.data.message);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            console.timeEnd("API Call");
        };

        fetchData();
    }, []);


    return null;
};

export default TestFetch;
