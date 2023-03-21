import { Response } from 'express';
import { handleControllerError } from './handleControllerError';

describe('handleControllerError', () => {
    const mockResponse: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

  it('should handle an Error object', () => {
    const error = new Error('Test error');
    const expectedResponse = { error: 'Test error' };
    handleControllerError(mockResponse, error, 'Internal server error');
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
  });

  it('should handle a non-Error object', () => {
    const error = 'Test error';
    const expectedResponse = { error: 'Internal server error' };
    handleControllerError(mockResponse, error, 'Internal server error');
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
  });
});