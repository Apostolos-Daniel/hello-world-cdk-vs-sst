// lambda/hello.ts
exports.handler = async (event: any) => {
    console.log("Request event: ", event);
    let responseMessage = `Hello, World! I'm a CDK App. The time is ${new Date().toISOString()}`;

    return {
        statusCode: 200,
        body: JSON.stringify({ message: responseMessage }),
        headers: {
            'Content-Type': 'application/json',
        },
    };
};
