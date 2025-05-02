// test/forgotPassword.test.ts

import { ForgotPassword } from 'src/entities/ForgotPassword';
import { User } from 'src/entities/User';
import UserResolver from 'src/resolver/UserResolver';

// Prepare resolver instance
const resolver = new UserResolver();

// Prepare mocked resend emails send function
const mockedResend = vi.fn().mockResolvedValue({ data: {}, error: null });

// Mock resend module at the top level (safe approach)
vi.mock('resend', () => ({
    Resend: vi.fn().mockImplementation(() => ({
        emails: {
            send: mockedResend,
        },
    })),
}));

describe('userResolver', () => {
    describe('forgotPassword', () => {

        // Reset all mocks after each test for isolation
        afterEach(() => {
            vi.restoreAllMocks();
        });

        it('should allow user to request a new reset code', async () => {
            // Prepare a fake existing user entity
            const fakeUser = {
                id: 1,
                email: 'bylo@duck.com',
                password: 'Password1!',
                username: 'johndoe',
            };

            // Mock User.findOneBy to return the fake user
            vi.spyOn(User, 'findOneBy').mockResolvedValue(fakeUser as any);

            // Mock ForgotPassword.save to simulate saving the reset request
            vi.spyOn(ForgotPassword, 'save').mockResolvedValue({
                email: fakeUser.email,
                randomCode: 'fake-code',
                expiresAt: new Date(),
            } as any);

            // Define required environment variable
            process.env.RESEND_API_KEY = 'fake-api-key';

            // Execute the forgotPassword method
            const result = await resolver.forgotPassword(fakeUser.email);

            // Assert that the email was sent
            expect(mockedResend).toHaveBeenCalled();

            // Assert that the resolver returns the expected success message
            expect(result).toBe('Verification code sent successfully.');
        });
    });
});
