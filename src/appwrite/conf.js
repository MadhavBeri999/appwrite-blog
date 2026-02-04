import { Client, Account, ID, Databases, Storage, Query } from "appwrite";
import config from "../config/config";
export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl) /* YAHAN TAK TOH SAME HII HAI PEHLE CLIENT BANAN HAI HAI USKE BAAD WE WILL GET THE THINGS */
            .setProject(config.appwriteProjectID)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
        //same iske baad function banane shuru kardo just like the previous one only 

    }
    async createpost({ title, slug, content, featuredimage, status, userId }) {
        try {
            return await this.databases.createDocument({
                databaseId: config.appwriteDatabaseID,
                collectionId: config.appwriteTableID,
                documentId: slug,
                data: {
                    title, content, featuredimage, status, userId  //Things that we need to put so that to tell us what do we need to add in thsi for this only we passed the srgumnets in the
                }
            })

        } catch (error) {
            console.log("this is the error due to the createPost ", error)

        }

    }
    async updatepost(slug, { title, content, featuredimage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteTableID,
                slug,
                {
                    title,
                    content, featuredimage,
                    status
                }
            )

        } catch (error) {
            console.log("This error is due to the update document ", error)

        }


    }
    async deletepost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteTableID,
                slug
            )
            return true//Because this deleted one so on deleting we will return true and handle the tru things on the frontside

        } catch (error) {
            console.log("The error camw while deleting the", error)
            return false //we will be handling it in the frontend only that is false
        }

    }
    /* METHODS TO GET DOCUMENT START HERE */
    //1st method that is getting the document but only one at a time 
    async getpost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteTableID,
                slug
            )

        } catch (error) {
            console.log("This error can not be fetched using the single document ", error)
        }
    }
    //2nd  now need to get all the posts present in that 
    async getallposts(queries = [Query.equal("status", ["active"])])//not paasing parameter here because all of them are needed
    {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteTableID,
                queries

            )
        } catch (error) {
            console.log("This error is due to listing of all the documnets ", error)

        }


    }
    /*FILE UPLOADING STARTS FROM HERE */
    async fileupload(file) {
        try {
            return await this.bucket.createFile(   // file that we are needing to be upload
                config.appwriteBucketID,
                ID.unique(),//file id keliye slug nahin diya yahan par 
                file
            )

        } catch (error) {
            console.log("This error is due to the file uploading", error)

        }

    }
    async deletefile(fileId) {
        try {                ////while uplading the file we will return one file id look in above function that id we will put here if we want to delete something 

            await this.bucket.deleteFile(
                config.appwriteBucketID,
                fileId
            )
            return true
        } catch (error) {
            console.log("The error is due to deleting a file", error)

        }

    }
    // conf.js - Update only this method
    // conf.js
    // conf.js
    getfilepreview(fileId) {
        if (!fileId) return "";
        return this.bucket.getFileView(
            config.appwriteBucketID,
            fileId
        );
    }




}
const service = new Service()
export default service;