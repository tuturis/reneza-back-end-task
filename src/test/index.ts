import { startApp } from "../server"
import assert from "assert"
import { Server } from "http"
import axios, { AxiosRequestConfig } from "axios"
import fs from "fs"
import path from "path"
import FormData from "form-data"
class Test {
    server!: Server
    app: Promise<{ server: Server, config: { port: number | string, ip: String } }>
    config!: { port: number | string, ip: String }
    constructor() {
        this.app = startApp()
    }

    public async runTests() {
        const app = await this.app
        this.server = await app.server
        this.config = await app.config
        await this.testTrackerImageUpload()

    }
    public async testTrackerImageUpload() {
        let testTrackingImage = fs.readFileSync(path.resolve(__dirname, "empty-pixel.jpg"), { encoding: "base64" });
        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log(">>>>>")
        const formData = new FormData();
        const query = `mutation ($file: Upload!) { createTracker(file:$file) { id  inquiries {  ip  } fileUrl }}`;
        const variables = {
            file: null
        };
        const map = {
            "0": ["variables.project.file"]
        };
        formData.append("operations", JSON.stringify({ query, variables }))
        formData.append("map", JSON.stringify(map));
        formData.append("0", testTrackingImage);
        const request_config: AxiosRequestConfig = {
            method: "get",
            url: `localhost:${this.config.port}/graphql`,
            headers: { 'Content-Type': 'application/json' },

            data: formData
        };
        await axios(request_config)
            .then((response) => {
                console.log(response)
                return assert(response?.status === 200, "Failed to upload image")

            })
            .catch((reason) => {
                console.error(reason.toJSON())
            });
    }

}
const test = new Test()
test.runTests()
