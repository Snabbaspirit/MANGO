import JSONdb from 'simple-json-db';

export const createDataBase = () => {
    return new JSONdb('./data/db.json');
}