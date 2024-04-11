export const resolveKpi = async (body: any): Promise<any> => {
  try {
    throw new Error('Not implemented yet!');
  } catch (error) {
    return createResponse(500, error.message);
  }
};

function createResponse(statusCode: number, body: object | Error): any {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode,
    body,
  };
}
