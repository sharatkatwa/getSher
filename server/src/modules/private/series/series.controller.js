import SeriesService from "./series.service.js";

export default class SeriesController {
  constructor() {
    this.seriesService = new SeriesService();
  }

  async createSeries(req, res) {
    const series = await this.seriesService.createSeries(req.body);

    res.status(201).json({
      data: series,
    });
  }

  async getAllSeries(req, res) {
    const series = await this.seriesService.getAllSeries();

    res.json({
      data: series,
    });
  }

  async getSeriesById(req, res) {
    const series = await this.seriesService.getAllSeriesById(req.params.id);

    res.json({ data: series });
  }

  async updateSeries(req, res) {
    const series = await this.seriesService.updateSeries(
      req.params.id,
      req.body,
    );

    res.json({
      data: series,
    });
  }

  async deleteSeries(req, res) {
    await this.seriesService.deleteSeries(req.params.id);

    res.json({
      message: "Series deleted",
    });
  }
}
