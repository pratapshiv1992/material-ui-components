import {getRandomUserData, getRandomProjectData} from './randomData'

const callAPi = (url, method, data, size = 4, type = 'user') => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                status: 'ok',
                result: type == 'user' ? getRandomUserData(size) : getRandomProjectData(size)
            });
        }, 1000);
    });
}

export default callAPi;
