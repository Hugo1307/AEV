export const getAuthorizationHeader = () => {
    const accessToken = localStorage.getItem("food_co_access_token");
    return "Bearer " + accessToken;
}
