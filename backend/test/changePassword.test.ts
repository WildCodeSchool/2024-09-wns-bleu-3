// test/changePassword.test.ts

import { ForgotPassword } from "src/entities/ForgotPassword";
import { User } from "src/entities/User";
import * as argon2 from "argon2";
import UserResolver from "src/resolver/UserResolver";
import { afterEach, describe, expect, it, vi } from "vitest";

// Mock argon2 at the module level (safe approach)
vi.mock("argon2", () => ({
    hash: vi.fn().mockResolvedValue("fake-hashed-password"),
}));

describe("userRsolver", () => {
    describe("changePassword", () => {
        // Clean all mocks after each test to avoid redefining properties
        afterEach(() => {
            vi.restoreAllMocks();
        });

        it("should change password when code and password are valid", async () => {
            // Prepare fake user entity
            const fakeUser = {
                email: "bylo@duck.com",
                paswword: "Password1!",
                save: vi.fn(),
            };

            // Prepare fake forgot password entity
            const forgotPasswordUser = {
                email: "bylo@duck.com",
                randomCode: "verif-code",
                expiresAt: new Date(new Date().getTime() + 10 * 60000),
                remove: vi.fn(),
            };

            // Mock database calls
            vi.spyOn(ForgotPassword, "findOneBy").mockResolvedValue(forgotPasswordUser as any);
            vi.spyOn(User, "findOneByOrFail").mockResolvedValue(fakeUser as any);

            const resolver = new UserResolver();
            const result = await resolver.changePassword("verif-code", "Password1!", "Password1!");

            expect(result).toBe("Password has been successfully updated.");
            expect(argon2.hash).toHaveBeenCalledWith("Password1!");
            expect(User.findOneByOrFail).toHaveBeenCalledWith({ email: "bylo@duck.com" });
            expect(fakeUser.save).toHaveBeenCalled();
            expect(forgotPasswordUser.remove).toHaveBeenCalled();
        });
    });
});
