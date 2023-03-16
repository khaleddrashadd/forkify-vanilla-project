import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

//setting a time for loading the page so if there is super bad conncetion the code willl not run after a certain time
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    //if timeout came first then it will come with reject(ERROR)and it won't await respose.json()for it but will go to catch
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};

/*
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    //if timeout came first then it will come with reject(ERROR)and it won't await respose.json()for it but will go to catch
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    //if timeout came first then it will come with reject(ERROR)and it won't await respose.json()for it but will go to catch
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
*/
