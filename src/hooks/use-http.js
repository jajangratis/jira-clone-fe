import axios from 'axios';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

const initUrl = 'http://localhost:5000/skripsi/api/v1'

export const useHttp = function useHttp(url, setToken = true, config={
  method: 'GET',
  headers: {},
  data: {}
}) {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const authState = useSelector(state => state.auth)

  if (setToken) {
    config.headers.authorization = authState.token
  }
  useCallback(() => {
    (
      async function(){
        setPending(true)
        try {
          let request = await axios({
            url: initUrl + url,
            headers: config.headers,
            method: config.method,
            data: config.data
          })
          setPending(false)
          setData(request.data)
        } catch (error) {
          setPending(false)
          setError(true)
          setErrorMessage(error.response?.data)
        } 
      }
  )()
  }, [config, url])
  return {data, error, pending, errorMessage}

}
