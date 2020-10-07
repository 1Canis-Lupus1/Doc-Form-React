import {makeGetRequest} from './http-service';

export const docData=()=>{
    return new Promise((resolve,reject)=>{
        makeGetRequest(
            "http://178.128.127.115:3000/admin/v1/user/doc/5ede37431a52c86dba7f0051",
            true,
            null
        )
        .then(res =>{
            resolve(res.doctor);
            console.log(res);
        })
        .catch(error=>{
            console.log("API call error :",error);
            reject(error);
        });
    });
}