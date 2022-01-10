export {
  createSubAdmin,
  loginAdmin,
  getStats,
} from "./adminController";
export {
  loginSubAdmin,
  createManager,
  createPromo,
  getAllSubAdmin,
  removeCenter,
  deleteSubAdmin,
} from "./subAdminController";
export {
  loginManager,
  getManagerPromotions,
  promoValidate,
} from "./managerController";
export { untreatedPromo } from "./promotionController";
export {
  getCenters,
  getCentersPromotions,
} from "./centerController";
