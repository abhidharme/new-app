// import axios from "axios";

// export const ApiClient = async (api, method, body) => {
//     let token = localStorage.getItem("token");

//     try {
//         token = localStorage.getItem("token")
//         var config = {
//             method: method,
//             url: `${process.env.NEXT_PUBLIC_API_URL}/${api}`,
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`,

//                 //added temprory
//                 'ngrok-skip-browser-warning': 'true'
//             },
//             data: JSON.stringify(body),
//         };
//         const res = await axios(config);
//         return res;
//     } catch (error) {
//         //    console.log("ERR------->> :", error)
//         throw error;
//     }
// };

import axios from "axios";

export const ApiClient = async (api, method, body) => {
    let token = localStorage.getItem("token");
    // eslint-disable-next-line no-useless-catch
    try {
        var config = {
            method: method,
            url: `https://api.externtalent.com/${api}`,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": body instanceof FormData ? "multipart/form-data" : "application/json",
            },
            data: body instanceof FormData ? body : JSON.stringify(body),
        };

        const res = await axios(config);
        return res;
    } catch (error) {
        throw error;
    }
};
