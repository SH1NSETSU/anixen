import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";

export default function useFetch(link) {
    const { baseURL } = useContext(Context);
    const [list, setList] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(baseURL + link, {
                    headers: {
                        Referer: 'https://s3embtaku.pro', // Specify the Referer header
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setList(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, [baseURL, link]);

    return list;
}
