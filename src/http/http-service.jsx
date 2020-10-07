const queryParams = params => {
    let queryStrings = "?";
    const keys = Object.keys(params);
    keys.forEach((key, index) => {
      queryStrings += key + "=" + params[key];
      if (params[keys[index + 1]]) {
        queryStrings += "&";
      }
    });
    return queryStrings;
};

export const makeGetRequest = async (
    url,
    attachToken = true,
    params = null
  ) => {
    let queryString = "";
    if (params) {
      queryString = queryParams(params);
    }

    let headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    };
    if (attachToken) {
      try {
        const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlY2U0MjA0ZmZkOTliMGRkMTNhNDNjMSIsIl9pZCI6IjVlY2U0MjA0ZmZkOTliMGRkMTNhNDNjMSIsImZ1bGxOYW1lIjoiS2lyYW4gRGVibmF0aCIsImVtYWlsIjoidG90YW4wMDEwQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiQWRtaW4iLCJpc1N1cGVyQWRtaW4iOnRydWUsImlhdCI6MTYwMTk4Mjk3MiwiZXhwIjoxNjA0NTc0OTcyfQ.rnyN3M76h7xlzrZsY9gcIXa968uMcrW1J0o_GQzw-P0";
        headers["Authorization"] = "Bearer " + authToken;
        }
       catch (e) {
        console.log(e);
      }
    }


    return new Promise((resolve, reject) => {
      try {
        fetch(url+queryParams , {
          method: "GET",
          headers: headers
        })
          .then(res => res.json())
          .then(jsonResponse => {
            resolve(jsonResponse)
            console.log(jsonResponse)
          })
          .catch(e => {
            console.log("XHR GET Error: ", e);
            reject(e);
          });
      } catch (e) {
        console.log(e);
        reject();
      }
    });
};
