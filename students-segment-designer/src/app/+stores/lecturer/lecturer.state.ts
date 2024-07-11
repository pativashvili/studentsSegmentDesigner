import {LecturerInfoModel} from "./lecturer-info.model";
import {LoadingStatesEnum} from "../../models/loading-states.enum";

export const lecturerState: {
  lecturerInfo: LecturerInfoModel,
  loadingState: LoadingStatesEnum
} = {
  lecturerInfo: null,
  loadingState: LoadingStatesEnum.INIT
}
