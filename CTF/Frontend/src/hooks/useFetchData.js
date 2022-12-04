import {useEffect, useState} from "react";
import axios from "axios";

import {getAuthorizationHeader} from "../api/authHandler";

const useFetchData = (url, paramsObj) => {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async (url, paramsObj) => {
            setLoading(true);
            try {
                const {data: response} = await axios.get(url, {
                    params: paramsObj,
                    headers: {Authorization: getAuthorizationHeader()}
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
