import {LoadingStatesEnum} from "../../models/loading-states.enum";
import {EnrollmentResponseModel} from "../../services/models/enrollment-response.model";

export const EnrollmentState: {
  enrollmentInfo: EnrollmentResponseModel;
  enrollmentsByDate: {
    enrollmentInfo: EnrollmentResponseModel;
    loadingState: LoadingStatesEnum;
  };
  loadingState: LoadingStatesEnum;
} = {
  enrollmentInfo: null,
  enrollmentsByDate: {
    enrollmentInfo: null,
    loadingState: LoadingStatesEnum.INIT
  },
  loadingState: LoadingStatesEnum.INIT
}


