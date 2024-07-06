import { Router } from "express";
import {
  createUser,loginUser
} from "../controllers/userContraoller.js";
import {addFavCites,fetchFavCites,removeFavCites} from "../controllers/favCitiesController.js"

const router = Router();

// router.get("/", fetchUsers);
// router.get("/:id", showUser);
router.post("/register", createUser);
router.post("/login",loginUser)
router.post("/favorites",addFavCites)
router.get("/favorites",fetchFavCites );
router.post("/remove-city",removeFavCites)
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

export default router;