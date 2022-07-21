class ErrorResponse extends Error{

    constructor(message , status){
        super(message)
        this.statusCode = status;
    }
}


module.exports = ErrorResponse;

// this calass is used to display our custom errors responces rather then have general 
// erros msges as displayed below , we can now pin point the cause of error.
// BUT
// this is the default error object thrown by the errohandler middleware.
// {
//     "stringValue": "\"615aa16ddbe19908d048f673-111\"",
//     "valueType": "string",
//     "kind": "ObjectId",
//     "value": "615aa16ddbe19908d048f673-111",
//     "path": "_id",
//     "reason": {},
//     "name": "CastError",
//     "message": "Cast to ObjectId failed for value \"615aa16ddbe19908d048f673-111\" (type string) at path \"_id\" for model \"Bootcamp\""
// }