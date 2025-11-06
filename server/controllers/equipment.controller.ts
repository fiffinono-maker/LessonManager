import { Router, type Request, type Response } from "express";
import { EquipmentService } from "../services/equipment.service";
import { insertEquipmentSchema, insertGymEquipmentSchema } from "@shared/schema";

export class EquipmentController {
  constructor(private equipmentService: EquipmentService) {}

  buildRouter(): Router {
    const router = Router();

    router.get("/", this.getAllEquipment.bind(this));
    router.get("/:id", this.getEquipment.bind(this));
    router.post("/", this.createEquipment.bind(this));
    router.patch("/:id", this.updateEquipment.bind(this));
    router.delete("/:id", this.deleteEquipment.bind(this));

    router.post("/gym", this.addGymEquipment.bind(this));
    router.get("/gym/:gymId", this.getGymEquipment.bind(this));
    router.delete("/gym/:gymId/:equipmentId", this.removeGymEquipment.bind(this));

    return router;
  }

  async getAllEquipment(req: Request, res: Response) {
    try {
      const equipment = await this.equipmentService.getAllEquipment();
      res.json(equipment);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getEquipment(req: Request, res: Response) {
    try {
      const equipment = await this.equipmentService.getEquipment(req.params.id);
      if (!equipment) {
        return res.status(404).json({ message: "Equipment not found" });
      }
      res.json(equipment);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createEquipment(req: Request, res: Response) {
    try {
      const data = insertEquipmentSchema.parse(req.body);
      const equipment = await this.equipmentService.createEquipment(data);
      res.status(201).json(equipment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateEquipment(req: Request, res: Response) {
    try {
      await this.equipmentService.updateEquipment(req.params.id, req.body);
      res.json({ message: "Equipment updated successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteEquipment(req: Request, res: Response) {
    try {
      await this.equipmentService.deleteEquipment(req.params.id);
      res.json({ message: "Equipment deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async addGymEquipment(req: Request, res: Response) {
    try {
      const data = insertGymEquipmentSchema.parse(req.body);
      const gymEquipment = await this.equipmentService.addGymEquipment(data);
      res.status(201).json(gymEquipment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getGymEquipment(req: Request, res: Response) {
    try {
      const equipment = await this.equipmentService.getGymEquipment(req.params.gymId);
      res.json(equipment);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async removeGymEquipment(req: Request, res: Response) {
    try {
      await this.equipmentService.removeGymEquipment(req.params.gymId, req.params.equipmentId);
      res.json({ message: "Equipment removed from gym successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
