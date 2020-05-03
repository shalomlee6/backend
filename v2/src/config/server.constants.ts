
export class ServerConstants {
    public static PORT = 9001;
    public static SALT_ROUNDS = 10;
    public static SERVER_URL = 'http://localhost';
    public static MONGO_URL = 'mongodb://localhost:27017/CustomerClub';
    

    // Events
    public static NEW_USER_WAS_REGISTEREDHTTP_RESPONSE_MESSAGE = `Welcome {0} to {1} Customer Club`;

    // Http Response
    public static HTTP_RESPONSE_STATUS_OK_CODE = 200;

    // Http Error Status Code
    public static HTTP_ERROR_RESPONSE_BAD_REQUEST_CODE = 400;
    public static HTTP_ERROR_RESPONSE_UNAUTHORIZED_REQUEST_CODE = 401;


    public static HTTP_ERROR_RESPONSE_NOT_FOUND_CODE = 404;

    public static HTTP_ERROR_RESPONSE_INTERNAL_SERVER_ERROR_CODE = 500;

    // Http Error Message
    public static HTTP_ERROR_RESPONSE_USER_NOT_FOUND_MESSAGE = 'No user was found...';
    public static HTTP_ERROR_RESPONSE_DUPLICATE_USER_MESSAGE = 'The email you entered is already registered, please try to login.';
    public static HTTP_ERROR_RESPONSE_BAD_REQUEST_MESSAGE = 'The server could not understand the request, The request has bad syntax or missing fields.\n Please make sure you filled all the fields.\n' ;
    public static HTTP_ERROR_RESPONSE_NOT_FOUND_MESSAGE = 'The server can not find the requested resource.';
    public static HTTP_ERROR_RESPONSE_NO_DOTENV_FILE = 'Error => App secret is not found!!! process.env file is missing or corrupted';
    public static HTTP_ERROR_RESPONSE_INTERNAL_SERVER_ERROR_MESSAGE = "The server has encountered a situation it doesn't know how to handle.";
    public static HTTP_ERROR_RESPONSE_DATABASE_URL_NOT_FOUND ='No active database url was found, exit the app.';

    // Http Success Message
    public static HTTP_SUCCESS_RESPONSE_NEW_USER_REGISTERED_MESSAGE = 'Welcome new user ';

}
