import { publicUser } from "./user.js";

import { it, expect, describe } from "vitest";


describe("publicUser", ()=>{
    it("returns only id and email, without password",()=>{
        const user = {
            id: "sljdbf",
            email:"kwu@kwqef.com",
            password: "alsdhbc"
        };

        const result = publicUser(user)

        expect(result).toEqual({ id: "sljdbf", email:"kwu@kwqef.com"})
    })
    }
)