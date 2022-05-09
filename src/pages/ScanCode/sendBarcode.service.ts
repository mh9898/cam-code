import {SendBarcode} from "@/services/barcode.service";

export const sendRequest = async (code: string) => {
    const res = await SendBarcode(code);
    console.log(res);
    return res;
};
