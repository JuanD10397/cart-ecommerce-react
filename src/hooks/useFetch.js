import { useState, useEffect } from 'react';

// Recibe url a la que se hará la petición http y opciones
export default function useFetch(url, options){
    
    //Estados loading (si está cargando o no), result (si tiene resultado o no), error (si da error)
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try{
                const res = await fetch(url, options);
                const json = await res.json();
                setResult(json);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        })();
    }, [options, url]);


    return { loading, result, error };
}