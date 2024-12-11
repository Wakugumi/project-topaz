import { Division } from "../types/Division";
import api from './APIService';

const DivisionService = {


  /**
    * Get the division's name by Id
  * @param id Id of the division
  * @return Divison
  */
  async getDivision(id: string | null) {
    return api.get<Division[]>('divisions?id=' + id)

      .then(resolve => {
        return resolve.data[0]
      })
      .catch(error => {
        throw new Error(error || "Unknown error @ DivisionService");
      });
  }
}

export default DivisionService;
