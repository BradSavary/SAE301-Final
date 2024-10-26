import { getRequest } from '../lib/api-request.js';


let CategoryData = {};

let fakeCategory = [
    {
        id_category: 1,
        libelle_cate: "Sleeves",
    },
    {
        id_category: 2,
        libelle_cate: "Sleeves",
    },
    {
        id_category: 3,
        libelle_cate: "Sleeves",
    }
];

CategoryData.fetch = async function (id) {
    let data = await getRequest('categorys/' + id);
    return data == false ? fakeCategory.pop() : [data];
}

CategoryData.fetchAll = async function () {
    let data = await getRequest('categorys');
    return data == false ? fakeCategory : data;
}



export { CategoryData };