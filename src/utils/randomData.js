import faker from "faker";

export const sorByDate = (data) => {
    data.sort(function compare(a, b) {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA - dateB;
    });
    return data;
}

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export function getRandomUserData(size = 5) {
    const result = [];
    for (let i = 0; i < size; ++i) {
        const userObj = {
            created_at: formatDate(faker.date.past()),
            id: faker.random.uuid(),
            old_value: faker.name.findName(),
            new_vlaue: faker.name.findName()
        }
        result.push(userObj);
    }
    return sorByDate(result);
}

export function getRandomProjectData(size = 5) {
    const result = [];
    for (let i = 0; i < size; ++i) {
        const userObj = {
            created_at: formatDate(faker.date.past()),
            id: faker.random.uuid(),
            old_value: faker.internet.domainWord(),
            new_vlaue: faker.internet.domainWord()
        }
        result.push(userObj);
    }
    return sorByDate(result);
}
