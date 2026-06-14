import SeriesRepository from "../../../repository/series.repository.js";
import {
  ConflictError,
  NotFoundError,
} from "../../../shared/error/custom.errors.js";

export default class SeriesService {
  constructor() {
    this.seriesRepo = new SeriesRepository();
  }

  async createSeries(payload) {
    const existsName = await this.seriesRepo.findByName(payload.name);

    if (existsName) {
      throw new ConflictError("Series name already exists");
    }

    const existSeason = await this.seriesRepo.findBySeason(payload.season);

    if (existSeason) {
      throw new ConflictError("Season already exist");
    }
    return await this.seriesRepo.create(payload);
  }

  async getAllSeries() {
    return await this.seriesRepo.findAll();
  }

  async getAllSeriesById(id) {
    const series = await this.seriesRepo.findById(id);

    if (!series) {
      throw new NotFoundError("Series not found");
    }

    return series;
  }

  async updateSeries(id, payload) {
    const series = await this.seriesRepo.findById(id);

    if (!series) {
      throw new NotFoundError("Series not found");
    }

    return await this.seriesRepo.update(id, payload);
  }

  async deleteSeries(id) {
    const series = await this.seriesRepo.findById(id);

    if (!series) {
      throw new NotFoundError("Series not found");
    }

    return await this.seriesRepo.delete(id);
  }
}
