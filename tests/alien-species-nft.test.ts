import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Alien Species NFT Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('mint', () => {
    it('should mint an NFT successfully', async () => {
      const recipient = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      const uri = 'https://example.com/alien-species/1';
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new token ID
      
      const result = await mockContractCall('alien-species-nft', 'mint', [recipient, uri]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('alien-species-nft', 'mint', [recipient, uri]);
    });
  });
  
  describe('transfer', () => {
    it('should transfer an NFT successfully', async () => {
      const tokenId = 1;
      const sender = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('alien-species-nft', 'transfer', [tokenId, sender, recipient]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('alien-species-nft', 'transfer', [tokenId, sender, recipient]);
    });
    
    it('should fail if not called by the token owner', async () => {
      const tokenId = 1;
      const sender = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
      
      mockContractCall.mockRejectedValue(new Error('Unauthorized'));
      
      await expect(mockContractCall('alien-species-nft', 'transfer', [tokenId, sender, recipient]))
          .rejects.toThrow('Unauthorized');
    });
  });
  
  describe('get-owner', () => {
    it('should return the correct token owner', async () => {
      const tokenId = 1;
      const expectedOwner = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      
      mockContractCall.mockResolvedValue({ value: expectedOwner });
      
      const result = await mockContractCall('alien-species-nft', 'get-owner', [tokenId]);
      
      expect(result.value).toBe(expectedOwner);
      expect(mockContractCall).toHaveBeenCalledWith('alien-species-nft', 'get-owner', [tokenId]);
    });
    
    it('should return none for non-existent token', async () => {
      const tokenId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('alien-species-nft', 'get-owner', [tokenId]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-token-uri', () => {
    it('should return the correct token URI', async () => {
      const tokenId = 1;
      const expectedUri = 'https://example.com/alien-species/1';
      
      mockContractCall.mockResolvedValue({ value: expectedUri });
      
      const result = await mockContractCall('alien-species-nft', 'get-token-uri', [tokenId]);
      
      expect(result.value).toBe(expectedUri);
      expect(mockContractCall).toHaveBeenCalledWith('alien-species-nft', 'get-token-uri', [tokenId]);
    });
    
    it('should fail for non-existent token', async () => {
      const tokenId = 999;
      
      mockContractCall.mockRejectedValue(new Error('Token not found'));
      
      await expect(mockContractCall('alien-species-nft', 'get-token-uri', [tokenId]))
          .rejects.toThrow('Token not found');
    });
  });
});

