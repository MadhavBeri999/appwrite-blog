const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),     /*Acess toh usi tarike se karna hai
    par now we have the gurantee that it will always come in the string always !!! */
    appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteTableID: String(import.meta.env.VITE_APPWRITE_TABLE_ID)


}
export default config;