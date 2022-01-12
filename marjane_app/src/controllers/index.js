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
  getSubAdmin,
  updateSubAdmin,
  idFromToken
} from "./subAdminController";
export {
  loginManager,
  getManagerPromotions,
  promoValidate,
  getAllManagerCenter,
} from "./managerController";
export { untreatedPromo } from "./promotionController";
export {
  getCenters,
  getCentersPromotions,
} from "./centerController";
