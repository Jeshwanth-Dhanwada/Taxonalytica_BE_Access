// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import { OA_DETMaster } from "../entity/OA_DET";
import { JobAssign } from "../entity/JobAssign";
import { webhookRequestActivity } from "./webhookActivityController";
import path from "path";
const axios = require("axios");
const fs = require('fs');
//const path = require('path');
//const filePath = "D:\CRM-BE\Taxonalytica_BE_Access\constants\data.json";
//const filePath = "/home/ec2-user/Taxonalytica_BE_Access/constants/data.json";
const filePath = path.resolve(__dirname, "..", "..", "constants", "data.json")
// const config = {
//     user: 'newuser',
//     password: 'Root@123',
//     server: 'LAPTOP-ODV7LQNH',
//     database: 'Taxonanalytica',
//     // options: {
//     //   encrypt: true, // For Azure SQL Database
//     // },
// };

const config = {
    user: 'admin',
    password: 'Taxonanalytica123',
    server: 'taxonanalytica-test-db.cvwye62cqdiq.ap-south-1.rds.amazonaws.com',
    database: 'taxonanalytica-test-db',
    // options: {
    //   encrypt: true, // For Azure SQL Database
    // },
};

export const webhookTest = async (req: Request, res: Response) => {
    try {
        let body_param = req.body;
        console.log(req.body, "reqq");
        const token = 'EAADs4mGRLYwBO0qT3MAAdAr5VPHevUaw6omXrtQ1uoFPZB4UpsrdFbO31EG08htQymnanLZAeZABZAYdXZAx5q5Kh5RHzgBZBY2Q6reiZBS85q5bF7mXiTSfdTLeVkCP4UFPi4UbX8um4Lg1irt2sh76YzbJkhiFZCQaXDOFMbMhRTIswR03XeM1ko7GpZCCX9SidqOop5jTLzLkiMwI0HPdZAhWzZCNnjniCpfZAOUZD';

        if (body_param.object) {
            console.log(JSON.stringify(body_param, null, 2));
        }

        if (body_param.object) {
            //console.log("inside body param" + JSON.stringify(body_param.entry[0].changes[0].value.messages));
            if (body_param.entry &&
                body_param.entry[0].changes &&
                body_param.entry[0].changes[0].value.messages &&
                body_param.entry[0].changes[0].value.messages[0]
            ) {
                console.log("inside bodyyyyy");
                let phon_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
                let from = body_param.entry[0].changes[0].value.messages[0].from;
                let msg = body_param.entry[0].changes[0].value.messages[0];
                console.log(phon_no_id, from, msg, "insideeee**");
                // const readData = JSON.parse(fs.readFileSync(filePath));

                console.log(msg?.type, "readdddd");

                if (msg?.type === "text") {
                    console.log("resulttt");
                    let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
                    axios({
                        method: "POST",
                        url: "https://graph.facebook.com/v18.0/" + phon_no_id + "/messages?access_token=" + token,
                        data: {
                            messaging_product: "whatsapp",
                            to: from,
                            text: {
                                body: `Please enter Item name`
                            }
                        },
                        headers: {
                            "Content-Type": "application/json"
                        }

                    });
                    //}
                }
            }
            console.log("phone number " + phon_no_id);
            console.log("from " + from);
            //console.log("boady param " + msg_body);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        return InternalServerError(res, error);
    }
}
