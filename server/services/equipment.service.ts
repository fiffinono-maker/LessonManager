import { storage } from "../storage";
import type { InsertEquipment, Equipment, InsertGymEquipment } from "@shared/schema";

export class EquipmentService {
  async getEquipment(id: string): Promise<Equipment | undefined> {
    return storage.getEquipment(id);
  }

  async getAllEquipment(): Promise<Equipment[]> {
    return storage.getAllEquipment();
  }

  async createEquipment(equipment: InsertEquipment): Promise<Equipment> {
    return storage.createEquipment(equipment);
  }

  async updateEquipment(id: string, equipment: Partial<InsertEquipment>): Promise<void> {
    return storage.updateEquipment(id, equipment);
  }

  async deleteEquipment(id: string): Promise<void> {
    return storage.deleteEquipment(id);
  }

  async addGymEquipment(gymEquipment: InsertGymEquipment) {
    return storage.addGymEquipment(gymEquipment);
  }

  async getGymEquipment(gymId: string): Promise<Equipment[]> {
    return storage.getGymEquipment(gymId);
  }

  async removeGymEquipment(gymId: string, equipmentId: string): Promise<void> {
    return storage.removeGymEquipment(gymId, equipmentId);
  }
}
