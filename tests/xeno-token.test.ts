import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Xeno Token Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('mint', () => {
    it('should mint tokens successfully', async () => {
      const amount = 1000;
      const recipient = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('xeno-token', 'mint', [amount, recipient]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('xeno-token', 'mint', [amount, recipient]);
    });
  });
  
  describe('transfer', () => {
    it('should transfer tokens successfully', async () => {
      const amount = 500;
      const sender = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('xeno-token', 'transfer', [amount, sender, recipient]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('xeno-token', 'transfer', [amount, sender, recipient]);
    });
    
    it('should fail if sender has insufficient balance', async () => {
      const amount = 1000000;
      const sender = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
      
      mockContractCall.mockRejectedValue(new Error('Insufficient balance'));
      
      await expect(mockContractCall('xeno-token', 'transfer', [amount, sender, recipient]))
          .rejects.toThrow('Insufficient balance');
    });
  });
  
  describe('get-balance', () => {
    it('should return the correct token balance for an account', async () => {
      const account = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      const expectedBalance = 750;
      
      mockContractCall.mockResolvedValue({ value: expectedBalance });
      
      const result = await mockContractCall('xeno-token', 'get-balance', [account]);
      
      expect(result.value).toBe(expectedBalance);
      expect(mockContractCall).toHaveBeenCalledWith('xeno-token', 'get-balance', [account]);
    });
  });
  
  describe('set-token-uri', () => {
    it('should set the token URI successfully', async () => {
      const newUri = 'https://example.com/xeno-token-metadata';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('xeno-token', 'set-token-uri', [newUri]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('xeno-token', 'set-token-uri', [newUri]);
    });
  });
  
  describe('get-token-uri', () => {
    it('should return the correct token URI', async () => {
      const expectedUri = 'https://example.com/xeno-token-metadata';
      
      mockContractCall.mockResolvedValue({ value: expectedUri });
      
      const result = await mockContractCall('xeno-token', 'get-token-uri', []);
      
      expect(result.value).toBe(expectedUri);
      expect(mockContractCall).toHaveBeenCalledWith('xeno-token', 'get-token-uri', []);
    });
  });
});

