export const checkEmpty = (value: any) => {
    if ( value === undefined || value === "" || value === null || (typeof value === "object" && !Object.keys(value).length)){
        return true;
    }
}