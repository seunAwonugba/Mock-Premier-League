export interface QueryObjectInterface {
    [key: string]: any;
}
export const buildQueryObject = (
    params: QueryObjectInterface
): QueryObjectInterface => {
    const queryObject: QueryObjectInterface = {};

    for (const key in params) {
        if (params[key] !== undefined) {
            queryObject[key] = params[key];
        }
    }

    return queryObject;
};
