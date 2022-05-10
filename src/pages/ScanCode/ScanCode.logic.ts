export const getHexColor = (number: string) => {
    const strToNum = Number(number);
    if(!strToNum) return '#ffffff';
    return "#" + ("000000" + (strToNum >>> 0).toString(16)).slice(-6);
};
