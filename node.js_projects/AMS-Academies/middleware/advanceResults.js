// it is a function inside a function
const advancedResults = ( model , populate ) => async (req , res , next ) => {

    let query;
    
    // this is how an JSON Object manupulation is done.
    // converting a query into a string so that we can replace its values and then could be manuplated
    // ONLY FIRST MATCH is replaced.

    let queryStr = JSON.stringify(req.query)
    
    // This list contains the values which will be matched for properties in a bootcamp schema.
    // we remove these values and later we check these in if() statments as aff these function(select , sort)
    // to the query. these are the function
    let removeValue = ['select' , 'sort' , 'limit' , 'page']
    // making another copy of pagination.
    let queryCopy = { ...req.query }

    // deleting values from the query copy 
    removeValue.forEach(params => delete queryCopy[params])    
    
    // once fucntions are removed query is checked for logical operation and in api request we 
    // give locical function keyword as gt , lt etc , this keyword should have a $ sign in front of it to 
    // be exececuted in the query, this is how mongoose understands it
    queryStr = queryStr.replace(/\b(gt|lt|lte|gte|in)\b/ , match => `$${match}`);

    queryStr = JSON.parse(queryStr)
    // in the query object we can just keep on adding.
    
    // here model is from the paramerts see on top
    query = model.find(queryStr)

    // query is always in the form of a JSON Object
    if (req.query.select){

        const fields = req.query.select.split(',').join(' ');
        console.log("type of fields")
        console.log(typeof fields)
        // query = Bootcamp.select(fields)
        query = query.select(fields)
    }


    if(req.query.sort){
         
         const sortBy = req.query.sort.split(',').join(' ');
         console.log("my sort bys are ")
         console.log(sortBy);
         query = query.sort(sortBy)

        }
    
    // req.query is an JSON object so page no we need to specify in to an Integer
    // here page os used by startIndex/end index to make number of pages according to limit given in request
    // note # of pages depends on limit of documents per page
    // if no pages are specified in req.query 
    const page = parseInt(req.query.page , 10) || 1;
    
    const limit = parseInt(req.query.limit, 10) || 100;

    // startingIndex and endingindex is as its formula for pagination remember.
    const startingIndex = (page -1) * limit
    const endingIndex = page * limit;
    const total = await model.countDocuments()

    pagination = {}
    
    if( endingIndex < total){
        pagination.next = {
            page : page + 1,
            limit
        }
    }

    if(startingIndex > 0){
        pagination.prev ={
            page: page - 1,
            limit,
        }
    }

    query = query.skip(startingIndex).limit(limit)
    
    // here we are doing the dynamic populate. but we cant do it with path and select now.
    if(populate){

        query.populate(populate)
    
    }

    const results = await query

    res.advancedResults = {
        success:true,
        count: results.length,
        pagination,
        data:results, 
    }

    next();

}

module.exports = advancedResults