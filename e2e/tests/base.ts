import {test as base } from '@playwright/test';

type MyFixtures = {
    exceptionLogger: void;
}

export const test = base.extend<MyFixtures>({
    exceptionLogger: [
            async ({page}, use, testInfo) => {
                const errors: Error[] = [];
                // push errors if there is any
                page.on('pageerror', (error: Error) => {
                    errors.push(error);
                })
        
                page.on('console', msg => {
                    if (msg.type() === 'error') {
                        console.error('Console error:', msg.text());
                        errors.push(new Error(`Console error: ${msg.text()}`));
                    }
                });

                await use()

                if(errors.length > 0 && testInfo.status === 'passed') {
                    await testInfo.attach("frontend-errors", {
                        body: errors.map(error => `${error.message}\n${error.stack}`).join("\n-----\n"), 
                        contentType: "text/plain",
                    })
                    throw new Error('Test failed due to errors in the console or page.');
                }

        },
        { auto: true }
    ],
});

export { expect } from '@playwright/test';