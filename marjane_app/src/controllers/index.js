export {
  createSubAdmin,
  loginAdmin,
  getStats,
} from "./adminController";

export {
  loginSubAdmin,
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
  createManager,
  deleteManager,
  updateManager,
  getManager,
} from "./managerController";

export { untreatedPromo } from "./promotionController";

export {
  getCenters,
  getCentersPromotions,
} from "./centerController";

export { getCategoriesCenter } from "./categoryController"
