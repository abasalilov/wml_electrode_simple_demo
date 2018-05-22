import axios from "axios";
import { CarQuery } from "car-query";


export default class DropDownUtil {
  constructor() {
    this.year = null;
    this.make = null;
    this.model_name = null;
    this.model_id = null;
    this.engSize = null;
    this.trims = null;
  }

  sortMakes(data) {
    return data.filter((a) => a.isCommon === true);
  };

  sortModels(data) {
    return data.sort((a, b) => {
      if(a.name.toUpperCase() < b.name.toUpperCase()) return -1;
      if(a.name.toUpperCase() > b.name.toUpperCase()) return 1;
      return 0;
    });
  };

  // add an update fn here;

  setYear(yr) {
    this.year = yr;
  }

  setMake(make) {
    this.make = make;
  }

  setModel(name) {
    this.model_name = name;
  }

  setEngineSize(engSize){
      this.engSize = engSize;
  }

  getYears() {
    const years = {minYear: 1941, maxYear:  new Date().getFullYear()};
    return years;
  };

  async getNewModels(make) {
    const carMakesReq = makeNHTSAReq(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    );
    try {
      const carMakesResponse = await carMakesReq();
      return this.sortMakes(carMakesResponse.data.Results);
    } catch (e) {
      console.log("Error in the request", e);
      return e;
    }
  }

  async getModelsByMake(make) {
    const url =
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/" +
      make +
      "?format=json";
    const modelsReq = makeNHTSAReq(url);
    try {
      const modelsResponse = await modelsReq();
    } catch (e) {
      console.log("Error in the request", e);
      return e;
    }
  }
  
  async getAllMakes() {
    const makesReq = makeNHTSAReq(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    );
    try {
      const makeResponse = await makesReq();
      return makeResponse.data.Results;
    } catch (e) {
      console.log("Error in the request", e);
      return e;
    }
  };

  async getMakesByYear(yr) {
    const carQuery = new CarQuery();
    const makeResults = await carQuery.getMakes(yr).then(makes => makes);
    return makeResults;
  };
  

  async getAllUSMakesByYear(year) {
    try {
      const carQuery = new CarQuery();
      const makes = await carQuery.getMakes().then(makes => makes);
      return this.sortMakes(makes);
    } catch (e) {
      console.log("Error in the request", e);
      return e;
    }
  };

  async getModels() {

    const searchCriteria = {
      year: this.year,
      make: this.make,
      soldInUSA: true,
    };

    try {
      const carQuery = new CarQuery();
      const models = await carQuery.getModels(searchCriteria).then(models => models);
      return this.sortModels(models);
    } catch (e) {
      console.log("Error in the request", e);
      return e;
    }
  }

  async getTrims() {
    const trimsArr = [];
    const searchCriteria = {
      year: this.year,
      make: this.make,
    };
    const carQuery = new CarQuery();
    const trims = await carQuery.getTrims(searchCriteria).then(engineData => engineData);
    trims.forEach(trim => {
      if(trim.name === this.model_name){
        trimsArr.push({modelId: trim.modelId, engine: this.getEngine(trim)});
      };
    });
    this.trims = trimsArr;
    return trimsArr;
  };

  async getModelData(modelId){
    const id = modelId ? modeId : this.model_id;
    
    if(!id){
      return false;
    }

    try {
      const carQuery = new CarQuery();
      const data = await carQuery.getModelDetail(modelId).then(data => data);
      return data;
    } catch (e) {
      console.log("Error in the request", e);
      return e;
    }
  }

  getEngine(data){
    // console.log('data into the engines', data)
    const cylinders = data.engineCyclinders + " Cylinders";
    const engSizeLiters = data.engineCC / 1000;
    const roundedEngSizeLiters = Number(Math.round(engSizeLiters+'e1')+'e-1') + ' L ';
    return {cylinders: cylinders, engineSize: roundedEngSizeLiters, trim: data.trim }
  }

};