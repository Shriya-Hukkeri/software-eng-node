import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";


/**
 * @class this class represents all th information about a User
 * @property {String} username User's name for teh account he owns
 * @property {String} password User's password for his account
 * @property {String} firstname User's first name
 * @property {String} lastname User's last name
 * @property {String} email User's email
 * @property {String} profilePhoto User's profile photo
 * @property {String} headerImage user's header image
 * @property {String} accountType The account type of the user
 * @property {String} maritalStatus The marital status of the user
 * @property {String} biography User's biography
 * @property {Date} dateOfBirth user's birthday
 * @property {Date} joined the date on which the user created his account
 * @property {Location} location User's location
 */
export default class User{
    private username: string = '';
    private password: string = '';
    private firstName: string | null = null;
    private lastName: string | null = null;
    private email: string = '';
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biography: string | null = null;
    private dateOfBirth: Date | null = null;
    private joined: Date = new Date();
    private location: Location | null = null;
}


