import {makeGetRequest} from './http-service';

export const docData=()=>{
    return new Promise((resolve,reject)=>{
        makeGetRequest(
            "http://178.128.127.115:3000/admin/v1/user/doc/5ede37431a52c86dba7f0051",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlY2U0MjA0ZmZkOTliMGRkMTNhNDNjMSIsIl9pZCI6IjVlY2U0MjA0ZmZkOTliMGRkMTNhNDNjMSIsImZ1bGxOYW1lIjoiS2lyYW4gRGVibmF0aCIsImVtYWlsIjoidG90YW4wMDEwQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiQWRtaW4iLCJpc1N1cGVyQWRtaW4iOnRydWUsImlhdCI6MTYwMTk4Mjk3MiwiZXhwIjoxNjA0NTc0OTcyfQ.rnyN3M76h7xlzrZsY9gcIXa968uMcrW1J0o_GQzw-P0",
            null
        )
        .then(res =>{
            resolve(res.data);
            console.log(res);
        })
        .catch(error=>{
            console.log("API call error :",error);
            reject(error);
        });
    });
}