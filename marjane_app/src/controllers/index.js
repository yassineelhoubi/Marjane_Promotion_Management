export {
  createSubAdmin,
  loginAdmin,
  getStats,
} from "./adminController";

export {
  loginSubAdmin,
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

export {
  createPromo,
  untreatedPromo
} from "./promotionController";

export {
  getCenters,
  getCentersPromotions,
} from "./centerController";

export { getCategoriesCenter } from "./categoryController"
