import {useEffect, useState} from "react";
import axios from "axios";

const usePostData = (url, bodyObj) => {

    const [data, setData] = useState({});

    useEffect(() => {

        const postData = async (url, bodyObj) => {
            try {
                const {data: response} = await axios.post(url, bodyObj);
                setData(response);
            } catch (error) {
                console.error(error);
            }
        }

        postData(url, bodyObj).then(() => {});

    }, []);

    return {
        data
    }

};

export default usePostData;
