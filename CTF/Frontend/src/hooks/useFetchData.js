import {useEffect, useState} from "react";
import axios from "axios";

const useFetchData = (url, paramsObj) => {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async (url, paramsObj) => {
            setLoading(true);
            try {
                const {data: response} = await axios.get(url, {
                  params: paramsObj
                });
                setData(response);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }

        fetchData(url, paramsObj);

    }, []);

    return {
        data,
        loading
    }

};

export default useFetchData;