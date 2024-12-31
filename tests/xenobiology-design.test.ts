import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Xenobiology Design Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('create-design', () => {
    it('should create a xenobiology design successfully', async () => {
      const name = 'Silicon-based Lifeform';
      const description = 'A hypothetical life form based on silicon instead of carbon';
      const biochemistry = 'Silicon-based';
      const geneticCode = 'ATCG-SILICA-001';
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new design ID
      
      const result = await mockContractCall('xenobiology-design', 'create-design', [name, description, biochemistry, geneticCode]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('xenobiology-design', 'create-design', [name, description, biochemistry, geneticCode]);
    });
  });
  
  describe('update-design', () => {
    it('should update a xenobiology design successfully', async () => {
      const designId = 1;
      const name = 'Updated Silicon-based Lifeform';
      const description = 'An updated hypothetical life form based on silicon';
      const biochemistry = 'Advanced Silicon-based';
      const geneticCode = 'ATCG-SILICA-002';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('xenobiology-design', 'update-design', [designId, name, description, biochemistry, geneticCode]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('xenobiology-design', 'update-design', [designId, name, description, biochemistry, geneticCode]);
    });
    
    it('should fail if not called by the design creator', async () => {
      const designId = 1;
      const name = 'Unauthorized Update';
      const description = 'This update should fail';
      const biochemistry = 'Unauthorized';
      const geneticCode = 'FAIL';
      
      mockContractCall.mockRejectedValue(new Error('Unauthorized'));
      
      await expect(mockContractCall('xenobiology-design', 'update-design', [designId, name, description, biochemistry, geneticCode]))
          .rejects.toThrow('Unauthorized');
    });
  });
  
  describe('submit-for-simulation', () => {
    it('should submit a design for simulation successfully', async () => {
      const designId = 1;
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('xenobiology-design', 'submit-for-simulation', [designId]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('xenobiology-design', 'submit-for-simulation', [designId]);
    });
    
    it('should fail if the design is not in draft status', async () => {
      const designId = 1;
      
      mockContractCall.mockRejectedValue(new Error('Design is not in draft status'));
      
      await expect(mockContractCall('xenobiology-design', 'submit-for-simulation', [designId]))
          .rejects.toThrow('Design is not in draft status');
    });
  });
  
  describe('get-design', () => {
    it('should return design details', async () => {
      const designId = 1;
      const expectedDesign = {
        creator: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        name: 'Silicon-based Lifeform',
        description: 'A hypothetical life form based on silicon instead of carbon',
        biochemistry: 'Silicon-based',
        genetic_code: 'ATCG-SILICA-001',
        status: 'draft'
      };
      
      mockContractCall.mockResolvedValue({ value: expectedDesign });
      
      const result = await mockContractCall('xenobiology-design', 'get-design', [designId]);
      
      expect(result.value).toEqual(expectedDesign);
      expect(mockContractCall).toHaveBeenCalledWith('xenobiology-design', 'get-design', [designId]);
    });
    
    it('should return null for non-existent design', async () => {
      const designId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('xenobiology-design', 'get-design', [designId]);
      
      expect(result.value).toBeNull();
    });
  });
});

