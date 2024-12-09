import request from "supertest";
import { describe, expect, it, vi} from "vitest";
import app from "../../Hito-1/src/app";
import { PetModel } from "../src/models/pets.model";
import { generateAccessToken } from "../src/util/auth.util";

//get pet
vi.mock("../src/models/pets.model", ()=>{
    return {
        PetModel:{
            findAll:vi.fn(async()=>[]),
            findById:vi.fn(async()=>[{ 
                "id": "0ad87a27-c2b4-4139-bcbc-c9f148dcabd5",
                "name": "juanito",
                "age": 10,
                "type": "gato",
                "user_id": "f5473528-fe83-4e4b-a4de-93cf477ce4ed"
            }])
        }
    }
})

describe("GET /pet", () => {
   it("GET /pet, should return code 200", async () => {
    const token = generateAccessToken("test@test.com", "1");
    const { statusCode, body } = await request(app)
    .get("/api/v1/pet")
    .set("Authorization", `Bearer ${token}`);
    expect(statusCode).toBe(200);   
    });

    it('GET/pet/:id, should return one pet for id if exist ', async () => {    
        const token = generateAccessToken("test@test.com", "1");
        const { statusCode, body } = await request(app)
    .get("/api/v1/pet/0ad87a27-c2b4-4139-bcbc-c9f148dcabd5")
    .set("Authorization", `Bearer ${token}`);
        expect(statusCode).toBe(200);
        expect(body).toEqual([{ 
            "id": "0ad87a27-c2b4-4139-bcbc-c9f148dcabd5",
            "name": "juanito",
            "age": 10,
            "type": "gato",
            "user_id": "f5473528-fe83-4e4b-a4de-93cf477ce4ed"
        }]);
    });

    it('GET /pet/:id, return a 404 if the request does not exist', async () => {
        const token = generateAccessToken("test@test.com", "1");
        const { statusCode, body } = await request(app).get('/api/v1/99');
        expect(statusCode).toBe(404);
      });

});

