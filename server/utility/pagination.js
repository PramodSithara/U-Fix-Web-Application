const createPage = async (query) => {
    try{
        const searchItem = query.search;
        const item = { identification: new RegExp(searchItem, 'i') };
        return {
            key : item,
        }
        
    }
    catch(err){
        return {status:"error"};
    }
}

module.exports = { createPage }