
export class ServerConstants {
    public static PORT = 9001;
    public static MONGO_URL = 'mongodb://localhost:27017/CustomerClub';
    public static SERVER_URL = 'http://localhost';
    // Events
    public static NEW_USER_WAS_REGISTEREDHTTP_RESPONSE_MESSAGE = `Welcome {0} to {1} Customer Club`;

    // Http Response
    public static HTTP_RESPONSE_STATUS_OK_CODE = 200;

    // Http Error  Response
    public static HTTP_ERROR_RESPONSE_BAD_REQUEST_CODE = 400;
    public static HTTP_ERROR_RESPONSE_BAD_REQUEST_MESSAGE = 'The server could not understand the request, The request has bad syntax or missing fields.\n Please make sure you filled all the fields.\n' ;
    public static HTTP_ERROR_RESPONSE_DUPLICATE_USER_MESSAGE = 'The email you entered is already registered, please try to log in';


}
