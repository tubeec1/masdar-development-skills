const UserService = require("../services/userService");

class UserController {
  /*
  |--------------------------------------------------------------------------
  | Read All Users
  |--------------------------------------------------------------------------
  */

  static async readUsers(req, res, next) {
    try {
      const result = await UserService.readUsers();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Read User By ID
  |--------------------------------------------------------------------------
  */

  static async readUserById(req, res, next) {
    try {
      const { id } = req.params;

      const result = await UserService.readUserById(id);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Create Teacher
  |--------------------------------------------------------------------------
  */

  static async createTeacher(req, res, next) {
    try {
      const result = await UserService.createTeacher(req.body);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
  /*
  |--------------------------------------------------------------------------
  | Update User
  |--------------------------------------------------------------------------
  */

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;

      const result = await UserService.updateUser(id, req.body, req.file);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Delete User
  |--------------------------------------------------------------------------
  */

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      const result = await UserService.deleteUser(id);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Change User Status
  |--------------------------------------------------------------------------
  */

  static async changeUserStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { isActive } = req.body;

      const result = await UserService.changeUserStatus(id, isActive);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
  /*
  |--------------------------------------------------------------------------
  | Read Students
  |--------------------------------------------------------------------------
  */

  static async readStudents(req, res, next) {
    try {
      const result = await UserService.readStudents();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Read Teachers
  |--------------------------------------------------------------------------
  */

  static async readTeachers(req, res, next) {
    try {
      const result = await UserService.readTeachers();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Read Admins
  |--------------------------------------------------------------------------
  */

  static async readAdmins(req, res, next) {
    try {
      const result = await UserService.readAdmins();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Dashboard Counts
  |--------------------------------------------------------------------------
  */

  static async dashboardCounts(req, res, next) {
    try {
      const result = await UserService.dashboardCounts();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
