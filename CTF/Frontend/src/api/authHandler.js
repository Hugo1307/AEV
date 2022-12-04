export const getAuthorizationHeader = () => {
    const accessToken = localStorage.getItem("food_co_access_token");
    return "Bearer " + accessToken;
}

export const removeAccessToken = () => {
    localStorage.removeItem("food_co_access_token");
}

export const setAccessToken = (accessToken) => {
    localStorage.setItem("food_co_access_token", accessToken);
}
