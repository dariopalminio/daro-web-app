//export const DB_CONNECTION=`mongodb+srv://${process.env.SERVER_BFF_MONGO_USERNAME}:${process.env.SERVER_BFF_MONGO_USERPASSWORD}@${process.env.SERVER_BFF_MONGO_HOST}/${process.env.SERVER_BFF_MONGO_DB}?retryWrites=true&w=majority`;
export let DB_CONNECTION=`mongodb+srv://`;
DB_CONNECTION+=`${process.env.SERVER_BFF_MONGO_USERNAME}:`;
DB_CONNECTION+=`${process.env.SERVER_BFF_MONGO_USERPASSWORD}@`;
DB_CONNECTION+=`${process.env.SERVER_BFF_MONGO_HOST}/`;
DB_CONNECTION+=`${process.env.SERVER_BFF_MONGO_DB}?retryWrites=true&w=majority`;