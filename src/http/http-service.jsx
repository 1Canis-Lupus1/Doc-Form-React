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
      "Accept" : "application/json",
      "Content-Type" : "application/json"
    };
    return new Promise((resolve, reject) => {
      try {
        fetch(url + queryString, {
          method: "GET",
          headers: headers
        })
          .then(res => res.json())
          .then(jsonResponse => {
            resolve(jsonResponse)
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
