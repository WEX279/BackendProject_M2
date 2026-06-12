import { isSafe } from "./password.js";
import { describe, it, expect } from "vitest";

describe("isSafe", () => {
    it("returns true if password >= 6 characters", () =>{
        //preparacion test
        const password = "ingaturroña"

        //ejectuar
        const result = isSafe(password)

        expect(result).toBe(true)
    })
    
    // it("returns false if password beetwen 12 and 16 characters", ()=>{
    //     const password = "ingaturroñaf"

    //     const result = isSafe(password)

    //     expect(result).toBe(false)
    // })
})

