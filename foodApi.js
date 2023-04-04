export function debounce(callback, delay = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(...args);
        }, delay)
    }
};

export const getFoodApi = async s => {
    const request = await fetch(`https://api.frontendeval.com/fake/food/${s}`);
    const data = await request.json();

    return data;
};