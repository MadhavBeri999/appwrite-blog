import { Client, Account, ID } from "appwrite";
import config from "../config/config";
export class Authservice {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)//instead of setting the methods outside we have set them inside the js so that for the code optimization only being called when there is need
            .setProject(config.appwriteProjectID)
        this.account = new Account(this.client)//also now going to tell them that now since client is made therfore make its account now
        //Now since account has been setup from here the diffrent methods will now be made

        //things to learn
        //make the function as async function 
        //also handle the errors inside them in the form of try catch 
    }

    async createaccount(email, password, name) {
        try {
            // Appwrite requires password to be at least 8 characters
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // If account creation is successful, log them in
                return await this.login(email, password)
            } else {
                return userAccount;
            }
        } catch (error) {
            // Log the SPECIFIC error so we can see if it's "User already exists" or "Password too short"
            console.error("Appwrite service :: createaccount :: error", error);
            throw error; // This allows the UI to show the error message
        }
    }

    async login(email, password) {
        try {
            // This is where the 401 error is coming from
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Appwrite service :: login :: error ", error);
            throw error;
        }
    }
    async getcurrentuser() {
        try {
            return await this.account.get();
        } catch (error) {
            // User not logged in → this is NORMAL

            return null;
        }
    }
    async logout() {
        try {
            const deleteAccount = await this.account.deleteSessions()
            return deleteAccount

        } catch (error) {
            console.log("this is error is due to the logout ", error)

        }
    }





}
const authService = new Authservice()
export default authService//EXPORT TOH OBJECT KARNA HAI NA KI CLASS PHIR TOH KOI FAIDA NAHI SINCE WE NEED TO MAKE OBJECT THEN WE WILOL BE MOOVING FURTHER SO PEHLE HI OBJECT BANAO AUR USSSE HI EXPORT KARO