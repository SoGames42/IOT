const prisma = require("../config/prisma");
const { hashPassword } = require("../utils/bcrypt");

class UsersController {
  async getMyProfile(req, res) {
    const user = req.user;
    return res.status(200).send(user);
  }

  async index(req, res) {
    const users = await prisma.user.findMany();
    return res.status(201).send(users);
  }

  async store(req, res) {
    try {
      const body = req.body;
      console.log(body);
      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: await hashPassword(body.password),
        },
      });
      return res.status(201).send(user);
    } catch (e) {
      console.log(e.message);
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async show(req, res) {
    try {
      const id = req.params.id;
      const getUser = await prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      return res.status(201).send(getUser);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const updateUser = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: body,
      });
      return res.status(201).send(updateUser);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async destroy(req, res) {
    try {
      const id = req.params.id;
      const deleteUser = await prisma.user.delete({
        where: {
          id: parseInt(id),
        },
      });
      return res.status(201).send(deleteUser);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async getHouse(req, res) {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(201).send({
      house: user.house,
    });
  }
}

module.exports = new UsersController();
