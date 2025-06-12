import { dataHealthCheck } from "src/config/db";
import { ForgotPassword } from "src/entities/ForgotPassword";

export async function cleanupExpiredCodes() {
    try {

        await dataHealthCheck.initialize();

        const now = new Date();

        const result = await ForgotPassword.createQueryBuilder()
            .delete()
            .where("expiresAt < :now", { now })
            .execute();
        console.log(`Expired password reset requests cleaned up: ${result.affected} record(s) deleted`);
    } catch (error) {
        console.error('Error during cleanup:', error);
    } finally {
        await dataHealthCheck.destroy();
    }
}

