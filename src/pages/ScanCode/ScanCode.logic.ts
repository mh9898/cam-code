export const getHexColor = (number: string) => {
    const strToNum = Number(number);
    if(!strToNum) return '#989a81';
    return "#" + ("000000" + (strToNum >>> 0).toString(16)).slice(-6);
};
