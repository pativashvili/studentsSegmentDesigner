import {LoadingStatesEnum} from "../../models/loading-states.enum";
import {StudentInfoModel} from "./student-info.model";

export const studentState: {
  studentInfo: StudentInfoModel,
  loadingState: LoadingStatesEnum
} = {
  studentInfo: null,
  loadingState: LoadingStatesEnum.INIT
}
